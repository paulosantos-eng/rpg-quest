// ============================================================
// RPG PERSONALITY QUEST — APP
// UI rendering, quiz flow, overlays, navigation
// ============================================================

import {
  CLASSES, RACES, DIMS, COG_DIMS, BF_COLORS, BF_LABELS,
  MBTI_INFO, MBTI_TYPES, BF_EDU, CORE, INFLUENCE, CAT_CONFIG, METHODOLOGY
} from './data.js';

import {
  getState, resetState, selectNextQuestion, applyAnswer,
  getRankedClasses, getSecondary, calcConfidence, shouldEndQuiz,
  advancePhase, computeResult, getProgress
} from './engine.js';

// ── HELPERS ─────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

function el(tag, cls, html) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html) e.innerHTML = html;
  return e;
}

// ── STARS ────────────────────────────────────────────────────
function initStars() {
  const container = $('stars');
  for (let i = 0; i < 55; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    s.style.cssText = `left:${Math.random()*100}%;top:${Math.random()*100}%;--d:${2+Math.random()*4}s;--dl:${Math.random()*5}s;--o:${0.2+Math.random()*0.4}`;
    container.appendChild(s);
  }
}

// ── NAVIGATION ──────────────────────────────────────────────
let currentScreen = 0;

function go(n) {
  $$('.pg').forEach(p => p.style.display = 'none');
  currentScreen = n;
  const screen = $(`s${n}`);
  screen.style.display = 'block';
  screen.classList.remove('ani');
  void screen.offsetWidth;
  screen.classList.add('ani');
  window.scrollTo(0, 0);

  const nav = $('nav');
  nav.style.display = n === 0 ? 'none' : 'flex';
  if (n > 0) {
    $$('.ps').forEach(p => {
      const pn = parseInt(p.dataset.p);
      p.classList.toggle('on', pn === n);
      p.classList.toggle('dn', pn < n);
    });
  }
  if (n === 3) setTimeout(animateRaceBars, 120);
  if (n === 6) startQuiz();
}

// ── INIT NAVIGATION EVENTS ──────────────────────────────────
function initNav() {
  // Nav dots
  $$('.ps').forEach(p => {
    p.addEventListener('click', () => go(parseInt(p.dataset.p)));
  });
  // All data-go buttons
  $$('[data-go]').forEach(btn => {
    btn.addEventListener('click', () => go(parseInt(btn.dataset.go)));
  });
  // Start button
  $('btn-start').addEventListener('click', () => go(1));
  // Phase continue
  $('btn-continue').addEventListener('click', () => {
    $('phov').classList.remove('show');
    renderNextQ();
  });
  // Overlay close
  $('ov-close').addEventListener('click', closeOverlay);
  $('ov').addEventListener('click', e => { if (e.target === $('ov')) closeOverlay(); });
  // ESC key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if ($('ov').classList.contains('show')) closeOverlay();
      else if ($('phov').classList.contains('show')) $('phov').classList.remove('show');
    }
  });
}

// ── TOAST ────────────────────────────────────────────────────
function showToast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ── INIT CLASSES GRID ───────────────────────────────────────
function initClassGrid() {
  const grid = $('cgrid');
  Object.entries(CLASSES).forEach(([key, c]) => {
    const card = el('div', 'cc');
    card.style.setProperty('--cl', c.color);
    card.innerHTML = `
      <div class="ce"><span aria-hidden="true">${c.emoji}</span></div>
      <div class="cn">${c.name}</div>
      <div class="cm">MBTI ${c.mbti} · ${c.tagline}</div>
      <div class="cd">${c.desc}</div>
      <div class="ctgs">${c.traits.map(t => `<span class="ctg">${t}</span>`).join('')}</div>
    `;
    card.addEventListener('click', () => showClassDetail(key));
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', e => { if (e.key === 'Enter') showClassDetail(key); });
    grid.appendChild(card);
  });
}

