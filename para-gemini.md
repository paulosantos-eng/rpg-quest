# RPG Personality Quest — Documentação Completa da Lógica

> ⚠️ **DESATUALIZADO (engine v1).** Em 2026-06 o motor foi refundado (v2):
> scoring por média com shrinkage (não soma acumulada), matching híbrido
> cosseno+euclídea com probabilidades softmax calibradas, confiança = P(top1)
> por Monte Carlo posterior, bloco cognitivo garantido de 10 perguntas,
> correção de gestão de impressão com gate comportamental (substitui o debuff
> de Paladino/Clérigo) e MBTI derivado dos scores do usuário.
> Fonte de verdade: `js/engine.js` (comentado) e `sim/CALIBRATION.md`.
> As seções 5–7 e 9 abaixo descrevem o motor ANTIGO.

**Stack:** Vanilla HTML + CSS + JavaScript (ES Modules). Sem framework, sem back-end, sem banco de dados. Tudo roda no navegador do usuário.

**Arquivos:**
- `index.html` — 7 telas estáticas + 2 overlays
- `js/data.js` — banco de dados completo (classes, raças, perguntas, MBTI)
- `js/engine.js` — motor matemático puro (sem DOM)
- `js/app.js` — orquestrador UI (renderiza, navega, anima)
- `css/style.css` — design system dark/fantasy

---

## 1. FILOSOFIA CENTRAL

O app é construído sobre uma premissa: **arquétipos de RPG são modelos científicos de personalidade disfarçados de fantasia.**

A conexão não é arbitrária:
- O **Guerreiro** não é metáfora vaga. É um perfil Big Five preciso: C=90, E=90, A=25, O=15, N=15. Isso mapeia exatamente para o ESTJ da literatura psicométrica — orientado a ação, baixa abertura, alta disciplina, baixa amabilidade.
- O **Mago** é O=98, C=30, E=8 — o INTP: máxima abertura intelectual, introversão extrema, baixa conscienciosidade (gênio desorganizado).
- O **Clérigo** é A=98, C=88, E=18 — o ISFJ: empatia máxima, disciplina a serviço do cuidado, retraimento social.

Cada uma das 11 classes tem uma **assinatura Big Five única** que não se confunde com nenhuma outra quando medida por distância cossenoidal no espaço R⁵.

**Paralelo Junguiano:** As classes também são arquetipos no sentido de Jung — padrões psíquicos universais que emergem independentemente da cultura. O Herói (Paladino), o Trapaceiro (Ladino), o Sábio (Mago), o Cuidador (Clérigo) são recorrentes em toda mitologia humana porque refletem configurações neurológicas reais.

---

## 2. OS DOIS SISTEMAS PARALELOS

O app mede simultaneamente dois espaços distintos:

### Sistema 1 — Big Five (Personalidade)
Mede **como você pensa e age no mundo social.**

5 dimensões, cada uma de 0 a 100:
- **O** (Openness) — abertura à experiência, curiosidade intelectual, tolerância ao novo
- **C** (Conscientiousness) — autodisciplina, planejamento, orientação a objetivos
- **E** (Extraversion) — busca de estimulação externa, assertividade, sociabilidade
- **A** (Agreeableness) — orientação cooperativa, empatia, confiança nos outros
- **N** (Neuroticism) — reatividade emocional, tendência a emoções negativas

Determina sua **Classe** (11 possíveis) e **Subclasse** (3 por classe = 33 total).

### Sistema 2 — Cognitivo (Hardware Mental)
Mede **como seu cérebro processa informação em nível neuropsicológico.**

5 dimensões cognitivas, cada uma de 0 a 100:
- **QI** — inteligência fluida, raciocínio abstrato (WAIS-IV / Matrizes de Raven)
- **Proj** — pensamento projetivo, processamento subconsciente (Rorschach / HTP)
- **Foco** — atenção sustentada, controle inibitório (Palográfico / d2)
- **Imp** — impulsividade motora e cognitiva (Barratt BIS-11 / ASRS-18)
- **IE** — inteligência emocional, leitura social (MSCEIT / SD3)

