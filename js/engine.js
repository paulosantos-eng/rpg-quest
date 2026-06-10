// ============================================================
// RPG PERSONALITY QUEST — ENGINE v2
// Motor psicométrico: scoring por média com shrinkage,
// matching híbrido (cosseno + euclídea) com probabilidades
// softmax, confiança via Monte Carlo posterior, CAT com
// parada probabilística e bloco cognitivo garantido.
//
// Propriedades que o v1 não tinha:
//   1. Score independente do nº de itens respondidos por dim
//      (média por item, não soma acumulada com clamp)
//   2. Probabilidades reais que somam 100% no ranking
//   3. Confiança = P(classe top-1) com interpretação estatística
//   4. Toda sessão coleta dados cognitivos (raça nunca degenera)
//   5. Correção de desejabilidade nos scores, não por-classe
// ============================================================

import { CLASSES, RACES, DIMS, COG_DIMS, INCOMPAT, CAT_CONFIG,
         QUESTIONS_PERSONALITY, QUESTIONS_COGNITIVE } from './data.js';

// ── CALIBRAÇÃO ──────────────────────────────────────────────
// Valores escolhidos por grid search no harness de simulação
// (sim/simulate.mjs — resultados em sim/CALIBRATION.md).
//   alpha  : peso da direção (cosseno) vs magnitude (euclídea)
//   tau    : temperatura do softmax (menor = probabilidades mais nítidas)
//   lambda : fração do sinal de desejabilidade parcializada de A/C/N
export const CALIB = {
  alpha: 0.5,
  tau: 0.045,
  lambda: 0.7
};

export function setCalibration(params) {
  Object.assign(CALIB, params);
}

// ── RNG DETERMINÍSTICO (mulberry32) ─────────────────────────
// Seedável para que o harness de simulação seja reprodutível.
let _rngState = (Math.random() * 0xffffffff) >>> 0;

export function seedEngine(seed) {
  _rngState = (seed >>> 0) || 1;
}