// ── CLASS DETAIL OVERLAY ────────────────────────────────────
function showClassDetail(key) {
  const c = CLASSES[key];
  const col = c.color;

  $('oh').innerHTML = `
    <span class="oe" aria-hidden="true">${c.emoji}</span>
    <div class="on2" style="color:${col}">${c.name}</div>
    <div class="obadge" style="border-color:${col};color:${col}">MBTI: ${c.mbti}</div>
    <div class="ocomp">Compatível: <b>${c.compat.join(' · ')}</b></div>
    <p class="odesc">${c.desc}</p>
  `;

  $('ob').innerHTML = `
    <div class="osec">
      <div class="osec-t" style="color:${col}">Traços</div>
      <div class="otr">${c.traits.map(t => `<span class="otrait" style="border-color:${col};color:${col}">${t}</span>`).join('')}</div>
    </div>
    <div class="osec">
      <div class="osec-t" style="color:${col}">Big Five Calibrado</div>
      <div class="obf" id="obf-inner"></div>
    </div>
    <div class="osec">
      <div class="osec-t" style="color:${col}">MBTI — ${c.mbti}</div>
      <div class="ombti">
        ${c.mbti.split('').map(L => {
          const m = MBTI_INFO[L];
          return `<div class="ombti-d"><span class="ombti-l" style="color:${m.c}">${m.l}</span><span class="ombti-w">${m.w}</span><div class="ombti-d2">${m.d}</div></div>`;
        }).join('')}
      </div>
    </div>
    ${c.subclasses ? `
    <div class="osec">
      <div class="osec-t" style="color:${col}">Subclasses</div>
      <div class="doss-grid">
        ${c.subclasses.map(s => `
          <div class="doss">
            <div class="doss-t" style="color:${col}">${s.name}</div>
            <div style="font-family:Cinzel,serif;font-size:.55rem;letter-spacing:.1em;color:var(--dm);margin-bottom:8px">${s.tagline}</div>
            <div class="doss-txt">${s.desc}</div>
          </div>
        `).join('')}
      </div>
    </div>` : ''}
    <div class="osec">
      <div class="osec-t" style="color:${col}">Personagens & Figuras</div>
      <div class="ochars">
        ${c.chars.map(ch => `<div class="ochar"><span class="ochar-e" aria-hidden="true">${ch.e}</span><div class="ochar-n">${ch.n}</div><div class="ochar-s">${ch.s}</div></div>`).join('')}
      </div>
    </div>
    <div style="text-align:center;padding:20px 0 4px;border-top:1px solid var(--bd)">
      <button class="btn btn-lg" id="ov-quiz-btn">Fazer o Quiz →</button>
    </div>
  `;

  // Animate BF bars
  const bfDiv = $('obf-inner');
  DIMS.forEach(k => {
    const row = el('div', 'obf-row');
    row.innerHTML = `
      <div class="obf-lbl">${BF_LABELS[k]} (${k})</div>
      <div class="obf-tr"><div class="obf-fill" id="obf-${key}-${k}" style="background:${BF_COLORS[k]}"></div></div>
      <div class="obf-n">${c.bf[k]}</div>
    `;
    bfDiv.appendChild(row);
  });

  setTimeout(() => {
    DIMS.forEach(k => {
      const bar = $(`obf-${key}-${k}`);
      if (bar) bar.style.width = `${c.bf[k]}%`;
    });
  }, 80);

  $('ov').classList.add('show');
  document.body.style.overflow = 'hidden';

  // Quiz button inside overlay
  setTimeout(() => {
    const qb = $('ov-quiz-btn');
    if (qb) qb.addEventListener('click', () => { closeOverlay(); go(6); });
  }, 50);
}

function closeOverlay() {
  $('ov').classList.remove('show');
  document.body.style.overflow = '';
}

// ── RACES GRID ──────────────────────────────────────────────
function initRaces() {
  const grid = $('rgrid');
  if (!grid) return;
  Object.entries(RACES).forEach(([key, r]) => {
    const card = document.createElement('div');
    card.className = 'rc';
    card.style.setProperty('--cl', r.color);

    const cogBars = COG_DIMS.map(d => `
      <div class="rcog-row">
        <div class="rcog-lbl">${d}</div>
        <div class="rcog-tr"><div class="rcog-fill" data-w="${r.cogProfile[d]}" style="background:${r.color};width:0%"></div></div>
        <div class="rcog-n">${r.cogProfile[d]}</div>
      </div>`).join('');

    card.innerHTML = `
      <div class="re">${r.emoji}</div>
      <div class="rn">${r.name}</div>
      <div class="rtg">${r.tagline}</div>
      <div class="rd">${r.desc}</div>
      <div class="rcog">${cogBars}</div>
      <div class="remb">${r.embasamento}</div>
      ${r.neurodiv ? `<div class="rnd">⚡ ${r.neurodiv.tipo} — ${r.neurodiv.desc}</div>` : ''}
      <div class="rfan">"${r.curiosidade}"</div>
    `;
    grid.appendChild(card);
  });
}

function animateRaceBars() {
  document.querySelectorAll('.rcog-fill').forEach(bar => {
    bar.style.width = (bar.dataset.w || 0) + '%';
  });
}