Determina sua **Raça Cognitiva** (9 possíveis) e possíveis **Neurodivergências** (6 detectáveis).

---

## 3. AS 11 CLASSES — PERFIS BIG FIVE

Cada classe tem um vetor Big Five calibrado para máxima separação:

```
Classe       O    C    E    A    N    MBTI
─────────────────────────────────────────────
Guerreiro   15   90   90   25   15   ESTJ
Mago        98   30    8   28   42   INTP
Ladino      72    5   95   12   60   ESTP
Clérigo     22   88   18   98   32   ISFJ
Bardo       95   18   96   75   62   ENFP
Paladino    75   85   88   95   12   ENFJ
Caçador     20   92   22   55   10   ISTJ
Necromante  82   85   10    5   35   INTJ
Samurai     10   98   35   45    8   ISTJ*
Ninja       60   70   12   50   55   INFP
Monge       88   45    5   88   70   INFP*
─────────────────────────────────────────────
* subvariantes com separação dimensional própria
```

**Pares problemáticos resolvidos — por que não se confundem:**

- **Guerreiro vs Samurai:** ambos têm C alto e N baixo, mas Guerreiro E=90 vs Samurai E=35. O Guerreiro age para fora, o Samurai é interno.
- **Mago vs Necromante:** ambos O alto e E baixo, mas Mago C=30 vs Necromante C=85. O Mago é caótico genial, o Necromante é estratégico disciplinado.
- **Ninja vs Monge:** ambos E baixo, mas Monge A=88 vs Ninja A=50 e Monge N=70 vs Ninja N=55. O Monge é contemplativo amoroso, o Ninja é introspectivo-missão.
- **Bardo vs Ladino:** ambos E alto, mas Bardo A=75 vs Ladino A=12. O Bardo catalisa, o Ladino extrai.
- **Paladino vs Clérigo:** ambos A alto, mas Paladino E=88 vs Clérigo E=18. O Paladino lidera ativamente, o Clérigo cuida em silêncio.

---

## 4. AS 9 RAÇAS COGNITIVAS

Cada raça é uma arquitetura neuropsicológica real:

```
Raça           QI   Proj  Foco  Imp   IE   Neurodiv
────────────────────────────────────────────────────────
Elfo           92   45    70    15    55   Altas Habilidades
Anão           55   25    96    20    40   (nenhuma)
Tiefling       65   95    35    55    70   Pensamento Divergente
Humano         60   50    55    45    85   TOC Funcional
Orc            40   30    25    95    35   TDAH
Draconato      70   60    60    40    90   (nenhuma)
Elfo Astral    90   15    95     5    12   TEA (Espectro Autista)
Gnomo          88   80    18    82    52   Dupla Excepcionalidade
Vampiro        78   88    68    10    96   Tríade Sombria
────────────────────────────────────────────────────────
```

Cada raça tem:
- **embasamento:** qual teste neuropsicológico real captura esse perfil
- **arquitetura:** como o hardware mental processa informação
- **fantasma clínico:** o que acontece sob colapso/estresse severo
- **curiosidade projetiva:** como você se comportaria em testes clínicos reais

---

## 5. O MOTOR MATEMÁTICO (engine.js)

### 5.1 Estado Central

Tudo começa em 50 (ponto neutro — sem evidência):

```javascript
state = {
  bf:  { O: 50, C: 50, E: 50, A: 50, N: 50 },
  cog: { QI: 50, Proj: 50, Foco: 50, Imp: 50, IE: 50 },
  asked: [],      // índices de perguntas de personalidade já feitas
  askedCog: [],   // índices de perguntas cognitivas já feitas
  totalAsked: 0,
  phase: 1,
  answers: [],    // histórico completo para Lie Scale
  cogAnswers: []
}
```

### 5.2 Similaridade de Cossenos Centrada em 50

Compara o perfil do usuário com cada classe:

```
FUNÇÃO cosineSim(userScores, classBFProfile):

  PARA CADA dimensão d em [O, C, E, A, N]:
    u = userScores[d] - 50      // centraliza: 50 vira 0
    v = classBFProfile[d] - 50  // idem para o perfil-alvo

    dot  += u × v
    magU += u²
    magV += v²

  magU = √magU
  magV = √magV

  SE magU < 0.001: RETORNA -1   // usuário ainda muito neutro

  RETORNA dot / (magU × magV)   // resultado: -1.0 a +1.0
```

**Por que centrar em 50?** Sem centralização, alguém que marca 60 em tudo teria alta similaridade com qualquer perfil acima de 50. Centrando, 50 significa "sem sinal" e só os desvios importam. Um Guerreiro precisa de desvio alto em C e E — não apenas "acima de 50".

**Interpretação cossenoidal:**
- `+1.0` = direção idêntica ao perfil
- `0.0` = ortogonal (sem relação)
- `-1.0` = oposto exato

### 5.3 Z-Score Normalization (Anti-Viés de Moderação)

**Problema:** respondentes moderados marcam tudo entre 45–55, fazendo magU ≈ 0 e a similaridade instável.

**Solução:** amplificar diferenças relativas antes de calcular o cosseno:

```
FUNÇÃO zScoreNormalize(scores, dims):

  media  = média(scores[d] para d em dims)
  std    = desvio_padrão(scores[d] para d em dims)
  std    = max(std, 1)  // evita divisão por zero

  PARA CADA dimensão d:
    z = (scores[d] - media) / std
    normalizado[d] = clamp(50 + z × 20, 0, 100)

  RETORNA normalizado
```

**Exemplo:**
- Input: O=58, C=55, E=48, A=52, N=47 (todos muito próximos de 50)
- Output: O≈72, C≈64, E≈38, A≈54, N≈32 (diferenças relativas amplificadas)

O usuário "moderado" agora revela que, relativamente, tem mais Abertura e menos Extroversão — e o algoritmo consegue separar as classes.

### 5.4 Lie Scale (Índice de Sincronicidade)

Detecta contradições internas: respostas que empurram a mesma dimensão em direções opostas em perguntas diferentes.

```
FUNÇÃO calcLieScale():

  PARA CADA dimensão d:
    respostas_d = [r.valor PARA r em answers SE r.dim == d]

    contradições = 0
    PARA CADA par (i, j) em respostas_d:
      // sinais opostos E magnitude total forte (≥ ±2 + ±2)
      SE respostas_i × respostas_j < 0
      E |respostas_i| + |respostas_j| >= 4:
        contradições++

    variância_d = contradições / total_pares_possíveis

  variância_média = média(variância_d)
  sincronicidade  = clamp(round((1 - variância_média) × 100), 0, 100)

  RETORNA {
    sincronicidade,
    isLow:   sincronicidade < 60,
    message: texto_contextual
  }
```

**Thresholds interpretativos:**

| Score | Diagnóstico |
|-------|-------------|
| 80–100% | Alta consistência — resultado confiável |
| 60–79% | Consistência moderada — nuances capturadas |
| 40–59% | Contradições detectadas — possível viés aspiracional |
| 0–39% | Ruído significativo — respondeu como gostaria de ser? |

---

## 6. O QUIZ ADAPTATIVO (CAT)

### 6.1 Filosofia

Testes tradicionais são lineares: todo mundo responde as mesmas 60 perguntas na mesma ordem. Ineficiente — para quem já demonstrou ser claramente um Mago, continuar fazendo perguntas de Extroversão é desperdício.

O CAT adapta: **faz mais perguntas onde ainda há dúvida, para quando há certeza.**

### 6.2 Estrutura de Fases

```
FASE 1: 20 perguntas (round-robin: 4 por dimensão)
  → calcular confiança
  → SE >= 0.38: ENCERRAR
  → SENÃO: mostrar Phase Break overlay → avançar fase 2

FASE 2: +10 perguntas (CAT adaptativo)
  → SE >= 0.28: ENCERRAR

FASE 3: +10 perguntas
  → SE >= 0.22: ENCERRAR

FASE 4: +10 perguntas
  → SE >= 0.18: ENCERRAR

MÁXIMO: 50 perguntas totais (encerra independente da confiança)
```

