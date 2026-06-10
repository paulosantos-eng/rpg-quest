"""
⚠️ LEGADO — NÃO USAR PARA VALIDAÇÃO.

Este script replicava À MÃO o engine v1 (z-score intra-pessoa + cosseno) e
dessincronizou do código real. O engine v2 (2026-06) substituiu essa
matemática, e a validação oficial agora é:

    node sim/simulate.mjs          # validação completa
    node sim/simulate.mjs grid     # calibração de parâmetros

O harness Node importa js/engine.js e js/data.js REAIS (zero drift) e simula
em nível de resposta. Resultados e parâmetros: sim/CALIBRATION.md.
Mantido apenas como registro histórico da análise que motivou o v2.

────────────────────────────────────────────────────────────────────
Monte Carlo — RPG Personality Quest
Análise de Viés Gravitacional no Motor Cosseno + Z-Score

Hipótese testada:
  Perfis de baixa variância com leve inclinação positiva em A e C
  (viés de desejabilidade social) criam 'buracos negros' em direção
  a Paladino (A=95, C=85, E=88, N=12) e Clérigo (A=98, C=88, E=18, N=32).

Três distribuições:
  1. Aleatório Uniforme     — baseline sem viés
  2. Moderado Enviesado     — simula respondente "bom cidadão" (A↑, C↑, N↓, baixa variância)
  3. Caótico/Extremo        — respostas polarizadas (10 ou 90 por dimensão)

Instalação: pip install numpy matplotlib
Autor: gerado para RPG Personality Quest, 2026-04-10
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
from collections import Counter

# ── CONFIGURAÇÃO ─────────────────────────────────────────────────────────────

DIMS = ['O', 'C', 'E', 'A', 'N']

# Perfis Big Five das 11 classes (replicados de data.js)
CLASSES = {
    'Guerreiro':  {'O': 15,  'C': 90, 'E': 90, 'A': 25, 'N': 15},
    'Mago':       {'O': 98,  'C': 30, 'E': 8,  'A': 28, 'N': 42},
    'Ladino':     {'O': 72,  'C': 5,  'E': 95, 'A': 12, 'N': 60},
    'Clerigo':    {'O': 22,  'C': 88, 'E': 18, 'A': 98, 'N': 32},
    'Bardo':      {'O': 95,  'C': 18, 'E': 96, 'A': 75, 'N': 62},
    'Paladino':   {'O': 75,  'C': 85, 'E': 88, 'A': 95, 'N': 12},
    'Cacador':    {'O': 20,  'C': 92, 'E': 22, 'A': 55, 'N': 10},
    'Necromante': {'O': 82,  'C': 85, 'E': 10, 'A': 5,  'N': 35},
    'Samurai':    {'O': 10,  'C': 98, 'E': 35, 'A': 45, 'N': 8},
    'Ninja':      {'O': 60,  'C': 70, 'E': 12, 'A': 50, 'N': 55},
    'Monge':      {'O': 88,  'C': 45, 'E': 5,  'A': 88, 'N': 70},
}

CLASS_COLORS = {
    'Guerreiro': '#c0392b', 'Mago': '#8e44ad', 'Ladino': '#27ae60',
    'Clerigo': '#d4a017',   'Bardo': '#e67e22', 'Paladino': '#2980b9',
    'Cacador': '#16a085',   'Necromante': '#2c3e50', 'Samurai': '#7f8c8d',
    'Ninja': '#1a5276',     'Monge': '#6c3483',
}

# Classes do "eixo bom" — as que testamos para buraco negro
GOOD_AXIS = {'Paladino', 'Clerigo'}

N_USERS = 10_000

# ── MOTOR MATEMÁTICO (replicação exata do engine.js) ─────────────────────────

def z_score_normalize(scores: dict) -> dict:
    """
    Replica zScoreNormalize() do engine.js.

    Amplifica diferenças relativas entre dimensões do próprio respondente.
    Efeito colateral detectado: quando N é a dimensão mais baixa do perfil,
    o z-score o empurra para valores muito baixos (≈15), alinhando artificialmente
    com Paladino (N=12) e Clérigo (N=32) mesmo em respondentes moderados.
    """
    vals = np.array([scores[d] for d in DIMS], dtype=float)
    mean = vals.mean()
    std = max(float(vals.std()), 1.0)  # floor=1 replica o '|| 1' do JS
    return {
        d: float(np.clip(50.0 + (scores[d] - mean) / std * 20.0, 0.0, 100.0))
        for d in DIMS
    }

def cosine_sim(user: dict, target: dict) -> float:
    """
    Replica cosineSim() do engine.js (centrada em 50).

    Subtrai 50 antes de calcular para que o ponto neutro seja a origem.
    Retorna -1 se o perfil do usuário for plano (magU < 0.001).
    """
    dot = mag_u = mag_v = 0.0
    for d in DIMS:
        u = user[d] - 50.0
        v = target[d] - 50.0
        dot   += u * v
        mag_u += u ** 2
        mag_v += v ** 2
    mag_u = float(np.sqrt(mag_u))
    if mag_u < 0.001:
        return -1.0
    return dot / (mag_u * float(np.sqrt(mag_v)))

def classify(scores: dict) -> str:
    """Retorna a classe vencedora (maior similaridade cossenoidal)."""
    normalized = z_score_normalize(scores)
    return max(CLASSES, key=lambda cls: cosine_sim(normalized, CLASSES[cls]))

def get_all_sims(scores: dict) -> dict:
    """Retorna similaridade de todas as classes (para análise de separação)."""
    normalized = z_score_normalize(scores)
    return {cls: cosine_sim(normalized, CLASSES[cls]) for cls in CLASSES}

# ── GERADORES DE PERFIS ───────────────────────────────────────────────────────

def gen_uniform(n: int) -> list[dict]:
    """
    Distribuição 1 — Aleatório Uniforme U(0, 100).
    Baseline: sem viés, máxima entropia.
    Resultado esperado: distribuição aproximadamente uniforme entre classes.
    """
    rng = np.random.default_rng(42)
    scores = rng.uniform(0, 100, size=(n, 5))
    return [{d: float(scores[i, j]) for j, d in enumerate(DIMS)} for i in range(n)]

def gen_moderate_biased(n: int) -> list[dict]:
    """
    Distribuição 2 — Moderado Enviesado (viés de desejabilidade social).

    Modelo empírico do respondente típico de teste de personalidade online:
      - Responde dentro de uma faixa "segura" (45–72)
      - Inconscientemente inflaciona A e C (quer parecer cooperativo e responsável)
      - Deflaciona N (ninguém quer se apresentar como instável)
      - O e E ficam próximos ao neutro

    Variância intra-respondente: baixa (~8–11)
    Desirability Signal esperado: ~20–40
    """
    rng = np.random.default_rng(43)
    profiles = []
    for _ in range(n):
        profiles.append({
            'O': float(np.clip(rng.normal(52, 7),  44, 66)),  # levemente acima do neutro
            'C': float(np.clip(rng.normal(60, 7),  48, 72)),  # inflacionado
            'E': float(np.clip(rng.normal(52, 7),  44, 66)),  # neutro
            'A': float(np.clip(rng.normal(62, 7),  50, 76)),  # inflacionado (mais alto que C)
            'N': float(np.clip(rng.normal(38, 7),  24, 52)),  # deflacionado
        })
    return profiles

def gen_extreme(n: int) -> list[dict]:
    """
    Distribuição 3 — Caótico/Extremo (Bernoulli por dimensão).

    Cada dimensão é independentemente 10 ou 90 (p=0.5).
    Cobre 2^5 = 32 perfis extremos possíveis.
    Sem viés de desejabilidade — resposta impulsiva ou intencional.
    """
    rng = np.random.default_rng(44)
    choices = rng.choice([10.0, 90.0], size=(n, 5))
    return [{d: float(choices[i, j]) for j, d in enumerate(DIMS)} for i in range(n)]

# ── MÉTRICAS DE DIAGNÓSTICO ───────────────────────────────────────────────────

def gravitational_pull(counts: Counter, n: int) -> dict:
    """
    Pull Index: quanto a classe mais popular desvia da distribuição uniforme ideal.

    Se pull_index >> 0, há concentração anormal → buraco negro gravitacional.
    Esperado uniforme: 100/11 = 9.09% por classe.
    """
    expected = 100.0 / len(CLASSES)
    top_cls, top_cnt = counts.most_common(1)[0]
    top_pct = top_cnt / n * 100
    top3_pct = sum(c for _, c in counts.most_common(3)) / n * 100
    return {
        'top_class': top_cls,
        'top_pct': top_pct,
        'expected': expected,
        'pull_index': (top_pct - expected) / expected * 100,  # % acima do esperado
        'top3_concentration': top3_pct,
    }

def separation_stats(profiles: list[dict], n_sample: int = 1000) -> dict:
    """
    Separação relativa entre 1º e 2º colocados: (s1 - s2) / s1.

    Separação baixa → ambiguidade → o viés pequeno torna-se decisivo.
    Separação alta → identidade forte → algoritmo robusto.
    """
    seps = []
    for p in profiles[:n_sample]:
        sims = list(get_all_sims(p).values())
        sims.sort(reverse=True)
        sep = ((sims[0] - sims[1]) / sims[0]) if sims[0] > 0 else 0.0
        seps.append(sep)
    return {
        'mean': float(np.mean(seps)),
        'median': float(np.median(seps)),
        'std': float(np.std(seps)),
        'pct_ambiguous': float(np.mean([s < 0.05 for s in seps])) * 100,
        'pct_confident': float(np.mean([s > 0.20 for s in seps])) * 100,
    }

def zscore_amplification_demo():
    """
    Demonstra analiticamente o mecanismo do buraco negro:
    Mostra como um perfil moderado (O=52, C=60, E=52, A=62, N=38)
    é transformado pelo z-score e sua similaridade com cada classe.
    """
    # Perfil médio do respondente "bom cidadão"
    moderate = {'O': 52, 'C': 60, 'E': 52, 'A': 62, 'N': 38}
    normalized = z_score_normalize(moderate)

    print("\n" + "─" * 60)
    print("  ANÁLISE ANALÍTICA: Transformação Z-Score")
    print("─" * 60)
    print(f"\n  Perfil bruto (viés social típico):")
    for d in DIMS:
        print(f"    {d}: {moderate[d]:5.1f}")

    print(f"\n  Após z_score_normalize() [z × 20 + 50]:")
    for d in DIMS:
        print(f"    {d}: {moderate[d]:5.1f}  →  {normalized[d]:5.1f}  "
              f"(Δ = {normalized[d] - moderate[d]:+.1f})")

    print(f"\n  → N={moderate['N']} bruto vira N={normalized['N']:.1f} após z-score")
    print(f"    (porque N é a dimensão mais baixa do próprio perfil)")
    print(f"    Paladino tem N=12, Clérigo tem N=32 — ambos se beneficiam")

    print(f"\n  Similaridade cossenoidal com perfil normalizado:")
    sims = {cls: cosine_sim(normalized, CLASSES[cls]) for cls in CLASSES}
    for cls, sim in sorted(sims.items(), key=lambda x: -x[1]):
        bar = '█' * int(sim * 30)
        marker = ' ← BURACO NEGRO' if cls in GOOD_AXIS and sim == max(sims.values()) else ''
        print(f"    {cls:12s}  {sim:.4f}  {bar}{marker}")

# ── EXECUÇÃO ──────────────────────────────────────────────────────────────────

print("=" * 65)
print("  MONTE CARLO — RPG PERSONALITY QUEST ENGINE")
print(f"  Simulando {N_USERS:,} usuários por distribuição...")
print("=" * 65)

# Demonstração analítica antes do Monte Carlo
zscore_amplification_demo()

# Gerar e classificar
print(f"\n{'─' * 65}")
print("  CLASSIFICANDO USUÁRIOS VIRTUAIS")
print('─' * 65)

profile_sets = {
    'Aleatório Uniforme':      gen_uniform(N_USERS),
    'Moderado Enviesado':      gen_moderate_biased(N_USERS),
    'Caótico/Extremo':         gen_extreme(N_USERS),
}

results = {}
for label, profiles in profile_sets.items():
    print(f"  {label}...")
    results[label] = [classify(p) for p in profiles]

# ── RELATÓRIO TEXTO ───────────────────────────────────────────────────────────

print(f"\n{'=' * 65}")
print("  RESULTADOS")
print(f"{'=' * 65}")

for label, winners in results.items():
    counts   = Counter(winners)
    metrics  = gravitational_pull(counts, N_USERS)
    sep      = separation_stats(profile_sets[label])

    print(f"\n{'─' * 65}")
    print(f"  DISTRIBUIÇÃO: {label.upper()}")
    print(f"{'─' * 65}")

    for cls, cnt in sorted(counts.items(), key=lambda x: -x[1]):
        pct = cnt / N_USERS * 100
        bar = '█' * int(pct)
        flag = ''
        if cls in GOOD_AXIS and pct > 15:
            flag = '  ← ⚠️  BURACO NEGRO'
        elif pct > 18:
            flag = '  ← atenção'
        print(f"  {cls:12s}  {pct:5.1f}%  {bar}{flag}")

    pal_pct = counts.get('Paladino', 0) / N_USERS * 100
    cle_pct = counts.get('Clerigo', 0) / N_USERS * 100

    print(f"\n  ► Pull Index (classe #1 vs esperado): "
          f"{metrics['pull_index']:+.1f}%")
    print(f"  ► Concentração Top-3:                 "
          f"{metrics['top3_concentration']:.1f}%")
    print(f"  ► Paladino + Clérigo combinados:      "
          f"{pal_pct + cle_pct:.1f}%  (esperado: {2/11*100:.1f}%)")
    print(f"  ► Separação média 1º-2º:              "
          f"{sep['mean']:.3f} ± {sep['std']:.3f}")
    print(f"  ► % resultados ambíguos (sep < 5%):   "
          f"{sep['pct_ambiguous']:.1f}%")
    print(f"  ► % resultados confiantes (sep > 20%): "
          f"{sep['pct_confident']:.1f}%")

# ── RESUMO DO DIAGNÓSTICO ─────────────────────────────────────────────────────

print(f"\n{'=' * 65}")
print("  DIAGNÓSTICO: EIXO 'BOM/LEAL' (Paladino + Clérigo)")
print(f"{'=' * 65}")
expected_good_axis = 2 / 11 * 100
print(f"  Esperado uniforme: {expected_good_axis:.1f}%")
for label, winners in results.items():
    counts = Counter(winners)
    total  = (counts.get('Paladino', 0) + counts.get('Clerigo', 0)) / N_USERS * 100
    ratio  = total / expected_good_axis
    print(f"  {label:30s}  {total:5.1f}%  ({ratio:.1f}× esperado)")

# ── VISUALIZAÇÃO ──────────────────────────────────────────────────────────────

fig = plt.figure(figsize=(22, 15))
fig.patch.set_facecolor('#07090f')

gs = gridspec.GridSpec(2, 4, figure=fig, hspace=0.5, wspace=0.35)

# ── Linha 1: 3 bar charts (uma por distribuição) ──────────────────────────────
axes_bar = [fig.add_subplot(gs[0, i]) for i in range(3)]
expected_line = 100.0 / len(CLASSES)

for ax, (label, winners) in zip(axes_bar, results.items()):
    counts = Counter(winners)
    class_list = list(CLASSES.keys())
    freqs  = [counts.get(c, 0) / N_USERS * 100 for c in class_list]
    colors = [
        '#ff3a3a' if c in GOOD_AXIS else CLASS_COLORS.get(c, '#888')
        for c in class_list
    ]

    bars = ax.barh(class_list, freqs, color=colors, alpha=0.85, height=0.65)
    ax.axvline(expected_line, color='#d4af37', ls='--', lw=1.2, alpha=0.6,
               label=f'Esperado ({expected_line:.1f}%)')
    ax.set_xlabel('% usuários', color='#a09080', fontsize=9)
    ax.set_title(label, color='#e8e2d8', fontsize=11, fontweight='bold', pad=6)
    ax.set_facecolor('#0f1828')
    ax.tick_params(colors='#a09080', labelsize=8)
    for spine in ax.spines.values():
        spine.set_color('#1a2a3a')

    for bar, freq in zip(bars, freqs):
        if freq > 0:
            ax.text(freq + 0.2, bar.get_y() + bar.get_height() / 2,
                    f'{freq:.1f}%', va='center', fontsize=7.5, color='#a09080')

    if ax is axes_bar[0]:
        ax.legend(loc='lower right', fontsize=7, labelcolor='#a09080',
                  facecolor='#0f1828', edgecolor='#333')

# ── Linha 2: Heatmap de similaridade média (dist. moderada) + boxplot separação ──

ax_heat = fig.add_subplot(gs[1, :2])
ax_box  = fig.add_subplot(gs[1, 2:])

# Heatmap: para distribuição moderada, média dos scores BRUTOS por classe vencedora
mod_profiles = profile_sets['Moderado Enviesado']
mod_winners  = results['Moderado Enviesado']

score_by_class = {cls: {d: [] for d in DIMS} for cls in CLASSES}
for profile, winner in zip(mod_profiles, mod_winners):
    for d in DIMS:
        score_by_class[winner][d].append(profile[d])

class_list = list(CLASSES.keys())
heatmap = np.array([
    [np.mean(score_by_class[cls][d]) if score_by_class[cls][d] else 50.0
     for d in DIMS]
    for cls in class_list
])

im = ax_heat.imshow(heatmap, cmap='RdYlGn', vmin=38, vmax=70, aspect='auto')
ax_heat.set_xticks(range(len(DIMS)))
ax_heat.set_xticklabels(DIMS, color='#e8e2d8', fontsize=10, fontweight='bold')
ax_heat.set_yticks(range(len(class_list)))
ax_heat.set_yticklabels(class_list, color='#e8e2d8', fontsize=8)
ax_heat.set_title(
    'Score Médio Bruto por Classe Vencedora — Distribuição Moderada Enviesada\n'
    '(mostra que Paladino e Clérigo capturam mesmo perfis com pequeno viés A↑C↑N↓)',
    color='#e8e2d8', fontsize=9, pad=8
)
ax_heat.set_facecolor('#0f1828')

for i in range(len(class_list)):
    for j in range(len(DIMS)):
        val = heatmap[i, j]
        ax_heat.text(j, i, f'{val:.0f}', ha='center', va='center',
                     fontsize=7.5, color='black' if 44 < val < 66 else 'white',
                     fontweight='bold')

plt.colorbar(im, ax=ax_heat, shrink=0.8,
             label='Score médio bruto').ax.yaxis.label.set_color('#a09080')

# Boxplot: separação 1º-2º lugar por distribuição
sep_data = []
sep_labels_short = []
for label, profiles in profile_sets.items():
    seps = []
    for p in profiles[:2000]:
        sims = list(get_all_sims(p).values())
        sims.sort(reverse=True)
        sep = ((sims[0] - sims[1]) / sims[0]) if sims[0] > 0 else 0.0
        seps.append(sep)
    sep_data.append(seps)
    sep_labels_short.append(label[:20])

bp = ax_box.boxplot(sep_data, labels=sep_labels_short, patch_artist=True,
                    medianprops=dict(color='#d4af37', lw=2.5),
                    whiskerprops=dict(color='#a09080'),
                    capprops=dict(color='#a09080'),
                    flierprops=dict(marker='.', color='#a09080', ms=2, alpha=0.3))

box_colors = ['#3498db', '#e74c3c', '#2ecc71']
for patch, color in zip(bp['boxes'], box_colors):
    patch.set_facecolor(color)
    patch.set_alpha(0.7)
    patch.set_edgecolor('#fff')

ax_box.axhline(0.05, color='#ff4444', ls='--', lw=1.5, alpha=0.8,
               label='Limiar ambiguidade (sep < 5%)')
ax_box.axhline(0.20, color='#2ecc71', ls='--', lw=1.5, alpha=0.8,
               label='Limiar confiança (sep > 20%)')
ax_box.set_facecolor('#0f1828')
ax_box.tick_params(colors='#a09080', labelsize=8)
ax_box.set_ylabel('Separação relativa 1º-2º', color='#a09080', fontsize=9)
ax_box.set_title(
    'Separação entre 1º e 2º Colocados\n(baixa separação = viés decide o resultado)',
    color='#e8e2d8', fontsize=9, pad=8
)
for spine in ax_box.spines.values():
    spine.set_color('#1a2a3a')
ax_box.legend(fontsize=7, labelcolor='#a09080', facecolor='#0f1828', edgecolor='#333')

# Anotações vermelhas destacando Paladino e Clérigo nos bar charts
for ax in axes_bar:
    for label_obj in ax.get_yticklabels():
        if label_obj.get_text() in GOOD_AXIS:
            label_obj.set_color('#ff6666')
            label_obj.set_fontweight('bold')

fig.suptitle(
    '⚗️  Monte Carlo — Gravitational Pull Analysis  ·  RPG Personality Quest Engine\n'
    f'n = {N_USERS:,} usuários por distribuição  ·  Classes em vermelho = eixo Bom/Leal (alvo do debuff)',
    color='#d4af37', fontsize=13, fontweight='bold', y=1.01
)

plt.savefig('monte_carlo_rpg.png', bbox_inches='tight', dpi=150,
            facecolor='#07090f')
print("\n✓ Gráfico salvo: monte_carlo_rpg.png")
plt.show()