// ── MBTI TABS ───────────────────────────────────────────────
function initMBTI() {
  const tabs = $('mtabs');
  const panels = $('mbti-panels');
  const groups = [
    { id: 'dim', label: 'As 4 Dimensões' },
    { id: 'ana', label: '🔬 Analistas' },
    { id: 'dip', label: '🏛️ Diplomatas' },
    { id: 'sen', label: '🏗️ Sentinelas' },
    { id: 'exp', label: '🪂 Exploradores' }
  ];

  groups.forEach((g, i) => {
    const btn = el('button', `mtab${i === 0 ? ' on' : ''}`);
    btn.textContent = g.label;
    btn.addEventListener('click', () => {
      $$('.mtab').forEach(t => t.classList.remove('on'));
      btn.classList.add('on');
      $$('.mpl').forEach(p => p.classList.remove('on'));
      $(`mt-${g.id}`).classList.add('on');
    });
    tabs.appendChild(btn);
  });

  // Dimensions panel
  const dimPanel = el('div', 'mpl on');
  dimPanel.id = 'mt-dim';
  dimPanel.innerHTML = `<div class="d4">
    ${[['E','I','Extroversão','Introversão','De onde você tira energia?'],
       ['S','N','Sensação','Intuição','Como você percebe o mundo?'],
       ['T','F','Pensamento','Sentimento','Como você decide?'],
       ['J','P','Julgamento','Percepção','Como você organiza sua vida?']
    ].map(([a,b,wa,wb,q]) => `
      <div class="dc">
        <div class="dvs">
          <div class="dsd"><span class="dl" style="color:var(--gold)">${a}</span><span class="dw2">${wa}</span></div>
          <div class="dsp">vs</div>
          <div class="dsd"><span class="dl" style="color:var(--arc)">${b}</span><span class="dw2">${wb}</span></div>
        </div>
        <p class="db"><strong style="color:var(--gold)">${q}</strong><br><br><strong style="color:var(--gold)">${a}</strong> — ${MBTI_INFO[a].d}<br><br><strong style="color:var(--arc)">${b}</strong> — ${MBTI_INFO[b].d}</p>
      </div>
    `).join('')}
  </div>`;
  panels.appendChild(dimPanel);

  // Type panels
  ['ana', 'dip', 'sen', 'exp'].forEach(grp => {
    const panel = el('div', 'mpl');
    panel.id = `mt-${grp}`;
    panel.innerHTML = `<div class="tgrp"><div class="tgg">
      ${MBTI_TYPES[grp].map(t => `
        <div class="tc">
          <div class="tb" style="color:${t.c}">${t.t}</div>
          <div class="tn">${t.n}</div>
          <div class="td">${t.d}</div>
        </div>
      `).join('')}
    </div></div>`;
    panels.appendChild(panel);
  });
}