O Phase Break overlay exibe:
- Barra de confiança atual (%)
- As duas classes empatadas: "X vs Y"
- Quantas perguntas adicionais serão feitas
- Botão "Continuar →"

### 6.3 Interleave Personalidade × Cognitivo

```
FUNÇÃO selectNextQuestion():
  n = state.totalAsked

  SE n < 20:
    // Round-robin: garante base em todas as 5 dims
    dim = DIMS[n % 5]  → O, C, E, A, N, O, C, E, A, N, ...
    RETORNA selectPersonalityQ(dim)

  SE (n - 20) % 5 == 0:
    // A cada 5 perguntas: 1 pergunta cognitiva (raça)
    RETORNA selectCognitiveQ()

  // Caso padrão: dim mais incerta de personalidade
  dim = getMostUncertainDim()
  RETORNA selectPersonalityQ(dim)
```

### 6.4 Seleção da Dimensão Mais Incerta

```
FUNÇÃO getMostUncertainDim():

  PARA CADA dimensão d em [O, C, E, A, N]:
    incerteza      = |50 - state.bf[d]|   // perto de 50 = incerto
    perguntas_feitas = count(answers onde dim == d)

    // score BAIXO = mais urgente
    score = incerteza + perguntas_feitas × 4

    // (pena por já ter feito muitas perguntas nessa dim)

  RETORNA dim com menor score que ainda tem perguntas disponíveis
```

**Intuição:** Uma dimensão em 50 (não sabemos nada) com 0 perguntas feitas tem score=0+0=0 → máxima urgência. Uma em 80 (sabemos muito) com 4 perguntas feitas tem score=30+16=46 → baixa urgência.

### 6.5 Aplicação da Resposta

Cada opção tem um vetor de impacto `bf: { dimensão: delta }`:

```
FUNÇÃO applyAnswer(option, type):

  SE type == 'cognitive':
    PARA CADA (dim, delta) em option.bf:
      SE dim é cognitiva (QI/Proj/Foco/Imp/IE):
        state.cog[dim] = clamp(state.cog[dim] + delta, 0, 100)
        registrar em cogAnswers

  SENÃO (personalidade):
    PARA CADA (dim, delta) em option.bf:
      SE dim é Big Five (O/C/E/A/N):
        state.bf[dim]  = clamp(state.bf[dim] + delta, 0, 100)
        registrar em answers (para Lie Scale)
      SE dim é cognitiva:  // cross-contamination intencional
        state.cog[dim] = clamp(state.cog[dim] + delta, 0, 100)

  state.totalAsked++
```

**Cross-contamination:** perguntas de personalidade podem mover dimensões cognitivas. Ex: uma resposta altamente impulsiva numa pergunta de Conscienciosidade também incrementa `Imp` no cognitivo. Os dois sistemas alimentam um ao outro.

---

## 7. CÁLCULO DE CONFIANÇA

```
FUNÇÃO calcConfidence(ranked):

  s1 = ranked[0].sim   // #1 mais similar
  s2 = ranked[1].sim   // #2 mais similar

  // Fator 1 (65% do peso): quão separados estão o 1º e 2º
  sep = s1 > 0 ? (s1 - s2) / (s1 + 0.001) : 0

  // Fator 2 (35% do peso): quão extremo é o perfil
  // (perfis perto de 50,50,50,50,50 têm mais ambiguidade)
  dist_euclidiana = √( Σ (state.bf[d] - 50)² )
  ext = min(dist_euclidiana / 90, 1)

  score = sep × 0.65 + ext × 0.35
  pct   = min(round(score × 100), 99)   // nunca 100% — humildade

  RETORNA { sep, ext, score, pct }
```

**Dois caminhos para confiança alta:**
1. Grande separação entre as classes 1ª e 2ª (o algoritmo sabe que não é a segunda)
2. Perfil muito extremo (alguém que marca O=95, C=10, E=90 não tem ambiguidade — é Bardo ou Ladino)

---

## 8. DETECÇÃO DE SUBCLASSE

Cada classe tem até 3 subclasses, ativadas por threshold em uma dimensão específica:

```
FUNÇÃO getSubclass(classKey):

  PARA CADA sub em CLASSES[classKey].subclasses:
    val = state.bf[sub.trait]

    SE sub.dir == 'high' E val >= sub.th: RETORNA sub
    SE sub.dir == 'low'  E val <= sub.th: RETORNA sub

  RETORNA null   // "puro" — nenhuma subclasse ativada
```

Exemplos das subclasses:

| Classe | Subclasse | Condição |
|--------|-----------|----------|
| Guerreiro | Mercenário | A ≤ 25 |
| Guerreiro | Guardião | A ≥ 65 |
| Guerreiro | Berserker | N ≥ 65 |
| Mago | Archon | C ≥ 70 |
| Mago | Conjurador Caótico | C ≤ 25 |
| Ladino | Espião | C ≥ 55 |
| Ladino | Robin Hood | A ≥ 65 |
| Clérigo | Mártir | N ≥ 70 |
| Paladino | Inquisidor | N ≥ 65 |
| Necromante | Arquilich | N ≥ 70 |

---

## 9. DETECÇÃO DE NEURODIVERGÊNCIA

Baseada nos scores cognitivos finais. Múltiplas podem coexistir:

```
FUNÇÃO detectNeurodiv():
  traits = []

  // TDAH: processa cinético, não sustenta atenção
  SE cog.Imp >= 75 E cog.Foco <= 35:
    adicionar TDAH

  // TEA: sistematiza tudo, lê social por lógica
  SE cog.QI >= 75 E cog.Foco >= 70 E cog.IE <= 35:
    adicionar TEA

  // Altas Habilidades: gênio arborescente, não TDAH puro
  SE cog.QI >= 80 E cog.Proj >= 65 E cog.Imp < 70:
    adicionar Altas Habilidades

  // 2e: superdotado + impulsivo + não foca (o paradoxo do gênio)
  SE cog.QI >= 78 E cog.Imp >= 72 E cog.Foco <= 30:
    adicionar Dupla Excepcionalidade

  // TOC Funcional: ritual, controle, intolerância ao erro
  SE cog.Foco >= 85 E cog.Imp <= 25 E cog.Proj <= 35:
    adicionar TOC Funcional

  // Tríade Sombria: empatia como scanner, não como sentimento
  SE cog.IE >= 88 E cog.Proj >= 72 E cog.Imp <= 20:
    adicionar Tríade Sombria Adaptativa

  RETORNA traits
```

Cada neurodivergência detectada exibe **superpoder** (o que essa arquitetura faz melhor que qualquer outra) e **custo** (o que ela cobra inevitavelmente).

---

## 10. MATRIZ DE INCOMPATIBILIDADE

Alguns pares são ontologicamente opostos. Se a classe primária é X, a secundária nunca pode ser da lista de incompatíveis:

```javascript
INCOMPAT = {
  paladino:   ['ladino', 'necromante'],
  ladino:     ['paladino', 'clerigo', 'samurai'],
  necromante: ['clerigo', 'paladino'],
  samurai:    ['bardo', 'ladino'],
  bardo:      ['samurai', 'necromante'],
  clerigo:    ['necromante'],
  guerreiro:  ['monge'],
  monge:      ['guerreiro']
}
```

**Lógica filosófica:**
- Paladino/Ladino: herói moral vs. transgressor aético — um não pode "influenciar" o outro sem destruir o conceito
- Guerreiro/Monge: ação externa imediata vs. contemplação interna — opostos do eixo E/introversão levado ao extremo
- Necromante/Clérigo: instrumentalização vs. cuidado genuíno — lados opostos da dimensão A

```
FUNÇÃO getSecondary(ranked):
  primaryKey = ranked[0].key
  forbidden = INCOMPAT[primaryKey] ou []

  PARA i de 1 até ranked.length:
    SE ranked[i].key NÃO está em forbidden:
      RETORNA ranked[i]   // primeiro não-proibido

  RETORNA ranked[1]   // fallback (nunca deveria ocorrer)
```

---