function rand() {
  _rngState |= 0;
  _rngState = (_rngState + 0x6D2B79F5) | 0;
  let t = Math.imul(_rngState ^ (_rngState >>> 15), 1 | _rngState);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

// Normal padrão via Box-Muller sobre um gerador local (não consome o
// RNG de seleção de itens — confiança é estável para o mesmo estado).
function makeLocalRng(seed) {
  let s = (seed >>> 0) || 1;
  return function () {
    s |= 0;
    s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeRandn(rng) {
  return function () {
    let u = 0, v = 0;
    while (u === 0) u = rng();
    while (v === 0) v = rng();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
}

// ── STATE ───────────────────────────────────────────────────
const state = {
  // Derivados (recalculados a cada resposta a partir de answers/cogAnswers)
  bf: { O: 50, C: 50, E: 50, A: 50, N: 50 },
  cog: { QI: 50, Proj: 50, Foco: 50, Imp: 50, IE: 50 },
  bfSE: {}, cogSE: {},     // erro-padrão por dimensão
  bfN: {}, cogN: {},       // nº de observações por dimensão

  // Histórico bruto: cada loading de cada resposta vira uma observação
  answers: [],             // [{dim, value}] — Big Five
  cogAnswers: [],          // [{dim, value}] — cognitivas

  // Rastreio de desejabilidade por item (gestão de impressão)
  dsTrack: [],             // [{chosen, min, max}]

  // Quiz tracking
  asked: [],               // índices de itens de personalidade feitos
  askedCog: [],            // índices de itens cognitivos feitos
  pAsked: 0,               // nº de PERGUNTAS de personalidade feitas
  cAsked: 0,               // nº de PERGUNTAS cognitivas feitas
  totalAsked: 0,
  phase: 1,
  personalityDone: false,
  quizDone: false,
  _currentQ: null
};

export function getState() { return state; }

export function resetState() {
  state.bf = { O: 50, C: 50, E: 50, A: 50, N: 50 };
  state.cog = { QI: 50, Proj: 50, Foco: 50, Imp: 50, IE: 50 };
  state.bfSE = {}; state.cogSE = {};
  state.bfN = {}; state.cogN = {};
  state.answers = [];
  state.cogAnswers = [];
  state.dsTrack = [];
  state.asked = [];
  state.askedCog = [];
  state.pAsked = 0;
  state.cAsked = 0;
  state.totalAsked = 0;
  state.phase = 1;
  state.personalityDone = false;
  state.quizDone = false;
  state._currentQ = null;
  recomputeScores();
}

// ── SCORING: MÉDIA POR ITEM COM SHRINKAGE ───────────────────
//
// score_d = 50 + (média_encolhida / DELTA_MAX) × 50
//
// A média é encolhida em direção a 0 (neutro) com PRIOR_W
// pseudo-observações — estimador bayesiano simples que evita
// extremos com 1-2 itens e remove a dependência do nº de itens
// que o modelo aditivo v1 tinha (a dimensão mais perguntada
// "andava" mais longe, criando feedback loop no CAT).
const DELTA_MAX = 3;     // |delta| máximo de um item no banco
const PRIOR_W = 2;       // pseudo-observações no neutro
const PRIOR_SD = 1.8;    // desvio a priori em unidades de delta

function dimStats(values) {
  const n = values.length;
  const sum = values.reduce((s, v) => s + v, 0);
  const mean = sum / (n + PRIOR_W);
  const ss = values.reduce((s, v) => s + (v - mean) ** 2, 0);
  const sd = Math.sqrt((ss + PRIOR_W * PRIOR_SD ** 2) / (n + PRIOR_W));
  const se = sd / Math.sqrt(n + PRIOR_W);
  return {
    n,
    score: 50 + (mean / DELTA_MAX) * 50,
    se: (se / DELTA_MAX) * 50
  };
}

function collectByDim(answers, dims) {
  const by = {};
  dims.forEach(d => { by[d] = []; });
  answers.forEach(a => { if (by[a.dim]) by[a.dim].push(a.value); });
  return by;
}

function recomputeScores() {
  const bfBy = collectByDim(state.answers, DIMS);
  DIMS.forEach(d => {
    const st = dimStats(bfBy[d]);
    state.bf[d] = st.score;
    state.bfSE[d] = st.se;
    state.bfN[d] = st.n;
  });
  const cogBy = collectByDim(state.cogAnswers, COG_DIMS);
  COG_DIMS.forEach(d => {
    const st = dimStats(cogBy[d]);
    state.cog[d] = st.score;
    state.cogSE[d] = st.se;
    state.cogN[d] = st.n;
  });
}

// ── CORREÇÃO DE GESTÃO DE IMPRESSÃO (substitui o debuff v1) ─
//
// O viés de desejabilidade social infla A e C e deflaciona N de
// forma COMPARTILHADA (o "bom cidadão"). Em vez de penalizar
// classes específicas (debuff v1, que distorcia o ranking),
// parcializamos uma fração lambda do componente compartilhado
// dos próprios scores antes do matching — correção clássica de
// "faking" em seleção de pessoal. lambda=0 desliga o mecanismo.
function dsSignal(bf) {
  return (bf.A - 50) + (bf.C - 50) + (50 - bf.N);
}

function applyImpressionCorrection(bf) {
  if (CALIB.lambda === 0) return bf;
  const ds = dsSignal(bf);
  if (ds <= 0) return bf;  // só corrige inflação "virtuosa", não o oposto

  // Gate comportamental: a correção só age na medida em que houver
  // EVIDÊNCIA de gestão de impressão nas escolhas item a item (índice
  // IM alto = escolheu sistematicamente a opção mais "virtuosa" de
  // cada item). Um perfil genuinamente pró-social com IM moderado
  // não é corrigido — isso protege Paladinos/Clérigos verdadeiros.
  const im = calcImpressionManagement().index;          // 0–100
  const gate = Math.max(0, Math.min(1, (im - 50) / 25)); // 50→0, 75→1
  if (gate === 0) return bf;

  const adj = CALIB.lambda * gate * ds / 3;
  const cl = x => Math.max(0, Math.min(100, x));
  return { ...bf, A: cl(bf.A - adj), C: cl(bf.C - adj), N: cl(bf.N + adj) };
}

// ── MATCHING HÍBRIDO: DIREÇÃO + MAGNITUDE ───────────────────
//
// v1 usava ipsatização (z-score intra-pessoa) + cosseno puro: uma
// inclinação mínima A↑C↑N↓ era amplificada até parecer um Paladino
// extremo (o "buraco negro"). O matching v2 combina:
//   direção  : (1 − cosseno)/2          — o PADRÃO do perfil
//   magnitude: euclídea normalizada      — o QUANTO de sinal existe
// d = alpha·direção + (1−alpha)·magnitude, ambos em [0,1].
function centeredVec(scores, dims) {
  return dims.map(d => ((scores[d] ?? 50) - 50) / 50);
}

function hybridDistance(u, v) {
  let dot = 0, mu = 0, mv = 0, sq = 0;
  for (let i = 0; i < u.length; i++) {
    dot += u[i] * v[i];
    mu += u[i] * u[i];
    mv += v[i] * v[i];
    sq += (u[i] - v[i]) ** 2;
  }
  mu = Math.sqrt(mu); mv = Math.sqrt(mv);
  // Perfil sem sinal: cosseno indefinido → neutro (0). A euclídea ainda
  // diferencia, e o softmax produz probabilidades quase uniformes —
  // incerteza honesta em vez do -1 degenerado do v1.
  const cos = (mu < 1e-6 || mv < 1e-6) ? 0 : dot / (mu * mv);
  const eucl = Math.sqrt(sq) / Math.sqrt(u.length * 4); // |uᵢ−vᵢ| ≤ 2
  return CALIB.alpha * (1 - cos) / 2 + (1 - CALIB.alpha) * eucl;
}

function softmaxFromDistances(dists, tau) {
  const m = Math.min(...dists);
  const exps = dists.map(d => Math.exp(-(d - m) / tau));
  const sum = exps.reduce((s, e) => s + e, 0);
  return exps.map(e => e / sum);
}

// ── CLASS RANKING ───────────────────────────────────────────
// Retorna [{key, cls, dist, sim, prob}] ordenado por prob desc.
// .prob soma 1 sobre as 11 classes (exibível como % real).
// .sim = 1 − dist (para barras de UI).
export function getRankedClasses(bfOverride) {
  const bf = applyImpressionCorrection(bfOverride || state.bf);
  const u = centeredVec(bf, DIMS);
  const entries = Object.keys(CLASSES).map(k => ({
    key: k,
    cls: CLASSES[k],
    dist: hybridDistance(u, centeredVec(CLASSES[k].bf, DIMS))
  }));
  const probs = softmaxFromDistances(entries.map(e => e.dist), CALIB.tau);
  entries.forEach((e, i) => {
    e.prob = probs[i];
    e.sim = 1 - e.dist;
  });
  return entries.sort((a, b) => b.prob - a.prob);
}

// ── RACE RANKING ────────────────────────────────────────────
export function getRankedRaces(cogOverride) {
  const cog = cogOverride || state.cog;
  const u = centeredVec(cog, COG_DIMS);
  const entries = Object.keys(RACES).map(k => ({
    key: k,
    race: RACES[k],
    dist: hybridDistance(u, centeredVec(RACES[k].cogProfile, COG_DIMS))
  }));
  const probs = softmaxFromDistances(entries.map(e => e.dist), CALIB.tau);
  entries.forEach((e, i) => {
    e.prob = probs[i];
    e.sim = 1 - e.dist;
  });
  return entries.sort((a, b) => b.prob - a.prob);
}

// ── CONFIANÇA: P(top-1) VIA MONTE CARLO POSTERIOR ───────────
//
// Amostra cada dimensão de Normal(score_d, SE_d), reclassifica e
// conta em quantos draws a classe líder vence. O resultado é uma
// PROBABILIDADE com interpretação direta — substitui a fórmula
// ad hoc sep×0.65+ext×0.35 do v1 e vira o critério de parada.
const CONF_DRAWS = 300;

export function calcConfidence() {
  const ranked = getRankedClasses();
  const top = ranked[0].key;

  // Seed determinístico em função do estado → confiança estável
  // entre chamadas consecutivas com as mesmas respostas.
  const rng = makeLocalRng(0x9e3779b9 ^ (state.answers.length * 2654435761));
  const randn = makeRandn(rng);

  let wins = 0;
  const draw = {};
  for (let i = 0; i < CONF_DRAWS; i++) {
    DIMS.forEach(d => {
      draw[d] = Math.max(0, Math.min(100, state.bf[d] + randn() * state.bfSE[d]));
    });
    const bf = applyImpressionCorrection(draw);
    const u = centeredVec(bf, DIMS);
    let bestKey = null, bestDist = Infinity;
    for (const k of Object.keys(CLASSES)) {
      const dist = hybridDistance(u, centeredVec(CLASSES[k].bf, DIMS));
      if (dist < bestDist) { bestDist = dist; bestKey = k; }
    }
    if (bestKey === top) wins++;
  }

  const p = wins / CONF_DRAWS;
  return {
    score: p,                                  // P(top-1) ∈ [0,1]
    pct: Math.min(99, Math.round(p * 100)),    // nunca 100% — humildade
    top,
    runnerUp: ranked[1] ? ranked[1].key : null
  };
}

// ── SECONDARY CLASS (respeitando incompatibilidade) ─────────
export function getSecondary(ranked) {
  const primaryKey = ranked[0].key;
  const forbidden = INCOMPAT[primaryKey] || [];
  for (let i = 1; i < ranked.length; i++) {
    if (!forbidden.includes(ranked[i].key)) return ranked[i];
  }
  return ranked[1];
}

// ── CONSISTÊNCIA (ex-Lie Scale) ─────────────────────────────
// Mede contradições dentro da mesma dimensão. Contradição real ≠
// mentira — pode ser ambivalência genuína; o texto reflete isso.
// A detecção de viés aspiracional fica no índice de gestão de
// impressão (abaixo), que mede outra coisa.
export function calcConsistency() {
  const dimAnswers = collectByDim(state.answers, DIMS);

  let totalVariance = 0;
  let dimsWithData = 0;

  DIMS.forEach(d => {
    const vals = dimAnswers[d];
    if (vals.length < 2) return;
    dimsWithData++;

    let contradictions = 0;
    for (let i = 0; i < vals.length; i++) {
      for (let j = i + 1; j < vals.length; j++) {
        if (vals[i] * vals[j] < 0 && Math.abs(vals[i]) + Math.abs(vals[j]) >= 4) {
          contradictions++;
        }
      }
    }

    const maxPairs = (vals.length * (vals.length - 1)) / 2;
    totalVariance += maxPairs > 0 ? contradictions / maxPairs : 0;
  });

  const avgVariance = dimsWithData > 0 ? totalVariance / dimsWithData : 0;
  const consistencia = Math.max(0, Math.round((1 - avgVariance) * 100));

  return {
    sincronicidade: consistencia,  // nome mantido para compatibilidade
    isLow: consistencia < 60,
    message: consistencia < 40
      ? 'Suas respostas se contradizem com frequência na mesma dimensão. Pode ser ruído de atenção — ou um perfil genuinamente em transição.'
      : consistencia < 60
      ? 'Algumas contradições internas foram detectadas. Isso pode indicar complexidade real do perfil, não necessariamente respostas aleatórias.'
      : consistencia < 80
      ? 'Consistência moderada. Seu perfil tem nuances que o algoritmo capturou com razoável confiança.'
      : 'Alta consistência. Suas respostas apontam na mesma direção dentro de cada dimensão — o resultado é estável.'
  };
}

// Alias para compatibilidade com código existente
export const calcLieScale = calcConsistency;

// ── GESTÃO DE IMPRESSÃO ─────────────────────────────────────
// Para cada item respondido, mede onde a opção escolhida fica no
// espectro de desejabilidade (A↑/C↑/N↓) DAQUELE item: 0 = opção
// menos "virtuosa", 100 = mais "virtuosa". A média alta e
// consistente é a assinatura do respondente aspiracional.
// (Pessoas genuinamente A↑C↑ também pontuam alto — por isso o
// texto fala em "possível viés", nunca em acusação.)
export function calcImpressionManagement() {
  if (state.dsTrack.length < 5) {
    return { index: 50, isHigh: false, n: state.dsTrack.length,
             message: 'Dados insuficientes para estimar viés de apresentação.' };
  }
  let sum = 0, n = 0;
  state.dsTrack.forEach(t => {
    if (t.max > t.min) {
      sum += (t.chosen - t.min) / (t.max - t.min);
      n++;
    }
  });
  const index = n > 0 ? Math.round((sum / n) * 100) : 50;
  return {
    index,
    n,
    isHigh: index >= 72,
    message: index >= 85
      ? 'Você escolheu quase sempre a opção mais admirável de cada item. Ou você é genuinamente assim — ou respondeu como gostaria de ser visto. Considere refazer respondendo como age, não como aspira.'
      : index >= 72
      ? 'Tendência consistente de escolher as opções socialmente mais desejáveis. O resultado pode estar levemente inflado em Amabilidade e Conscienciosidade.'
      : index <= 25
      ? 'Você escolheu sistematicamente as opções menos "apresentáveis" — perfil contranormativo genuíno ou resposta provocativa.'
      : 'Sem padrão relevante de desejabilidade social. Suas escolhas variaram conforme o conteúdo, não conforme a imagem.'
  };
}

// ── MBTI DO USUÁRIO (derivado dos próprios scores) ──────────
// Mapeamento Big Five → MBTI pelas correlações empíricas
// (McCrae & Costa, 1989): E↔Extroversão, N(intuição)↔Abertura,
// F↔Amabilidade, J↔Conscienciosidade. O v1 mostrava o MBTI fixo
// da CLASSE — agora o usuário vê o tipo derivado do SEU perfil.
export function deriveUserMbti() {
  const bf = state.bf;
  const letters = [
    bf.E >= 50 ? 'E' : 'I',
    bf.O >= 50 ? 'N' : 'S',
    bf.A >= 50 ? 'F' : 'T',
    bf.C >= 50 ? 'J' : 'P'
  ];
  // Força de cada letra: distância do ponto neutro (0–100)
  const strengths = [
    Math.round(Math.abs(bf.E - 50) * 2),
    Math.round(Math.abs(bf.O - 50) * 2),
    Math.round(Math.abs(bf.A - 50) * 2),
    Math.round(Math.abs(bf.C - 50) * 2)
  ];
  return { type: letters.join(''), letters, strengths };
}

// ── SUBCLASS DETECTION ──────────────────────────────────────
export function getSubclass(classKey) {
  const cls = CLASSES[classKey];
  if (!cls || !cls.subclasses) return null;

  for (const sub of cls.subclasses) {
    const userVal = state.bf[sub.trait] ?? 50;
    if (sub.dir === 'high' && userVal >= sub.th) return sub;
    if (sub.dir === 'low' && userVal <= sub.th) return sub;
  }
  return null; // variante "pura"
}

// ── NEURODIVERGÊNCIA: PERFIS COMPATÍVEIS ────────────────────
//
// Reenquadramento v2: isto NÃO é diagnóstico. Detecta perfis de
// resposta COMPATÍVEIS com padrões descritos na literatura de
// triagem, exigindo nº mínimo de observações por dimensão (nReq)
// e thresholds alcançáveis na escala de média (validados no
// harness de simulação). Cada card na UI carrega disclaimer.
const ND_MIN_N = 2;

function ndOk(dims) {
  return dims.every(d => (state.cogN[d] || 0) >= ND_MIN_N);
}

export function detectNeurodiv() {
  const traits = [];
  const c = state.cog;

  // 2e tem precedência sobre TDAH e Altas Habilidades isolados
  // (é a combinação dos dois padrões).
  const has2e = c.QI >= 70 && c.Imp >= 66 && c.Foco <= 38 && ndOk(['QI', 'Imp', 'Foco']);

  if (has2e) {
    traits.push({
      tipo: 'Perfil compatível com Dupla Excepcionalidade (2e)',
      nome: 'Gnomo / Feérico Caótico',
      escala: 'Triagem combinada: WISC-V/Raven + ASRS-18',
      desc: 'Padrão de respostas que combina raciocínio fluido alto com impulsividade alta e atenção sustentada baixa — o paradoxo do potencial que tropeça na execução.',
      superpoder: 'Conexões Impossíveis — resolve problemas por caminhos que mentes lineares nunca encontrariam. Hiperfoco devastador quando o interesse acende.',
      custo: 'Paralisia do Potencial — a distância entre o que consegue pensar e o que consegue executar é a maior fonte de sofrimento desta arquitetura.'
    });
  }

  if (!has2e && c.Imp >= 68 && c.Foco <= 34 && ndOk(['Imp', 'Foco'])) {
    traits.push({
      tipo: 'Perfil compatível com traços de TDAH',
      nome: 'Elemental / Genasi',
      escala: 'Triagem: ASRS-18 (OMS) / BIS-11',
      desc: 'Padrão de impulsividade alta com atenção sustentada baixa — processamento cinético, pensamento divergente rápido, hiperfoco sob interesse.',
      superpoder: 'O Fogo do Hiperfoco — sob interesse genuíno ou pressão extrema, processa informações mais rápido que qualquer um.',
      custo: 'Paralisia de Tarefas — rotina monótona e burocracia drenam completamente sua barra de energia.'
    });
  }

  if (c.QI >= 66 && c.Foco >= 64 && c.IE <= 36 && ndOk(['QI', 'Foco', 'IE'])) {
    traits.push({
      tipo: 'Perfil compatível com traços do espectro autista (TEA)',
      nome: 'Autômato / Elfo Astral',
      escala: 'Triagem: AQ-10 (Baron-Cohen)',
      desc: 'Padrão de sistematização alta com leitura social baixa — reconhecimento profundo de padrões, comunicação direta, preferência por regras explícitas.',
      superpoder: 'Visão Verdadeira — enxerga sistemas complexos e ignora pressões sociais ilusórias.',
      custo: 'Sobrecarga Sensorial — quando o ambiente fica caótico, o sistema entra em Lockdown.'
    });
  }

  if (!has2e && c.QI >= 72 && c.Proj >= 60 && c.Imp <= 64 && ndOk(['QI', 'Proj'])) {
    traits.push({
      tipo: 'Perfil compatível com Altas Habilidades',
      nome: 'Feérico / Celestial',
      escala: 'Referência: sobre-excitabilidades de Dabrowski / WISC-V',
      desc: 'Raciocínio fluido alto com pensamento divergente alto — aprendizado rápido, conexões entre áreas distantes, intensidade intelectual.',
      superpoder: 'Mente Expansiva — aprende em dias o que outros levam meses. Conecta áreas completamente diferentes.',
      custo: 'Tédio Devastador — necessidade constante de estímulo intelectual gera niilismo quando cercado por mentes lineares.'
    });
  }

  if (c.Foco >= 72 && c.Imp <= 32 && c.Proj <= 42 && ndOk(['Foco', 'Imp', 'Proj'])) {
    traits.push({
      tipo: 'Perfil compatível com traços obsessivo-funcionais',
      nome: 'Anão Forjador',
      escala: 'Triagem: OCI-R / Y-BOCS (conceitos)',
      desc: 'Controle inibitório extremo com baixa tolerância ao improviso — rituais funcionais, precisão, intolerância ao erro e à incerteza.',
      superpoder: 'Blindagem Cognitiva — nível de concentração que outros só atingem em emergências é seu estado padrão.',
      custo: 'Rigidez — quando o ritual falha ou a rotina é quebrada, o sistema nervoso interpreta como ameaça.'
    });
  }

  if (c.IE >= 74 && c.Proj >= 62 && c.Imp <= 34 && state.bf.A <= 38 && ndOk(['IE', 'Proj', 'Imp'])) {
    traits.push({
      tipo: 'Perfil compatível com traços da Tríade Sombria adaptativa',
      nome: 'Vampiro / Drow',
      escala: 'Referência: SD3 (Jones & Paulhus, 2014)',
      desc: 'Leitura emocional alta usada instrumentalmente, com baixa amabilidade — charme calculado, influência estratégica, frieza sob pressão.',
      superpoder: 'Scanner Social — lê intenções, emoções e hierarquias em segundos. Influência quase invisível sobre grupos.',
      custo: 'Isolamento Relacional — com o tempo, a frieza calculada afasta quem busca conexão genuína. Relações tornam-se transações.'
    });
  }

  return traits;
}

// ── HYBRID TEXT (gradiente de dominância) ───────────────────
// Agora baseado na razão de probabilidades p2/p1 — interpretável:
// p2 ≈ p1 significa empate real entre arquétipos.
export function getHybridText(primary, secondary) {
  const r = primary.prob > 0 ? secondary.prob / primary.prob : 1;
  return {
    ratio: 1 - r,
    level: r > 0.80 ? 'hybrid' : r > 0.45 ? 'dual' : 'dominant'
  };
}

// ── CAT: SELEÇÃO DE ITEM POR INFORMAÇÃO ─────────────────────
//
// Informação de um item para uma dimensão = amplitude dos deltas
// que suas opções podem produzir nessa dimensão. Um item cujas
// opções vão de −3 a +3 separa mais que um de −1 a +1.
function itemInfo(q, dim) {
  let mn = 0, mx = 0;
  q.opts.forEach(o => {
    const v = o.bf[dim] || 0;
    if (v < mn) mn = v;
    if (v > mx) mx = v;
  });
  return mx - mn;
}

// Escolhe entre os top-3 itens mais informativos (leve aleatoriedade
// para variedade entre sessões, sem sacrificar quase nada de info).
function pickInformative(candidates, dim) {
  candidates.sort((a, b) => itemInfo(b.q, dim) - itemInfo(a.q, dim));
  const pool = candidates.slice(0, Math.min(3, candidates.length));
  return pool[Math.floor(rand() * pool.length)];
}

// Dimensão que mais separa os 2 primeiros colocados, ponderada
// pela incerteza atual (SE) do usuário nessa dimensão.
export function getMostDiscriminatingDim() {
  const ranked = getRankedClasses();
  const c1bf = ranked[0].cls.bf;
  const c2bf = ranked[1].cls.bf;

  let best = null, bestScore = -1;
  DIMS.forEach(d => {
    const avail = QUESTIONS_PERSONALITY.some((q, i) =>
      q.dim === d && !state.asked.includes(i)
    );
    if (!avail) return;

    const discriminability = Math.abs(c1bf[d] - c2bf[d]);     // 0–100
    const uncertainty = (state.bfSE[d] || 0) / 21;             // ~0–1
    const score = discriminability * 0.7 + uncertainty * 30;
    if (score > bestScore) { bestScore = score; best = d; }
  });

  return best;
}

export function selectPersonalityQ(dim) {
  let candidates = QUESTIONS_PERSONALITY
    .map((q, i) => ({ q, i }))
    .filter(x => x.q.dim === dim && !state.asked.includes(x.i));

  if (candidates.length === 0) {
    candidates = QUESTIONS_PERSONALITY
      .map((q, i) => ({ q, i }))
      .filter(x => !state.asked.includes(x.i));
    if (candidates.length === 0) return null;
    dim = candidates[0].q.dim;
  }

  const pick = pickInformative(candidates, dim);
  state.asked.push(pick.i);
  state._currentQ = pick.q;
  return { question: pick.q, index: pick.i, type: 'personality' };
}

// Dimensão cognitiva com menos observações (depois, maior SE)
function getNeediestCogDim() {
  let best = null, bestScore = Infinity;
  COG_DIMS.forEach(d => {
    const avail = QUESTIONS_COGNITIVE.some((q, i) =>
      q.dim === d && !state.askedCog.includes(i)
    );
    if (!avail) return;
    const score = (state.cogN[d] || 0) * 100 - (state.cogSE[d] || 0);
    if (score < bestScore) { bestScore = score; best = d; }
  });
  return best;
}

export function selectCognitiveQ() {
  const dim = getNeediestCogDim();
  if (dim === null) return null;

  const candidates = QUESTIONS_COGNITIVE
    .map((q, i) => ({ q, i }))
    .filter(x => x.q.dim === dim && !state.askedCog.includes(x.i));

  const pick = pickInformative(candidates, dim);
  state.askedCog.push(pick.i);
  state._currentQ = pick.q;
  return { question: pick.q, index: pick.i, type: 'cognitive' };
}

// ── SELETOR PRINCIPAL ───────────────────────────────────────
// Fluxo v2: personalidade (fases adaptativas) → bloco cognitivo
// garantido de CAT_CONFIG.cogBlock itens → fim.
// O interleave v1 ((total−20)%5) deixava a raça sem dados quando
// o quiz convergia cedo — removido.
export function selectNextQuestion() {
  if (!state.personalityDone) {
    // Fase 1: round-robin garante cobertura das 5 dims
    if (state.pAsked < CAT_CONFIG.phaseSizes[0]) {
      const dim = DIMS[state.pAsked % 5];
      const q = selectPersonalityQ(dim);
      if (q) return q;
    } else {
      const dim = getMostDiscriminatingDim();
      const q = dim ? selectPersonalityQ(dim) : selectPersonalityQ(DIMS[0]);
      if (q) return q;
    }
    // Banco de personalidade esgotado → segue para o bloco cognitivo
    state.personalityDone = true;
  }

  if (state.cAsked < CAT_CONFIG.cogBlock) {
    const q = selectCognitiveQ();
    if (q) return q;
  }
  return null;
}

// ── APPLY ANSWER ────────────────────────────────────────────
export function applyAnswer(option, type) {
  if (type === 'cognitive') {
    Object.entries(option.bf).forEach(([k, v]) => {
      if (COG_DIMS.includes(k)) state.cogAnswers.push({ dim: k, value: v });
    });
    state.cAsked++;
  } else {
    Object.entries(option.bf).forEach(([k, v]) => {
      if (DIMS.includes(k)) state.answers.push({ dim: k, value: v });
      // Cross-loading intencional: itens de personalidade também
      // informam dimensões cognitivas (agora como observação real)
      if (COG_DIMS.includes(k)) state.cogAnswers.push({ dim: k, value: v });
    });

    // Rastreio de desejabilidade: posição da escolha no espectro
    // A↑/C↑/N↓ das opções DESTE item
    const q = state._currentQ;
    if (q && q.opts && q.opts.length > 1) {
      const dsOf = o => (o.bf.A || 0) + (o.bf.C || 0) - (o.bf.N || 0);
      const all = q.opts.map(dsOf);
      const mx = Math.max(...all), mn = Math.min(...all);
      if (mx > mn) state.dsTrack.push({ chosen: dsOf(option), min: mn, max: mx });
    }
    state.pAsked++;
  }
  state.totalAsked++;
  state._currentQ = null;
  recomputeScores();
}

// ── PHASE MANAGEMENT & STOPPING ─────────────────────────────
function personalityPhaseEnd() {
  return CAT_CONFIG.phaseSizes
    .slice(0, state.phase)
    .reduce((a, b) => a + b, 0);
}

function currentStopProb() {
  return CAT_CONFIG.stopProbs[
    Math.min(state.phase - 1, CAT_CONFIG.stopProbs.length - 1)
  ];
}

// Reasons:
//   continue    — segue perguntando
//   phase_break — fim de fase sem convergência → overlay + advancePhase()
//   cog_start   — personalidade convergiu → começa o bloco cognitivo
//   end:true    — quiz completo (bloco cognitivo terminado)
export function shouldEndQuiz() {
  if (state.personalityDone) {
    const cogExhausted = !QUESTIONS_COGNITIVE.some((q, i) => !state.askedCog.includes(i));
    if (state.cAsked >= CAT_CONFIG.cogBlock || cogExhausted) {
      return { end: true, reason: 'done' };
    }
    return { end: false, reason: 'continue' };
  }

  const atPhaseEnd = state.pAsked >= personalityPhaseEnd();
  const maxed = state.pAsked >= CAT_CONFIG.maxPersonality;
  if (!atPhaseEnd && !maxed) return { end: false, reason: 'continue' };

  const ranked = getRankedClasses();
  const conf = calcConfidence();
  const isLastPhase = state.phase >= CAT_CONFIG.phaseSizes.length;

  if (maxed || isLastPhase || conf.score >= currentStopProb()) {
    state.personalityDone = true;
    return { end: false, reason: 'cog_start', conf, ranked };
  }
  return { end: false, reason: 'phase_break', conf, ranked };
}

export function advancePhase() {
  state.phase++;
}

// Progresso 0–1 para a barra da UI: personalidade ocupa 0–0.8
// (proporcional ao plano da fase atual), bloco cognitivo 0.8–1.
export function getProgress() {
  if (state.quizDone) return 1;
  if (!state.personalityDone) {
    const target = Math.min(personalityPhaseEnd(), CAT_CONFIG.maxPersonality);
    return Math.min(state.pAsked / target, 1) * 0.8;
  }
  return 0.8 + Math.min(state.cAsked / CAT_CONFIG.cogBlock, 1) * 0.2;
}

// ── FULL RESULT COMPUTATION ─────────────────────────────────
export function computeResult() {
  const ranked = getRankedClasses();
  const primary = ranked[0];
  const secondary = getSecondary(ranked);
  const conf = calcConfidence();
  const consistency = calcConsistency();
  const impression = calcImpressionManagement();
  const subclass = getSubclass(primary.key);
  const racesRanked = getRankedRaces();
  const primaryRace = racesRanked[0];
  const neurodiv = detectNeurodiv();
  const hybrid = getHybridText(primary, secondary);
  const userMbti = deriveUserMbti();

  state.quizDone = true;

  return {
    primary,
    secondary,
    ranked,
    conf,
    consistency,
    lieScale: consistency,   // compat com chamadas antigas
    impression,
    subclass,
    primaryRace,
    racesRanked,
    neurodiv,
    hybrid,
    userMbti,
    totalQuestions: state.totalAsked,
    bf: { ...state.bf },
    bfSE: { ...state.bfSE },
    cog: { ...state.cog },
    cogSE: { ...state.cogSE }
  };
}
