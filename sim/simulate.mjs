// ============================================================
// RPG PERSONALITY QUEST — HARNESS DE VALIDAÇÃO (Node ≥ 18)
//
// Importa o engine REAL (js/engine.js) e o banco REAL (js/data.js)
// → zero drift entre simulação e produção (o monte_carlo_rpg.py
//   antigo replicava o engine à mão e dessincronizou).
//
// Simulação em NÍVEL DE RESPOSTA: cada persona tem um perfil
// latente conhecido e escolhe opções dos itens reais por utilidade
// + ruído softmax, atravessando o pipeline CAT completo (fases,
// parada probabilística, bloco cognitivo).
//
// Uso:
//   node sim/simulate.mjs          → avaliação completa (CALIB atual)
//   node sim/simulate.mjs grid     → grid search alpha/tau/lambda
// ============================================================

import { CLASSES, RACES, DIMS, COG_DIMS, CAT_CONFIG } from '../js/data.js';
import * as engine from '../js/engine.js';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));

// ── RNG do harness (independente do RNG do engine) ──────────
function mulberry32(seed) {
  let s = (seed >>> 0) || 1;
  return function () {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function makeRandn(rng) {
  return () => {
    let u = 0, v = 0;
    while (u === 0) u = rng();
    while (v === 0) v = rng();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
}
const clip = (x, lo = 2, hi = 98) => Math.max(lo, Math.min(hi, x));

// ── MODELO DE RESPOSTA DA PERSONA ───────────────────────────
// utilidade(opção) = Σ_d delta_d × (latente_d − 50)/50  (BF + COG)
//                  + gamma × desejabilidade(opção)       (se enviesada)
// escolha ~ softmax(utilidade / T)  — T é o ruído de resposta.
const RESPONSE_T = 0.8;

function dsOf(bf) { return (bf.A || 0) + (bf.C || 0) - (bf.N || 0); }

function chooseOption(question, persona, rng) {
  const utils = question.opts.map(o => {
    let u = 0;
    for (const [d, v] of Object.entries(o.bf)) {
      const lat = persona.latent[d];
      if (lat !== undefined) u += v * (lat - 50) / 50;
    }
    u += (persona.gamma || 0) * dsOf(o.bf);
    return u;
  });
  const mx = Math.max(...utils);
  const exps = utils.map(u => Math.exp((u - mx) / RESPONSE_T));
  const sum = exps.reduce((s, e) => s + e, 0);
  let r = rng() * sum;
  for (let i = 0; i < exps.length; i++) {
    r -= exps[i];
    if (r <= 0) return question.opts[i];
  }
  return question.opts[question.opts.length - 1];
}

// ── EXECUTA UM QUIZ COMPLETO (replica o fluxo do app.js) ────
function runQuiz(persona, seed) {
  engine.resetState();
  engine.seedEngine(seed);
  const rng = mulberry32(seed ^ 0xabcdef);

  let phase1End = null;
  while (true) {
    const nq = engine.selectNextQuestion();
    if (!nq) break;
    const opt = chooseOption(nq.question, persona, rng);
    engine.applyAnswer(opt, nq.type);
    const check = engine.shouldEndQuiz();
    if (check.reason === 'cog_start' && phase1End === null) {
      phase1End = engine.getState().pAsked;
    }
    if (check.end) break;
    if (check.reason === 'phase_break') engine.advancePhase();
  }
  const res = engine.computeResult();
  res._pAsked = engine.getState().pAsked;
  res._earlyStop = phase1End === CAT_CONFIG.phaseSizes[0];
  return res;
}

// ── GERADORES DE POPULAÇÕES ─────────────────────────────────
function uniformCog(rng, lo = 25, hi = 75) {
  const c = {};
  COG_DIMS.forEach(d => { c[d] = lo + rng() * (hi - lo); });
  return c;
}
function uniformBf(rng, lo = 20, hi = 80) {
  const b = {};
  DIMS.forEach(d => { b[d] = lo + rng() * (hi - lo); });
  return b;
}

// 1. Recuperação de classe: latente = protótipo + ruído σ=10
function genClassPersonas(nPerClass, baseSeed) {
  const personas = [];
  Object.entries(CLASSES).forEach(([key, cls], ci) => {
    for (let i = 0; i < nPerClass; i++) {
      const rng = mulberry32(baseSeed + ci * 1000 + i);
      const randn = makeRandn(rng);
      const latent = {};
      DIMS.forEach(d => { latent[d] = clip(cls.bf[d] + randn() * 10); });
      Object.assign(latent, uniformCog(rng));
      personas.push({ latent, gamma: 0, trueClass: key, seed: baseSeed + ci * 1000 + i });
    }
  });
  return personas;
}

// 2. Recuperação de raça: latente cognitivo = protótipo + ruído
function genRacePersonas(nPerRace, baseSeed) {
  const personas = [];
  Object.entries(RACES).forEach(([key, race], ri) => {
    for (let i = 0; i < nPerRace; i++) {
      const rng = mulberry32(baseSeed + ri * 1000 + i);
      const randn = makeRandn(rng);
      const latent = uniformBf(rng);
      COG_DIMS.forEach(d => { latent[d] = clip(race.cogProfile[d] + randn() * 10); });
      personas.push({ latent, gamma: 0, trueRace: key, seed: baseSeed + ri * 1000 + i });
    }
  });
  return personas;
}

// 3. População uniforme (sem viés, máxima entropia)
function genUniform(n, baseSeed) {
  const personas = [];
  for (let i = 0; i < n; i++) {
    const rng = mulberry32(baseSeed + i);
    const latent = {};
    DIMS.forEach(d => { latent[d] = 5 + rng() * 90; });
    COG_DIMS.forEach(d => { latent[d] = 5 + rng() * 90; });
    personas.push({ latent, gamma: 0, seed: baseSeed + i });
  }
  return personas;
}

// 4. "Bom cidadão" — latente NEUTRO-moderado + viés de ESCOLHA γ.
//    O teste honesto do buraco negro: a pessoa é mediana em tudo,
//    mas escolhe sistematicamente a opção mais "virtuosa" (A↑C↑N↓)
//    de cada item. Um bom engine NÃO deve funilar essas pessoas em
//    Paladino/Clérigo só por causa da virtude falsa. O gêmeo γ=0
//    (mesmos latentes, sem viés) é a baseline de comparação.
function genBiased(n, baseSeed, gamma) {
  const personas = [];
  for (let i = 0; i < n; i++) {
    const rng = mulberry32(baseSeed + i);
    const randn = makeRandn(rng);
    const latent = {};
    DIMS.forEach(d => { latent[d] = clip(50 + randn() * 8, 30, 70); });
    COG_DIMS.forEach(d => { latent[d] = clip(50 + randn() * 10); });
    personas.push({ latent, gamma, seed: baseSeed + i });
  }
  return personas;
}

// Classe-oráculo: o que o classificador diria se observasse o
// latente diretamente (sem ruído de resposta nem viés). Usada como
// "verdade" para personas sem classe geradora.
function oracleClass(latent) {
  engine.resetState(); // dsTrack vazio → correção de impressão inerte
  return engine.getRankedClasses(latent)[0].key;
}

// ── MÉTRICAS ────────────────────────────────────────────────
function evaluate(opts) {
  const { nPerClass = 40, nPerRace = 30, nUniform = 400, nBiased = 400 } = opts || {};

  // — Recuperação de classe —
  const classPersonas = genClassPersonas(nPerClass, 11000);
  const confusion = {};
  Object.keys(CLASSES).forEach(k => { confusion[k] = {}; });
  let hits = 0, top2hits = 0, qSum = 0, earlyCount = 0;
  const calibConf = [];   // [conf P(top1) do MC, acertou?]
  const calibProb = [];   // [prob softmax do top1, acertou?]
  const raceShareEarly = {};

  classPersonas.forEach(p => {
    const r = runQuiz(p, p.seed);
    const pred = r.primary.key;
    confusion[p.trueClass][pred] = (confusion[p.trueClass][pred] || 0) + 1;
    const hit = pred === p.trueClass;
    if (hit) hits++;
    if (hit || r.ranked[1].key === p.trueClass) top2hits++;
    qSum += r.totalQuestions;
    calibConf.push([r.conf.score, hit]);
    calibProb.push([r.primary.prob, hit]);
    if (r._earlyStop) {
      earlyCount++;
      raceShareEarly[r.primaryRace.key] = (raceShareEarly[r.primaryRace.key] || 0) + 1;
    }
  });
  const n = classPersonas.length;
  const accuracy = hits / n;
  const top2 = top2hits / n;

  // Calibração: erro médio |conf média do bin − acurácia do bin|
  function calibError(pairs) {
    const bins = [[0.3, 0.5], [0.5, 0.65], [0.65, 0.8], [0.8, 0.9], [0.9, 1.01]];
    let err = 0, used = 0;
    const rows = [];
    bins.forEach(([lo, hi]) => {
      const inBin = pairs.filter(([c]) => c >= lo && c < hi);
      if (inBin.length < 10) return;
      const meanC = inBin.reduce((s, [c]) => s + c, 0) / inBin.length;
      const acc = inBin.reduce((s, [, h]) => s + (h ? 1 : 0), 0) / inBin.length;
      err += Math.abs(meanC - acc); used++;
      rows.push({ bin: `${lo}–${hi}`, n: inBin.length, conf: meanC, acc });
    });
    return { err: used > 0 ? err / used : 0, rows };
  }
  const calConf = calibError(calibConf);
  const calProb = calibError(calibProb);

  // — Recuperação de raça —
  const racePersonas = genRacePersonas(nPerRace, 22000);
  let raceHits = 0;
  const raceConfusion = {};
  racePersonas.forEach(p => {
    const r = runQuiz(p, p.seed);
    if (r.primaryRace.key === p.trueRace) raceHits++;
    raceConfusion[p.trueRace] = raceConfusion[p.trueRace] || {};
    raceConfusion[p.trueRace][r.primaryRace.key] = (raceConfusion[p.trueRace][r.primaryRace.key] || 0) + 1;
  });
  const raceAcc = raceHits / racePersonas.length;

  // — População uniforme (verdade = oráculo sobre o latente) —
  const uniPersonas = genUniform(nUniform, 33000);
  const uniClassShare = {}, uniRaceShare = {};
  let uniNeuro = 0, uniSubclass = 0, uniHits = 0;
  uniPersonas.forEach(p => {
    const truth = oracleClass(p.latent);
    const r = runQuiz(p, p.seed);
    const hit = r.primary.key === truth;
    if (hit) uniHits++;
    calibConf.push([r.conf.score, hit]);
    calibProb.push([r.primary.prob, hit]);
    uniClassShare[r.primary.key] = (uniClassShare[r.primary.key] || 0) + 1;
    uniRaceShare[r.primaryRace.key] = (uniRaceShare[r.primaryRace.key] || 0) + 1;
    if (r.neurodiv.length > 0) uniNeuro++;
    if (r.subclass) uniSubclass++;
  });
  const uniAcc = uniHits / nUniform;

  // Calibração re-calculada com o mix recuperação + uniforme
  const calConfMix = calibError(calibConf);
  const calProbMix = calibError(calibProb);

  // — População enviesada ("bom cidadão") + gêmeo honesto γ=0 —
  const biasPersonas = genBiased(nBiased, 44000, 0.55);
  const twinPersonas = genBiased(nBiased, 44000, 0);   // mesmos latentes
  const biasShare = {}, twinShare = {};
  let imSum = 0, imTwinSum = 0, biasNeuro = 0, biasSame = 0;
  biasPersonas.forEach((p, i) => {
    const r = runQuiz(p, p.seed);
    const rt = runQuiz(twinPersonas[i], twinPersonas[i].seed ^ 0x5555);
    biasShare[r.primary.key] = (biasShare[r.primary.key] || 0) + 1;
    twinShare[rt.primary.key] = (twinShare[rt.primary.key] || 0) + 1;
    if (r.primary.key === rt.primary.key) biasSame++;
    imSum += r.impression.index;
    imTwinSum += rt.impression.index;
    if (r.neurodiv.length > 0) biasNeuro++;
  });
  const bhBiased = ((biasShare.paladino || 0) + (biasShare.clerigo || 0)) / nBiased;
  const bhTwin = ((twinShare.paladino || 0) + (twinShare.clerigo || 0)) / nBiased;

  return {
    accuracy, top2, avgQ: qSum / n, earlyRate: earlyCount / n,
    confusion, calConf: calConfMix, calProb: calProbMix,
    raceAcc, raceConfusion, raceShareEarly, earlyCount,
    uniClassShare, uniRaceShare, uniN: nUniform, uniAcc,
    uniNeuroRate: uniNeuro / nUniform, uniSubclassRate: uniSubclass / nUniform,
    biasShare, twinShare, biasN: nBiased,
    bhBiased, bhTwin, bhExcess: bhBiased - bhTwin,
    biasStability: biasSame / nBiased,
    imMean: imSum / nBiased, imTwinMean: imTwinSum / nBiased,
    biasNeuroRate: biasNeuro / nBiased
  };
}

// ── RELATÓRIO ───────────────────────────────────────────────
const pct = x => (x * 100).toFixed(1) + '%';

function shareTable(share, total, expected) {
  return Object.entries(share)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => {
      const p = v / total;
      const flag = p > expected * 2 ? '  ⚠ >2× esperado' : '';
      return `    ${k.padEnd(12)} ${pct(p).padStart(6)}${flag}`;
    }).join('\n');
}

function report(m) {
  const expClass = 1 / Object.keys(CLASSES).length;
  const expRace = 1 / Object.keys(RACES).length;

  console.log('\n════════ RECUPERAÇÃO DE CLASSE (latente conhecido + ruído σ=10) ════════');
  console.log(`  Acurácia top-1: ${pct(m.accuracy)}   top-2: ${pct(m.top2)}   (chance: ${pct(expClass)})`);
  console.log(`  Perguntas médias: ${m.avgQ.toFixed(1)}   convergiu na fase 1: ${pct(m.earlyRate)}`);

  console.log('\n  Matriz de confusão (linhas = classe verdadeira, ≥10% mostrado):');
  Object.entries(m.confusion).forEach(([t, preds]) => {
    const tot = Object.values(preds).reduce((s, v) => s + v, 0);
    const row = Object.entries(preds).sort((a, b) => b[1] - a[1])
      .filter(([, v]) => v / tot >= 0.1)
      .map(([k, v]) => `${k}:${pct(v / tot)}`).join('  ');
    console.log(`    ${t.padEnd(12)} ${row}`);
  });

  console.log('\n  Calibração da CONFIANÇA (P(top1) Monte Carlo vs acurácia):');
  m.calConf.rows.forEach(r =>
    console.log(`    bin ${r.bin.padEnd(10)} n=${String(r.n).padStart(4)}  conf=${pct(r.conf)}  acc=${pct(r.acc)}`));
  console.log(`    → erro médio: ${pct(m.calConf.err)} (aceite: ≤10pp)`);

  console.log('\n  Calibração do RANKING (prob softmax top1 vs acurácia):');
  m.calProb.rows.forEach(r =>
    console.log(`    bin ${r.bin.padEnd(10)} n=${String(r.n).padStart(4)}  prob=${pct(r.conf)}  acc=${pct(r.acc)}`));
  console.log(`    → erro médio: ${pct(m.calProb.err)} (aceite: ≤10pp)`);

  console.log('\n════════ RECUPERAÇÃO DE RAÇA ════════');
  console.log(`  Acurácia top-1: ${pct(m.raceAcc)}   (chance: ${pct(expRace)})`);
  console.log(`  Regressão "todo mundo é Elfo" — raças entre quem convergiu na fase 1 (n=${m.earlyCount}):`);
  if (m.earlyCount > 0) {
    const maxShare = Math.max(...Object.values(m.raceShareEarly)) / m.earlyCount;
    console.log(shareTable(m.raceShareEarly, m.earlyCount, expRace));
    console.log(`    → share máximo: ${pct(maxShare)} ${maxShare < 0.45 ? '✓ não-degenerado' : '✗ DEGENERADO'}`);
  } else {
    console.log('    (ninguém convergiu na fase 1 — sem dados)');
  }

  console.log('\n════════ POPULAÇÃO UNIFORME (sem viés) ════════');
  console.log(`  Acurácia vs oráculo do latente: ${pct(m.uniAcc)}`);
  console.log('  Distribuição de classes:');
  console.log(shareTable(m.uniClassShare, m.uniN, expClass));
  console.log('  Distribuição de raças:');
  console.log(shareTable(m.uniRaceShare, m.uniN, expRace));
  console.log(`  Neurodiv detectada: ${pct(m.uniNeuroRate)}   Subclasse ativa: ${pct(m.uniSubclassRate)}`);

  console.log('\n════════ BURACO NEGRO: latente neutro + virtude falsa (γ=0.55) ════════');
  console.log('  Com viés de escolha:');
  console.log(shareTable(m.biasShare, m.biasN, expClass));
  console.log('  Gêmeo honesto (mesmos latentes, γ=0):');
  console.log(shareTable(m.twinShare, m.biasN, expClass));
  console.log(`  ► Paladino+Clérigo com viés: ${pct(m.bhBiased)}  · sem viés: ${pct(m.bhTwin)}`);
  console.log(`  ► EXCESSO causado pela virtude falsa: ${pct(m.bhExcess)}  (aceite ≤10pp)  ${m.bhExcess <= 0.10 ? '✓' : '✗ BURACO NEGRO'}`);
  console.log(`  ► IM médio: ${m.imMean.toFixed(0)} com viés vs ${m.imTwinMean.toFixed(0)} honesto (o índice separa? Δ≥15 esperado)`);
  console.log(`  ► Neurodiv nesta população: ${pct(m.biasNeuroRate)}`);
}

// ── GRID SEARCH ─────────────────────────────────────────────
function gridSearch() {
  const alphas = [0.5];
  const taus = [0.04, 0.045, 0.05];
  const lambdas = [0.7, 0.85, 1.0];
  const results = [];

  console.log(`Grid: ${alphas.length}×${taus.length}×${lambdas.length} = ${alphas.length * taus.length * lambdas.length} configs (N reduzido)\n`);

  for (const alpha of alphas) {
    for (const lambda of lambdas) {
      // tau não afeta classificação top-1 nem parada — só as probs do
      // ranking. Avaliamos o pipeline 1× por (alpha, lambda) e a
      // calibração do softmax por tau em cima dos mesmos quizzes.
      engine.setCalibration({ alpha, tau: taus[0], lambda });
      const base = evaluate({ nPerClass: 18, nPerRace: 12, nUniform: 200, nBiased: 200 });

      for (const tau of taus) {
        engine.setCalibration({ alpha, tau, lambda });
        // Recalcula a calibração do softmax re-rodando recuperação +
        // uniforme (quizzes idênticos: mesmas seeds; tau não muda
        // nenhuma decisão de fluxo, só as probabilidades exibidas)
        const calibProb = [];
        genClassPersonas(18, 11000).forEach(p => {
          const r = runQuiz(p, p.seed);
          calibProb.push([r.primary.prob, r.primary.key === p.trueClass]);
        });
        genUniform(200, 33000).forEach(p => {
          const truth = oracleClass(p.latent);
          const r = runQuiz(p, p.seed);
          calibProb.push([r.primary.prob, r.primary.key === truth]);
        });
        const bins = [[0.0, 0.3], [0.3, 0.5], [0.5, 0.7], [0.7, 0.9], [0.9, 1.01]];
        let err = 0, used = 0;
        bins.forEach(([lo, hi]) => {
          const inBin = calibProb.filter(([c]) => c >= lo && c < hi);
          if (inBin.length < 10) return;
          const meanC = inBin.reduce((s, [c]) => s + c, 0) / inBin.length;
          const acc = inBin.reduce((s, [, h]) => s + (h ? 1 : 0), 0) / inBin.length;
          err += Math.abs(meanC - acc); used++;
        });
        const probCalErr = used > 0 ? err / used : 1;

        // Dano específico nas classes-alvo da correção (Paladino/Clérigo
        // genuínos não podem ser sacrificados para corrigir os falsos)
        const palCleAcc = ['paladino', 'clerigo'].map(k => {
          const row = base.confusion[k];
          const tot = Object.values(row).reduce((s, v) => s + v, 0);
          return (row[k] || 0) / tot;
        });
        const goodAxisAcc = (palCleAcc[0] + palCleAcc[1]) / 2;

        const feasible = base.bhExcess <= 0.20 && base.calConf.err <= 0.12
                       && probCalErr <= 0.12 && goodAxisAcc >= 0.85;
        const score = base.accuracy + base.uniAcc * 0.5 + base.raceAcc * 0.3
                    + goodAxisAcc * 0.5
                    - probCalErr * 0.5 - base.bhExcess
                    - (feasible ? 0 : 1);
        results.push({
          alpha, tau, lambda,
          acc: base.accuracy, uniAcc: base.uniAcc, raceAcc: base.raceAcc,
          goodAxisAcc,
          bhExcess: base.bhExcess, bhBiased: base.bhBiased, bhTwin: base.bhTwin,
          confCalErr: base.calConf.err, probCalErr, avgQ: base.avgQ,
          feasible, score
        });
        console.log(
          `α=${alpha} τ=${tau} λ=${lambda}  acc=${pct(base.accuracy)} uni=${pct(base.uniAcc)} raça=${pct(base.raceAcc)} ` +
          `pal/cle=${pct(goodAxisAcc)} BNexc=${pct(base.bhExcess)} calConf=${pct(base.calConf.err)} calProb=${pct(probCalErr)} ` +
          `q̄=${base.avgQ.toFixed(0)} ${feasible ? '' : '✗'}`
        );
      }
    }
  }

  results.sort((a, b) => b.score - a.score);
  console.log('\n──── TOP 8 CONFIGS ────');
  results.slice(0, 8).forEach(r =>
    console.log(`α=${r.alpha} τ=${r.tau} λ=${r.lambda}  acc=${pct(r.acc)} uni=${pct(r.uniAcc)} raça=${pct(r.raceAcc)} BNexc=${pct(r.bhExcess)} calProb=${pct(r.probCalErr)}`));

  const best = results[0];
  const md = [
    '# Calibração do Engine v2 — RPG Personality Quest',
    '',
    `Harness: \`node sim/simulate.mjs grid\` (parâmetros) e \`node sim/simulate.mjs\` (validação final).`,
    '',
    '## Parâmetros escolhidos',
    '',
    '| Parâmetro | Valor | Papel |',
    '|---|---|---|',
    `| alpha | ${best.alpha} | peso direção (cosseno) vs magnitude (euclídea) no matching |`,
    `| tau | ${best.tau} | temperatura do softmax do ranking de classes/raças |`,
    `| lambda | ${best.lambda} | força máxima da correção de gestão de impressão |`,
    '',
    '## Resultados da config escolhida (grid, N reduzido)',
    '',
    `- Recuperação de classe (latente do protótipo + ruído σ=10): **${pct(best.acc)}**`,
    `- Acurácia vs oráculo em população uniforme: **${pct(best.uniAcc)}**`,
    `- Recuperação de raça: **${pct(best.raceAcc)}**`,
    `- Excesso Paladino+Clérigo causado por virtude falsa: **${pct(best.bhExcess)}** (aceite ≤10pp; com viés ${pct(best.bhBiased)} vs honesto ${pct(best.bhTwin)})`,
    `- Erro de calibração da confiança P(top1): **${pct(best.confCalErr)}**`,
    `- Erro de calibração do ranking (softmax): **${pct(best.probCalErr)}**`,
    `- Perguntas médias: **${best.avgQ.toFixed(1)}**`,
    '',
    '## Top 8 do grid',
    '',
    '| α | τ | λ | acc | uniforme | raça | excesso BN | cal. ranking |',
    '|---|---|---|---|---|---|---|---|',
    ...results.slice(0, 8).map(r =>
      `| ${r.alpha} | ${r.tau} | ${r.lambda} | ${pct(r.acc)} | ${pct(r.uniAcc)} | ${pct(r.raceAcc)} | ${pct(r.bhExcess)} | ${pct(r.probCalErr)} |`),
    '',
    '> Métricas definidas em sim/simulate.mjs. O "excesso BN" compara a mesma',
    '> população de latentes neutros com e sem viés de escolha (γ=0.55 vs γ=0):',
    '> mede o quanto a virtude falsa move pessoas para Paladino/Clérigo.',
    ''
  ].join('\n');
  writeFileSync(join(HERE, 'CALIBRATION.md'), md, 'utf8');
  console.log(`\n✓ Melhor config: α=${best.alpha} τ=${best.tau} λ=${best.lambda} — gravada em sim/CALIBRATION.md`);
  console.log('  → Atualize CALIB em js/engine.js com esses valores.');
}

// ── MAIN ────────────────────────────────────────────────────
const mode = process.argv[2] || 'eval';
const t0 = Date.now();

if (mode === 'grid') {
  gridSearch();
} else {
  console.log(`CALIB atual: α=${engine.CALIB.alpha} τ=${engine.CALIB.tau} λ=${engine.CALIB.lambda}`);
  report(evaluate({}));
}

console.log(`\n(${((Date.now() - t0) / 1000).toFixed(1)}s)`);