## 11. TEXTO HÍBRIDO (GRADIENTE DE DOMINÂNCIA)

```
FUNÇÃO getHybridText(primary, secondary):
  gap   = primary.sim - secondary.sim
  ratio = gap / |primary.sim|

  SE ratio < 0.08:  level = 'hybrid'    // quase empate
  SE ratio < 0.22:  level = 'dual'      // dominante mas influenciado
  SENÃO:            level = 'dominant'  // identidade inequívoca
```

Texto gerado por nível:
- **hybrid:** "Você é um arquétipo genuinamente duplo: [X] — mas igualmente [Y]. Difícil de classificar, impossível de ignorar."
- **dual:** "Sua essência é a do [X]. Mas [influência de Y]. Essa dualidade não é contradição — é complexidade."
- **dominant:** "Sua identidade é clara: você é [X]. O [Y] aparece como camada, mas sua natureza define quem você é."

---

## 12. A COMPOSIÇÃO DO DOSSIÊ (Resultado Final)

```
computeResult() agrega:
  ┌─ ranked          → todas as 11 classes por similaridade
  ├─ primary         → classe #1
  ├─ secondary       → classe não-incompatível mais próxima
  ├─ conf            → confiança % (sep + ext)
  ├─ lieScale        → sincronicidade das respostas
  ├─ subclass        → subclasse ativa ou null
  ├─ primaryRace     → raça cognitiva #1
  ├─ racesRanked     → todas as 9 raças por similaridade cognitiva
  ├─ neurodiv        → lista de neurodivergências detectadas
  ├─ hybrid          → nível de dominância
  ├─ totalQuestions  → quantas perguntas foram feitas
  ├─ bf              → scores Big Five finais
  └─ cog             → scores cognitivos finais
```

**Seções do Dossiê renderizado:**

| Seção | Conteúdo |
|-------|----------|
| Header | Raça + Classe + MBTI + Subclasse + % certeza |
| Texto Híbrido | Narrativa baseada no ratio de dominância |
| Sincronicidade | Lie Scale com barra animada + mensagem |
| Traços | Combinados das 2 classes (cores distintas) |
| Dossiê | Arma Principal / Calcanhar / Party / Quest |
| Psicométrico | Diagnóstico Clínico / Sombra / Curiosidade / Par Romântico |
| Guilda | Nome da guilda + carreiras afins |
| Hardware Mental | Raça + arquitetura + fantasma + neurodivergências |
| Subclasse | Detalhe se ativa |
| OCEAN | Barras: score usuário vs score ideal da classe |
| Personagens | Heróis reais + fictícios com mesmo perfil |
| Ranking | Todas as 11 classes com % |
| Prob. de Erro | Como esse perfil pode ter falhado |

---

## 13. PERGUNTAS IPSATIVAS — ANTI-DESEJABILIDADE SOCIAL

**Problema:** a maioria dos testes de personalidade tem respostas que parecem "melhores". Pessoas tendem a responder quem gostariam de ser, não quem são.

**Solução ipsativa:** nenhuma opção é moralmente superior. Todas são igualmente defensáveis. A diferença está no padrão implícito de processamento.

Exemplo de pergunta ipsativa real:
```
"Uma criança desconhecida cai na sua frente. Você..."

A) Ajudo imediatamente e fico até chegar socorro     → A:+3, N:+1
B) Verifico perigos antes de agir                    → C:+2, N:-1
C) Chamo ajuda qualificada enquanto me aproximo      → E:+1, A:+2
D) Fico em choque um segundo antes de reagir         → N:+3, E:-1
E) Passo — não tenho condições de lidar com isso     → A:-3, N:+2  [isSkip: true]
```

A opção E (`isSkip: true`) tem visual diferente: borda tracejada, menor opacidade. Ela representa não-ação — dado válido, não punido, mas sinalizado.

---

## 14. FLUXO COMPLETO DAS TELAS

