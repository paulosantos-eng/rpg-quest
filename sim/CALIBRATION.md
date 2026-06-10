# Calibração do Engine v2 — RPG Personality Quest

Harness: `node sim/simulate.mjs grid` (busca de parâmetros) e `node sim/simulate.mjs` (validação final).
O harness importa `js/engine.js` e `js/data.js` REAIS — zero drift entre simulação e produção.

## Parâmetros escolhidos (fixados em `js/engine.js` → `CALIB`)

| Parâmetro | Valor | Papel |
|---|---|---|
| `alpha` | 0.5 | peso direção (cosseno) vs magnitude (euclídea) no matching |
| `tau` | 0.045 | temperatura do softmax do ranking de classes/raças |
| `lambda` | 0.7 | força máxima da correção de gestão de impressão (com gate comportamental) |

## Validação final (N grande, seed fixa)

| Métrica | Resultado | Aceite |
|---|---|---|
| Recuperação de classe (latente = protótipo + ruído σ=10) | **96.6%** top-1 · 99.5% top-2 | ≥70% |
| Pior classe (Samurai, protótipo próximo de Caçador) | 87.5% | — |
| Calibração da confiança P(top1) | **5.3pp** de erro médio | ≤10pp |
| Calibração do ranking softmax | **4.0pp** de erro médio | ≤10pp |
| Recuperação de raça (9 raças, chance 11%) | **65.6%** | — |
| Regressão "todo mundo é Elfo" (share máx. de raça entre quem converge na fase 1) | **19.4%** ✓ não-degenerado (v1: 100% Elfo) | <45% |
| Perguntas médias | 36.6 (53.9% convergem com 30) | ≤50 |
| Índice de Gestão de Impressão: fingidores vs honestos | **83 vs 50** (Δ33 — flag separa) | Δ≥15 |
| Neurodiv em população uniforme extrema / realista | 21.3% / 7.0% | — |

## O trade-off do λ (por que 0.7, não 1.0)

População de teste: latente NEUTRO em tudo + viés de escolha γ=0.55 (escolhe
sistematicamente a opção mais "virtuosa" A↑C↑N↓ de cada item — o fingidor puro).
Gêmeo honesto: mesmos latentes, γ=0.

| λ | Excesso Paladino+Clérigo vs gêmeo honesto | Recuperação de Paladinos/Clérigos GENUÍNOS |
|---|---|---|
| 0 | +56pp | ~97% |
| 0.7 | **+39pp** | **94.4%** |
| 0.85 | +21pp | 69.4% |
| 1.0 | −8pp (sobre-corrige) | 36.1% ✗ |

O perfil *medido* de um fingidor consistente é informacionalmente
indistinguível de um Paladino genuíno — corrigir o suficiente para eliminar o
excesso destrói os usuários genuínos. λ=0.7 é o ponto em que a correção ajuda
sem sacrificar ninguém real, e o resíduo é tratado como **escala de validade**
(prática padrão em psicometria: NEO-PI-R, MMPI): o Índice de Gestão de
Impressão (83 vs 50, separação limpa) aciona aviso explícito no dossiê
sugerindo refazer o teste respondendo "como age, não como aspira".

## Decisões de arquitetura validadas aqui

1. **Score = média por item com shrinkage** (prior de 2 pseudo-itens no neutro)
   — escala independente do nº de itens; eliminou o feedback loop do CAT v1.
2. **Matching híbrido** ½ cosseno + ½ euclídea — direção E magnitude contam.
3. **Probabilidades via softmax(−d/τ)** — o ranking soma 100% e é calibrado
   (probabilidade exibida ≈ frequência real de acerto, erro 4pp).
4. **Confiança = P(top1) por Monte Carlo posterior** (300 draws de
   Normal(score, SE) por dimensão) — calibrada a 5.3pp; é o critério de parada
   do CAT (fases encerram com P ≥ 0.85/0.80/0.75).
5. **Bloco cognitivo garantido de 10 itens** após a personalidade convergir —
   conserta o bug "todo mundo é Elfo" e torna a neurodivergência mensurável.