// ── BIG FIVE CARDS ──────────────────────────────────────────
function initBigFive() {
  const grid = $('bfgrid');
  BF_EDU.forEach(b => {
    const card = el('div', 'bfc');
    card.style.setProperty('--bc', b.c);
    card.innerHTML = `
      <div class="bfbig">${b.k}</div>
      <div class="bfn">${b.k} — ${b.n}</div>
      <div class="bfl">${b.l}</div>
      <div class="bfd">${b.d}</div>
      <div class="spclb"><span style="font-family:Cinzel,serif;font-size:.54rem;color:var(--dm)">Baixo</span><span style="font-family:Cinzel,serif;font-size:.54rem;color:var(--dm)">Alto</span></div>
      <div class="spec"><div class="specf" style="background:${b.c}"></div></div>
      <div class="bfbox">
        <div class="bfbt">Espectro</div>
        <div class="bfbr" style="color:#45c97a">↑ ${b.hi}</div>
        <div class="bfbr" style="color:#e05555">↓ ${b.lo}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ── QUIZ ────────────────────────────────────────────────────
function startQuiz() {
  resetState();
  // Reseta painel OCEAN live
  const panel = $('ocean-live');
  if (panel) {
    panel.classList.remove('visible');
    const barsEl = $('ocean-bars');
    const rivalsEl = $('ocean-rivals');
    if (barsEl) barsEl.innerHTML = '';
    if (rivalsEl) rivalsEl.innerHTML = '';
  }
  renderNextQ();
}

function renderNextQ() {
  const result = selectNextQuestion();
  if (!result) { showResult(); return; }

  const { question: q, type } = result;
  const state = getState();

  $('qfl').style.width = `${getProgress() * 100}%`;
  const phaseLabel = state.personalityDone ? '🧬 Hardware Mental' : `Fase ${state.phase}`;
  $('qct').textContent = `${phaseLabel} · Pergunta ${state.totalAsked + 1}`;
  $('qph').textContent = q.ph;

  const qqEl = $('qq');
  qqEl.style.opacity = '0';
  qqEl.textContent = q.q;
  setTimeout(() => { qqEl.style.cssText = 'opacity:1;transition:opacity .25s'; }, 50);

  const container = $('qos');
  container.innerHTML = '';

  if (q.type === 'binary') {
    container.className = 'qos-bin';
    q.opts.forEach(opt => {
      const btn = el('button', 'qo-bin');
      btn.setAttribute('tabindex', '0');
      btn.innerHTML = `<span class="bin-ico" aria-hidden="true">${opt.ico}</span><span class="bin-lbl">${opt.lbl}</span>${opt.t}`;
      btn.addEventListener('click', () => handleAnswer(opt, type, container, btn, 'qo-bin'));
      btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') btn.click(); });
      container.appendChild(btn);
    });
  } else {
    container.className = 'qos';
    const labels = ['A', 'B', 'C', 'D', 'E', 'F'];
    q.opts.forEach((opt, i) => {
      const btn = el('button', 'qo');
      btn.setAttribute('tabindex', '0');
      btn.innerHTML = `<span class="ql" aria-hidden="true">${labels[i]}</span>${opt.t}`;
      if (opt.isSkip) btn.classList.add('qo-skip');
      btn.addEventListener('click', () => handleAnswer(opt, type, container, btn, 'qo'));
      btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') btn.click(); });
      container.appendChild(btn);
    });
  }
}

function handleAnswer(opt, type, container, clickedBtn, btnClass) {
  container.querySelectorAll(`.${btnClass}`).forEach(b => {
    b.style.pointerEvents = 'none';
  });
  clickedBtn.classList.add('pk');

  applyAnswer(opt, type);
  updateOceanLive();

  const delay = btnClass === 'qo-bin' ? 350 : 280;
  setTimeout(() => {
    const check = shouldEndQuiz();
    if (check.end) {
      showResult();
    } else if (check.reason === 'phase_break') {
      showPhaseOverlay(check.ranked, check.conf);
      advancePhase();
    } else if (check.reason === 'cog_start') {
      showCogOverlay(check.ranked, check.conf);
    } else {
      renderNextQ();
    }
  }, delay);
}

// ── OCEAN LIVE PANEL ─────────────────────────────────────────
function updateOceanLive() {
  const state = getState();
  if (state.totalAsked < 5) return; // aparece só após 5 perguntas

  const panel = $('ocean-live');
  const barsEl = $('ocean-bars');
  const rivalsEl = $('ocean-rivals');
  if (!panel || !barsEl) return;

  panel.classList.add('visible');

  // Barras OCEAN
  barsEl.innerHTML = DIMS.map(d => {
    const val = Math.round(state.bf[d] || 50);
    const color = BF_COLORS[d];
    return `
      <div class="ocean-row">
        <div class="ocean-lbl" style="color:${color}">${d}</div>
        <div class="ocean-track"><div class="ocean-fill" style="background:${color};width:${val}%"></div></div>
        <div class="ocean-val">${val}</div>
      </div>`;
  }).join('');

  // Top-3 classes rivais (probabilidades reais — somam 100% nas 11)
  if (state.totalAsked >= 8) {
    const ranked = getRankedClasses();
    rivalsEl.innerHTML = ranked.slice(0, 3).map((r, i) => `
      <div class="ocean-rival" style="border-color:${r.cls.color};color:${r.cls.color}">
        ${i === 0 ? '▲ ' : ''}${r.cls.emoji} ${r.cls.name}
        <span style="opacity:.6;font-size:.52rem"> ${(r.prob * 100).toFixed(0)}%</span>
      </div>`).join('');
  }
}

function fillPhaseOverlayCommon(ranked, conf) {
  const c1 = ranked[0].cls;
  const c2 = ranked[1].cls;

  $('php-fill').style.width = `${conf.pct}%`;
  $('php-pct').textContent = `${conf.pct}% de certeza`;

  const e1 = $('php-c1');
  e1.textContent = `${c1.emoji} ${c1.name}`;
  e1.style.color = c1.color;

  const e2 = $('php-c2');
  e2.textContent = `${c2.emoji} ${c2.name}`;
  e2.style.color = c2.color;

  $('phov').classList.add('show');
}

function showPhaseOverlay(ranked, conf) {
  const state = getState();
  const nextSize = CAT_CONFIG.phaseSizes[Math.min(state.phase, CAT_CONFIG.phaseSizes.length - 1)] || 10;

  $('php-ico').textContent = '⚔️';
  $('php-title').textContent = 'Analisando seu Perfil';
  $('php-sub').textContent = 'O algoritmo precisa de mais dados para ter certeza';
  $('php-next').textContent = nextSize;
  fillPhaseOverlayCommon(ranked, conf);
}

// Transição para o bloco cognitivo: a personalidade convergiu,
// agora a raça (hardware mental) será medida de verdade.
function showCogOverlay(ranked, conf) {
  $('php-ico').textContent = '🧬';
  $('php-title').textContent = 'Personalidade Mapeada';
  $('php-sub').textContent = 'Classe definida. As próximas perguntas medem seu hardware cognitivo — sua Raça e possíveis arquiteturas neurodivergentes.';
  $('php-next').textContent = CAT_CONFIG.cogBlock;
  fillPhaseOverlayCommon(ranked, conf);
}

// ── RESULT SCREEN ───────────────────────────────────────────
function showResult() {
  const result = computeResult();
  const { primary, secondary, ranked, conf, consistency, impression, subclass,
          primaryRace, neurodiv, hybrid, userMbti, totalQuestions, bf, bfSE } = result;
  const c1 = primary.cls;
  const c2 = secondary.cls;
  const col = c1.color;
  const race = primaryRace.race;

  go(7);

  // ── HEADER ──
  let headerHTML = `
    <div style="display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:14px">
      <span style="font-size:3.4rem;animation:fl 4s ease-in-out infinite" aria-hidden="true">${c1.emoji}</span>
      <div style="text-align:center">
        <div style="font-family:Cinzel,serif;font-size:.56rem;letter-spacing:.35em;color:var(--dm);text-transform:uppercase;margin-bottom:4px">Sua Verdadeira Natureza</div>
        <div style="font-family:Cinzel,serif;font-size:clamp(1rem,3vw,1.4rem);font-weight:600;color:${race.color};margin-bottom:2px">${race.emoji} ${race.name}</div>
        <div style="font-family:Cinzel,serif;font-size:clamp(1.5rem,5vw,2.8rem);font-weight:900;line-height:1;color:${col}">${c1.name}</div>
      </div>
    </div>
    <div style="display:inline-flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:10px">
      <div style="font-family:Cinzel,serif;font-size:.78rem;font-weight:700;letter-spacing:.15em;padding:6px 20px;border:1px solid var(--gold);color:var(--gold)">Seu MBTI: ${userMbti.type}</div>
      <div style="font-family:Cinzel,serif;font-size:.78rem;font-weight:700;letter-spacing:.15em;padding:6px 20px;border:1px solid ${col};color:${col};opacity:.8">Arquétipo: ${c1.mbti}</div>
    </div><br>
    ${subclass ? `<div style="display:inline-block;font-family:Cinzel,serif;font-size:.68rem;padding:4px 14px;border:1px solid ${col};color:${col};opacity:.8;margin-bottom:10px">Subclasse: ${subclass.name} — ${subclass.tagline}</div><br>` : ''}
    <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,.04);border:1px solid var(--bd);padding:8px 16px;margin-bottom:18px">
      <span aria-hidden="true">${c2.emoji}</span>
      <span style="font-family:Cinzel,serif;font-size:.65rem;color:var(--md)">com influência de <strong style="color:${c2.color}">${c2.name}</strong> (${(secondary.prob * 100).toFixed(0)}%)</span>
    </div>
    <div style="font-family:Cinzel,serif;font-size:.58rem;color:var(--dm);letter-spacing:.15em;text-transform:uppercase;margin-bottom:12px">
      Probabilidade: <strong style="color:var(--gold)">${conf.pct}%</strong> · ${totalQuestions} perguntas
    </div>
  `;

  // Hybrid text
  const hybridText = hybrid.level === 'hybrid'
    ? `Você é um arquétipo verdadeiramente híbrido: ${CORE[primary.key]} — mas igualmente ${CORE[secondary.key]}. Isso torna você difícil de classificar e impossível de ignorar.`
    : hybrid.level === 'dual'
    ? `Sua essência é a do ${c1.name}: você é ${CORE[primary.key]}. Mas ${INFLUENCE[secondary.key]}. Essa dualidade não é contradição — é complexidade.`
    : `Sua identidade é clara: você é ${CORE[primary.key]}. O ${c2.name} aparece como camada — ${INFLUENCE[secondary.key]} — mas sua natureza principal define quem você é.`;

  headerHTML += `<p style="font-size:.96rem;font-weight:300;line-height:1.82;color:var(--md);max-width:580px;margin:0 auto 18px;font-style:italic">${hybridText}</p>`;
  headerHTML += `<button class="share-btn" id="share-btn"><span aria-hidden="true">📋</span> Compartilhar minha Ficha</button>`;

  $('rhd').innerHTML = headerHTML;

  // Share handler
  setTimeout(() => {
    $('share-btn')?.addEventListener('click', () => {
      const text = `⚔️ RPG Personality Quest\n\n${race.emoji} ${race.name} ${c1.emoji} ${c1.name}\n"${c1.tagline}"\nMBTI: ${userMbti.type} · Probabilidade: ${conf.pct}%\ncom influência de ${c2.emoji} ${c2.name}\n${subclass ? `Subclasse: ${subclass.name}\n` : ''}\n🎮 Descubra sua classe!`;
      navigator.clipboard?.writeText(text).then(() => showToast('✅ Ficha copiada!')).catch(() => showToast('✅ Copiado!'));
    });
  }, 50);

  // ── BODY ──
  const allChars = [...c1.chars];
  c2.chars.slice(0, 4).forEach(ch => { if (!allChars.find(x => x.n === ch.n)) allChars.push(ch); });

  let bodyHTML = '';

  // Validade das respostas: Consistência + Gestão de Impressão
  // (dois índices distintos: contradição interna ≠ viés aspiracional)
  bodyHTML += `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px">
      <div class="sinc-card${consistency.isLow ? ' low' : ''}">
        <div style="font-family:Cinzel,serif;font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:${consistency.isLow ? 'var(--cr)' : 'var(--gold)'};margin-bottom:4px">
          ${consistency.isLow ? '⚠️' : '✓'} Consistência Interna
        </div>
        <div style="font-family:Cinzel,serif;font-size:1.6rem;font-weight:900;color:${consistency.isLow ? 'var(--cr)' : 'var(--gold)'}">${consistency.sincronicidade}%</div>
        <div class="sinc-bar"><div class="sinc-fill" id="sinc-fill" style="width:0%"></div></div>
        <div class="sinc-msg">${consistency.message}</div>
      </div>
      <div class="sinc-card${impression.isHigh ? ' low' : ''}">
        <div style="font-family:Cinzel,serif;font-size:.65rem;letter-spacing:.2em;text-transform:uppercase;color:${impression.isHigh ? 'var(--cr)' : 'var(--gold)'};margin-bottom:4px">
          ${impression.isHigh ? '⚠️' : '✓'} Gestão de Impressão
        </div>
        <div style="font-family:Cinzel,serif;font-size:1.6rem;font-weight:900;color:${impression.isHigh ? 'var(--cr)' : 'var(--gold)'}">${impression.index}<span style="font-size:.8rem;opacity:.6">/100</span></div>
        <div class="sinc-bar"><div class="sinc-fill" id="impr-fill" style="width:0%"></div></div>
        <div class="sinc-msg">${impression.message}</div>
      </div>
    </div>`;
  setTimeout(() => {
    const sf = $('sinc-fill'); if (sf) sf.style.width = `${consistency.sincronicidade}%`;
    const imf = $('impr-fill'); if (imf) imf.style.width = `${impression.index}%`;
  }, 200);

  // Traits
  bodyHTML += `
    <div class="rs"><div class="rst" style="color:${col}">Traços Combinados</div>
      <div class="rtr">
        ${c1.traits.map(t => `<span class="rtg" style="border-color:${col};color:${col}">${t}</span>`).join('')}
        ${c2.traits.filter(t => !c1.traits.includes(t)).slice(0, 3).map(t => `<span class="rtg" style="border-color:${c2.color};color:${c2.color};opacity:.75">${t}</span>`).join('')}
      </div>
    </div>`;

  // Dossiê
  const doss = c1.doss;
  bodyHTML += `
    <div class="rs"><div class="rst" style="color:${col}">📜 Dossiê do Personagem</div>
      <div class="doss-grid">
        <div class="doss"><span class="doss-ico" aria-hidden="true">⚡</span><div class="doss-t" style="color:${col}">Arma Principal</div><div class="doss-txt">${doss.weapon}</div></div>
        <div class="doss"><span class="doss-ico" aria-hidden="true">🩸</span><div class="doss-t" style="color:${col}">Calcanhar de Aquiles</div><div class="doss-txt">${doss.heel}</div></div>
        <div class="doss"><span class="doss-ico" aria-hidden="true">🤝</span><div class="doss-t" style="color:${col}">Dinâmica de Party</div><div class="doss-txt">${doss.party}</div></div>
        <div class="doss"><span class="doss-ico" aria-hidden="true">🗺️</span><div class="doss-t" style="color:${col}">Chamado à Aventura</div><div class="doss-txt">${doss.quest}</div></div>
      </div>
    </div>`;

  // Diagnóstico Clínico + Sombra + Curiosidade + Par Romântico
  bodyHTML += `
    <div class="rs"><div class="rst" style="color:${col}">🧠 Análise Psicométrica Profunda</div>
      <div class="doss-grid">
        <div class="doss"><span class="doss-ico" aria-hidden="true">🔬</span><div class="doss-t" style="color:${col}">Diagnóstico Clínico</div><div class="doss-txt">${doss.diagnostico_clinico}</div></div>
        <div class="doss"><span class="doss-ico" aria-hidden="true">🌑</span><div class="doss-t" style="color:var(--cr)">A Sombra (Arquétipo Imaturo)</div><div class="doss-txt">${doss.a_sombra}</div></div>
        <div class="doss"><span class="doss-ico" aria-hidden="true">💡</span><div class="doss-t" style="color:var(--arc)">Curiosidade Psicológica</div><div class="doss-txt">${doss.curiosidade_psicologica}</div></div>
        <div class="doss"><span class="doss-ico" aria-hidden="true">💘</span><div class="doss-t" style="color:#e74c3c">Par Romântico</div><div class="doss-txt">${doss.par_romantico}</div></div>
      </div>
    </div>`;

  // Guild
  bodyHTML += `
    <div class="guild-card">
      <span class="guild-ico" aria-hidden="true">${doss.guild.icon}</span>
      <div class="guild-name" style="color:${col}">${doss.guild.name}</div>
      <div class="guild-sub">${doss.guild.sub}</div>
      <div class="ctag-wrap">${doss.guild.careers.map(c => `<span class="ctag2">${c}</span>`).join('')}</div>
    </div>`;

  // Race section
  bodyHTML += `
    <div class="rs"><div class="rst" style="color:${race.color}">🧬 Hardware Mental (Raça Cognitiva)</div>
      <div class="race-card" style="border-color:${race.color}">
        <div class="race-emoji" aria-hidden="true">${race.emoji}</div>
        <div class="race-name" style="color:${race.color}">${race.name}</div>
        <div class="race-tagline">${race.tagline} · compatibilidade ${(primaryRace.prob * 100).toFixed(0)}%</div>
        <div class="race-desc">${race.desc}</div>
        <div class="race-sci">${race.embasamento}</div>
        <div class="race-detail"><strong style="color:var(--gold)">Arquitetura Cognitiva:</strong> ${race.arquitetura}</div>
        <div class="race-detail"><strong style="color:var(--cr)">Fantasma Clínico:</strong> ${race.fantasma}</div>
        <div class="race-detail"><strong style="color:var(--arc)">Curiosidade Projetiva:</strong> ${race.curiosidade}</div>
        ${neurodiv.length > 0 ? neurodiv.map(nd => `
          <div class="neurodiv-card">
            <div class="neurodiv-title">⚡ Arquitetura Atípica Detectada: ${nd.nome}</div>
            <div class="neurodiv-type"><strong>${nd.tipo}</strong> (${nd.escala})</div>
            <div class="neurodiv-type" style="margin-top:6px">${nd.desc}</div>
            <div class="neurodiv-type" style="margin-top:6px;color:var(--gold)"><strong>Superpoder:</strong> ${nd.superpoder}</div>
            <div class="neurodiv-type" style="margin-top:4px;color:var(--cr)"><strong>Custo:</strong> ${nd.custo}</div>
          </div>
        `).join('') + `
          <div style="font-size:.72rem;font-style:italic;color:var(--dm);line-height:1.6;margin-top:10px;padding:10px 12px;border-left:2px solid var(--bd)">
            ⚠️ Isto é um padrão de respostas compatível com construtos de <strong>triagem</strong> — não é diagnóstico,
            não substitui avaliação profissional. Se o padrão ressoa com sua experiência, um psicólogo ou
            neuropsicólogo é o caminho para investigar de verdade.
          </div>` : ''}
      </div>
    </div>`;

  // Subclass detail if present
  if (subclass) {
    bodyHTML += `
      <div class="rs"><div class="rst" style="color:${col}">⚔️ Subclasse: ${subclass.name}</div>
        <div class="doss-grid">
          <div class="doss"><span class="doss-ico" aria-hidden="true">📋</span><div class="doss-t" style="color:${col}">${subclass.tagline}</div><div class="doss-txt">${subclass.desc}</div></div>
          <div class="doss"><span class="doss-ico" aria-hidden="true">🔬</span><div class="doss-t" style="color:${col}">Diagnóstico da Variação</div><div class="doss-txt">${subclass.diagnostico}</div></div>
        </div>
      </div>`;
  }

  // Big Five bars
  bodyHTML += `
    <div class="rs"><div class="rst" style="color:${col}">Perfil OCEAN Final</div>
      <div class="rbf" id="bf-result"></div>
    </div>`;

  // Characters
  bodyHTML += `
    <div class="rs"><div class="rst" style="color:${col}">Personagens & Figuras</div>
      <div class="chg">${allChars.map(ch => `
        <div class="chc"><span class="che" aria-hidden="true">${ch.e}</span><div class="chn">${ch.n}</div><div class="chs">${ch.s}</div></div>
      `).join('')}</div>
    </div>`;

  // Ranking probabilístico (soma 100% nas 11 classes)
  bodyHTML += `
    <div class="rs"><div class="rst" style="color:${col}">Ranking — Probabilidade por Arquétipo</div>
      <div style="font-size:.7rem;color:var(--dm);margin-bottom:10px">Probabilidades calibradas por simulação — somam 100% entre as 11 classes.</div>
      <div class="rank" id="rank-result"></div>
    </div>`;

  // Metodologia & Limitações
  bodyHTML += `
    <div class="rs"><div class="rst" style="color:var(--arc)">🔬 Metodologia & Limitações</div>
      <div class="doss-grid">
        ${METHODOLOGY.map(m => `
          <div class="doss"><span class="doss-ico" aria-hidden="true">${m.icon}</span>
            <div class="doss-t" style="color:var(--arc)">${m.title}</div>
            <div class="doss-txt">${m.body}</div>
          </div>`).join('')}
      </div>
    </div>`;

  // Probabilidade de erro
  bodyHTML += `
    <div class="rs">
      <div class="rst" style="color:var(--dm)">⚠️ Probabilidade de Erro</div>
      <div style="font-size:.84rem;font-weight:300;line-height:1.72;color:var(--dm);font-style:italic;padding:12px 0">${doss.probabilidade_erro}</div>
    </div>`;

  $('rbd').innerHTML = bodyHTML;

  // Animate BF bars (com erro-padrão: "72 ±6" — incerteza honesta)
  const bfDiv = $('bf-result');
  if (bfDiv) {
    DIMS.forEach(k => {
      const uv = Math.round(bf[k] || 50);
      const se = Math.round(bfSE?.[k] || 0);
      const row = el('div', 'bfrow');
      row.innerHTML = `
        <div class="bfrl">
          <div class="bfrlb">${BF_LABELS[k]} (${k})</div>
          <div class="bfrvl">Você: <strong style="color:${BF_COLORS[k]}">${uv}</strong><span style="opacity:.55;font-size:.85em"> ±${se}</span> · <span aria-hidden="true">${c1.emoji}</span>: <strong style="color:${col}">${c1.bf[k]}</strong></div>
        </div>
        <div class="bftrack"><div class="bffill" id="bfr-${k}" style="background:${BF_COLORS[k]}"></div></div>
      `;
      bfDiv.appendChild(row);
    });
    setTimeout(() => {
      DIMS.forEach(k => {
        const bar = $(`bfr-${k}`);
        if (bar) bar.style.width = `${Math.round(bf[k] || 50)}%`;
      });
    }, 450);
  }

  // Ranking bars — probabilidades reais (somam 100%)
  const maxP = ranked[0].prob;
  const rnk = $('rank-result');
  if (rnk) {
    rnk.innerHTML = ranked.map((it, idx) => {
      const w = maxP > 0 ? (it.prob / maxP) * 100 : 50;
      const isSec = it.key === secondary.key;
      const pctTxt = it.prob >= 0.1 ? (it.prob * 100).toFixed(0) : (it.prob * 100).toFixed(1);
      return `
        <div class="rrow" style="opacity:${idx < 2 ? 1 : .6}">
          <span class="ri" aria-hidden="true">${it.cls.emoji}</span>
          <span class="rname">${it.cls.name}</span>
          ${idx === 0 ? '<span style="font-family:Cinzel,serif;font-size:.55rem;color:var(--gold);margin-right:6px">PRINCIPAL</span>' : ''}
          ${isSec && idx > 0 ? `<span style="font-family:Cinzel,serif;font-size:.55rem;color:${it.cls.color};margin-right:6px">INFLUÊNCIA</span>` : ''}
          <div class="rtrack"><div class="rfill" style="background:${it.cls.color};width:${w}%"></div></div>
          <span class="rdist">${pctTxt}%</span>
        </div>
      `;
    }).join('');
  }
}

// ── INIT ────────────────────────────────────────────────────
function init() {
  $$('.pg').forEach(p => p.style.display = 'none');
  $('s0').style.display = 'block';

  initStars();
  initNav();
  initClassGrid();
  initRaces();
  initMBTI();
  initBigFive();
}

init();