```
S0: HERO
  → "Iniciar Aventura" → S1

S1: O QUE É RPG? (4 cards filosóficos)
  → → S2

S2: CLASSES (11 cards clicáveis)
  → Click em card → Overlay (Big Five bars, MBTI, subclasses, personagens)
  → Dentro do overlay: "Fazer o Quiz →" → S6
  → → S3

S3: RAÇAS COGNITIVAS (9 cards)
  → initRaces() cria os cards no DOM (barras com width:0%)
  → go(3) dispara setTimeout(animateRaceBars, 120ms) → anima barras
  → → S4

S4: MBTI EDUCACIONAL (abas)
  → "As 4 Dimensões" + 4 grupos de 16 tipos
  → → S5

S5: BIG FIVE EDUCACIONAL (5 cards OCEAN)
  → → S6

S6: QUIZ DINÂMICO
  → startQuiz() → resetState() → renderNextQ()
  → Resposta → applyAnswer() → shouldEndQuiz()
     → phase_break: showPhaseOverlay() + advancePhase() → renderNextQ()
     → end: showResult() → go(7)

S7: DOSSIÊ DA ALMA (resultado completo)
  → "↺ Refazer" → S6
  → "Ver Classes" → S2
  → "Início" → S0
```

---

## 15. PSEUDOCÓDIGO COMPLETO DO FLUXO PRINCIPAL

```
// ── BOOT ──────────────────────────────────────────
init():
  esconder todos .pg
  mostrar s0
  initStars()     → 55 divs .star com CSS animation aleatório
  initNav()       → eventos click em .ps (nav dots) e [data-go]
  initClassGrid() → 11 .cc cards com click → showClassDetail()
  initRaces()     → 9 .rc cards com barras width=0%
  initMBTI()      → tabs + 16 tipos em panels
  initBigFive()   → 5 .bfc cards educacionais

// ── NAVEGAÇÃO ──────────────────────────────────────
go(n):
  esconder todos .pg
  s{n}.style.display = 'block'
  animar com .ani (slideIn 0.35s)
  atualizar nav: s{n} = on, s < n = done
  SE n == 3: setTimeout(animateRaceBars, 120)
  SE n == 6: startQuiz()

// ── QUIZ ───────────────────────────────────────────
startQuiz():
  resetState()     → tudo volta a 50
  renderNextQ()

renderNextQ():
  q = selectNextQuestion()   // CAT engine
  SE q == null: showResult() → RETORNA

  atualizar barra progresso = totalAsked / maxQuestions × 100%
  atualizar contador "Pergunta N"
  atualizar emoji de fase
  renderizar q.question.q no #qq
  
  PARA CADA opt em q.question.opts:
    criar botão .qo
    SE opt.isSkip: adicionar .qo-skip (visual diferente)
    click → applyAnswer(opt, q.type)
             delay = 300ms
             check = shouldEndQuiz()
             SE check.end: showResult()
             SE check.phase_break:
               showPhaseOverlay(check.ranked, check.conf)
               advancePhase()
             SENÃO: renderNextQ()

// ── RESULTADO ──────────────────────────────────────
showResult():
  result = computeResult()
  go(7)
  renderizar seções do dossiê no #rhd e #rbd
  setTimeout → animar barras OCEAN e Sincronicidade
  ativar botão "Compartilhar Ficha" → clipboard API
```

---

## 16. INVARIANTES DE DESIGN

1. **Nunca 100% de certeza** — `pct = min(score × 100, 99)`. Humildade epistêmica.
2. **Nenhuma classe é "melhor"** — todas têm Arma Principal + Calcanhar de Aquiles. Zero julgamento de valor entre arquétipos.
3. **"Probabilidade de Erro" obrigatória** — cada classe tem texto específico de como o resultado pode ter falhado por viés de desejabilidade social ou aspiração vs. realidade.
4. **Raças não são etnia** — são arquiteturas cognitivas. Tiefling não é "mau" — tem pensamento projetivo alto. Orc não é "burro" — processa cineticamente.
5. **Neurodivergências = superpoder + custo** — cada detecção tem ambos. Nunca apenas déficit.
6. **Sem back-end** — tudo efêmero no navegador. Zero rastreamento, zero coleta de dados, zero analytics.

---

*Gerado automaticamente a partir do código-fonte — 2026-04-10.*
