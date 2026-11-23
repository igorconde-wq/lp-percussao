/**
 * Oficina de Percussão — Bloco do Caramuela
 * Vanilla JS: Hero Rhythm Wave Canvas, 21st.dev-style Spotlight Hover,
 * Instrument Explorer + Interactive 8-Step Baião/Xote Sequencer,
 * WhatsApp Builder, FAQ Accordion & Scroll Reveal.
 */

(function () {
  'use strict';

  const prefersReducedMotion =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Sticky Header State
  const header = document.getElementById('site-header');
  function updateHeader() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // 2. Animated Subtle Acoustic Wave Canvas in Hero
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas && !prefersReducedMotion) {
    const ctx = heroCanvas.getContext('2d');
    let animFrame = null;
    let t = 0;

    function resizeCanvas() {
      const parent = heroCanvas.parentElement;
      if (!parent) return;
      heroCanvas.width = parent.clientWidth;
      heroCanvas.height = parent.clientHeight;
    }

    function drawWave() {
      const w = heroCanvas.width;
      const h = heroCanvas.height;
      ctx.clearRect(0, 0, w, h);

      const waves = [
        { amp: 22, freq: 0.006, speed: 0.022, yBase: h * 0.72, color: 'rgba(255, 145, 56, 0.24)' },
        { amp: 16, freq: 0.009, speed: 0.017, yBase: h * 0.78, color: 'rgba(133, 212, 38, 0.18)' },
        { amp: 12, freq: 0.012, speed: 0.028, yBase: h * 0.84, color: 'rgba(255, 209, 102, 0.15)' }
      ];

      waves.forEach((wave) => {
        ctx.beginPath();
        for (let x = 0; x <= w; x += 12) {
          const y = wave.yBase + Math.sin(x * wave.freq + t * wave.speed) * wave.amp;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      });

      t += 1;
      animFrame = requestAnimationFrame(drawWave);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    drawWave();

    // Pause hero animation when scrolled past to preserve battery & 98%+ performance
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > window.innerHeight * 1.1) {
          if (animFrame) {
            cancelAnimationFrame(animFrame);
            animFrame = null;
          }
        } else if (!animFrame) {
          drawWave();
        }
      },
      { passive: true }
    );
  }

  // 3. 21st.dev-style Cursor Spotlight Cards
  if (!prefersReducedMotion) {
    document.querySelectorAll('[data-spotlight]').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    });
  }

  // 4. Interactive Instrument Explorer + 8-Step Sequencer
  const INSTRUMENTS = {
    zabumba: {
      title: 'Zabumba',
      role: 'Coração grave do forró',
      loan: 'Empréstimo na aula para iniciantes',
      desc: 'É quem sustenta o pulso e faz todo mundo dançar. Você aprende a equilibrar a mão da maça (grave profundo) e a mão do bacalhau (contracanto seco e estalado) nas levadas de baião, xote, arrasta-pé e maracatu.',
      func: 'Base grave e pulso',
      level: 'Iniciantes do zero e iniciados',
      technique: 'Maça + bacalhau alternados',
      teacher: 'Roberto Kauffman',
      grooveLabel: 'Ouvir levada de Zabumba',
      patterns: {
        baiao: [1, 0, 1, 1, 0, 0, 1, 0],
        xote: [1, 0, 1, 0, 1, 0, 1, 0]
      }
    },
    triangulo: {
      title: 'Triângulo',
      role: 'Brilho agudo e suingue',
      loan: 'Empréstimo na aula para iniciantes',
      desc: 'O famoso "ferrinho" que corta a massa sonora da bateria. Aprenda abertura e abafamento com a mão esquerda, acentuações sincopadas do baião e variações que dão balanço ao xote e ao arrasta-pé.',
      func: 'Condução aguda e síncope',
      level: 'Iniciantes do zero e iniciados',
      technique: 'Pinça aberta/fechada + baqueta',
      teacher: 'Rogério Lorão',
      grooveLabel: 'Ouvir levada de Triângulo',
      patterns: {
        baiao: [1, 0, 1, 1, 1, 0, 1, 1],
        xote: [1, 1, 1, 0, 1, 1, 1, 0]
      }
    },
    caixa: {
      title: 'Caixa',
      role: 'Pressão e viradas de carnaval',
      loan: 'Empréstimo na aula para iniciantes',
      desc: 'Responsável por unir a linguagem do forró à potência de um bloco de rua carioca. Você desenvolve toques fantasma, rulos, acentos e chamadas que preparam as convenções da Bateria Infinita.',
      func: 'Suingue médio e convenções',
      level: 'Iniciantes do zero e iniciados',
      technique: 'Baquetas, rimshots e rufos',
      teacher: 'Felipe Cotta',
      grooveLabel: 'Ouvir levada de Caixa',
      patterns: {
        baiao: [0, 0, 1, 0, 0, 1, 1, 0],
        xote: [0, 0, 1, 0, 0, 0, 1, 1]
      }
    },
    ganza: {
      title: 'Ganzá',
      role: 'Textura contínua e fôlego rítmico',
      loan: 'Empréstimo na aula para iniciantes',
      desc: 'Fundamental para preencher a cama rítmica da bateria com leveza e precisão. Trabalhamos controle de pulso, acentuações em semicolcheias e resistência para manter o groove firme do começo ao fim do cortejo.',
      func: 'Cama rítmica constante',
      level: 'Iniciantes do zero e iniciados',
      technique: 'Pulso contínuo e acentos',
      teacher: 'Paula Machado',
      grooveLabel: 'Ouvir levada de Ganzá',
      patterns: {
        baiao: [1, 1, 1, 1, 1, 1, 1, 1],
        xote: [1, 0, 1, 1, 1, 0, 1, 1]
      }
    },
    pandeiro: {
      title: 'Pandeiro',
      role: 'Versatilidade e dinâmica de roda',
      loan: 'Empréstimo na aula para iniciantes',
      desc: 'Um instrumento completo na palma das mãos. Exploramos o grave do polegar, a ponta dos dedos, o tapa seco (slap) e a condução de platinelas para transitar com naturalidade entre baião, coco, xote e samba.',
      func: 'Groove articulado e solinho',
      level: 'Iniciantes do zero e iniciados',
      technique: 'Polegar, ponta, palma e tapa',
      teacher: 'Rapha Morret',
      grooveLabel: 'Ouvir levada de Pandeiro',
      patterns: {
        baiao: [1, 1, 1, 1, 0, 1, 1, 0],
        xote: [1, 0, 1, 1, 1, 0, 1, 0]
      }
    }
  };

  let currentInstrument = 'zabumba';
  let currentRhythm = 'baiao';
  let activePattern = [...INSTRUMENTS.zabumba.patterns.baiao];

  const tabs = document.querySelectorAll('.instrument-tab');
  const instTitle = document.getElementById('inst-title');
  const instRole = document.getElementById('inst-role');
  const instLoan = document.getElementById('inst-loan');
  const instDesc = document.getElementById('inst-desc');
  const instFunction = document.getElementById('inst-function');
  const instLevel = document.getElementById('inst-level');
  const instTechnique = document.getElementById('inst-technique');
  const instTeacher = document.getElementById('inst-teacher');
  const audioBtn = document.getElementById('btn-play-groove');
  const audioBtnLabel = document.getElementById('audio-btn-label');
  const selectInstrumentoForm = document.getElementById('select-instrumento');
  const seqButtons = document.querySelectorAll('.seq-step');
  const rhythmButtons = document.querySelectorAll('.rhythm-btn');

  function renderSequencerGrid(currentStepIdx = -1) {
    seqButtons.forEach((btn, idx) => {
      const isOn = Boolean(activePattern[idx]);
      btn.classList.toggle('is-on', isOn);
      btn.classList.toggle('is-current', idx === currentStepIdx);
      btn.setAttribute('aria-pressed', String(isOn));
    });
  }

  function loadPatternFromInstrument() {
    const data = INSTRUMENTS[currentInstrument];
    if (!data) return;
    activePattern = [...data.patterns[currentRhythm]];
    renderSequencerGrid();
  }

  function selectInstrument(key) {
    const data = INSTRUMENTS[key];
    if (!data) return;
    currentInstrument = key;

    tabs.forEach((tab) => {
      const isMatch = tab.dataset.instrument === key;
      tab.classList.toggle('is-active', isMatch);
      tab.setAttribute('aria-selected', String(isMatch));
    });

    if (instTitle) instTitle.textContent = data.title;
    if (instRole) instRole.textContent = data.role;
    if (instLoan) instLoan.textContent = data.loan;
    if (instDesc) instDesc.textContent = data.desc;
    if (instFunction) instFunction.textContent = data.func;
    if (instLevel) instLevel.textContent = data.level;
    if (instTechnique) instTechnique.textContent = data.technique;
    if (instTeacher) instTeacher.textContent = data.teacher;
    if (audioBtnLabel && !isPlayingGroove) {
      audioBtnLabel.textContent = data.grooveLabel;
    }

    loadPatternFromInstrument();

    if (selectInstrumentoForm && !selectInstrumentoForm.dataset.userTouched) {
      selectInstrumentoForm.value = data.title;
    }
  }

  tabs.forEach((tab) => tab.addEventListener('click', () => selectInstrument(tab.dataset.instrument)));

  rhythmButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentRhythm = btn.dataset.rhythm;
      rhythmButtons.forEach((b) => b.classList.toggle('is-active', b === btn));
      loadPatternFromInstrument();
    });
  });

  seqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.step);
      activePattern[idx] = activePattern[idx] ? 0 : 1;
      renderSequencerGrid();
    });
  });

  if (selectInstrumentoForm) {
    selectInstrumentoForm.addEventListener('change', () => {
      selectInstrumentoForm.dataset.userTouched = 'true';
    });
  }

  // 6. Web Audio API Synthetic Baião / Xote Groove Preview
  let audioCtx = null;
  let grooveTimer = null;
  let isPlayingGroove = false;
  let stepIndex = 0;

  function ensureAudioContext() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function triggerZabumbaBass(ctx, time, gainVal) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(125, time);
    osc.frequency.exponentialRampToValueAtTime(48, time + 0.14);
    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(time);
    osc.stop(time + 0.24);
  }

  function triggerBacalhau(ctx, time, gainVal) {
    const bufferSize = ctx.sampleRate * 0.06;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.012));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1800;
    filter.Q.value = 1.4;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.06);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(time);
  }

  function triggerTriangle(ctx, time, open, gainVal) {
    const freqs = [2450, 3680, 4920];
    const dur = open ? 0.22 : 0.055;
    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, time);
      gain.gain.setValueAtTime(gainVal / (idx + 1.5), time);
      gain.gain.exponentialRampToValueAtTime(0.0008, time + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + dur + 0.02);
    });
  }

  function triggerShaker(ctx, time, accent, gainVal) {
    const bufferSize = ctx.sampleRate * 0.07;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 4800;
    const gain = ctx.createGain();
    const peak = accent ? gainVal * 1.4 : gainVal * 0.75;
    gain.gain.setValueAtTime(peak, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.065);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(time);
  }

  function playGrooveStep(step) {
    renderSequencerGrid(step);
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.01;
    const focus = currentInstrument;
    const hit = Boolean(activePattern[step]);

    // Subtle ensemble backing pulse
    if (step === 0 || step === 4) {
      triggerZabumbaBass(ctx, now, 0.16);
    }

    if (!hit) return;

    if (focus === 'zabumba') {
      if (step === 2 || step === 6) triggerBacalhau(ctx, now, 0.45);
      else triggerZabumbaBass(ctx, now, 0.65);
    } else if (focus === 'triangulo') {
      triggerTriangle(ctx, now, step === 2 || step === 6, 0.34);
    } else if (focus === 'caixa') {
      triggerBacalhau(ctx, now, step === 2 || step === 6 ? 0.55 : 0.3);
    } else if (focus === 'ganza') {
      triggerShaker(ctx, now, step === 2 || step === 6, 0.28);
    } else if (focus === 'pandeiro') {
      if (step === 0 || step === 4) triggerZabumbaBass(ctx, now, 0.44);
      else triggerBacalhau(ctx, now, 0.35);
      triggerShaker(ctx, now, false, 0.12);
    }
  }

  function stopGroove() {
    isPlayingGroove = false;
    if (grooveTimer) {
      clearInterval(grooveTimer);
      grooveTimer = null;
    }
    renderSequencerGrid(-1);
    if (audioBtn) {
      audioBtn.classList.remove('is-playing');
      audioBtn.setAttribute('aria-pressed', 'false');
    }
    if (audioBtnLabel && INSTRUMENTS[currentInstrument]) {
      audioBtnLabel.textContent = INSTRUMENTS[currentInstrument].grooveLabel;
    }
  }

  function startGroove() {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    isPlayingGroove = true;
    stepIndex = 0;
    if (audioBtn) {
      audioBtn.classList.add('is-playing');
      audioBtn.setAttribute('aria-pressed', 'true');
    }
    if (audioBtnLabel) {
      audioBtnLabel.textContent = 'Pausar levada';
    }
    const intervalMs = currentRhythm === 'xote' ? 175 : 144;
    playGrooveStep(stepIndex);
    grooveTimer = setInterval(() => {
      stepIndex = (stepIndex + 1) % 8;
      playGrooveStep(stepIndex);
    }, intervalMs);
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (isPlayingGroove) stopGroove();
      else startGroove();
    });
  }

  // 7. WhatsApp Pre-Registration Builder
  const enrollForm = document.getElementById('enroll-form');
  if (enrollForm) {
    enrollForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = (document.getElementById('input-nome')?.value || '').trim();
      const nivel = document.getElementById('select-nivel')?.value || '';
      const instrumento = document.getElementById('select-instrumento')?.value || '';
      const proprio = document.getElementById('select-instrumento-proprio')?.value || '';

      const msg = [
        'Olá! Vim pela página da Oficina de Percussão do Bloco do Caramuela e quero participar!',
        nome ? `Nome: ${nome}` : '',
        nivel ? `Experiência: ${nivel}` : '',
        instrumento ? `Instrumento de interesse: ${instrumento}` : '',
        proprio ? `Instrumento próprio: ${proprio}` : ''
      ]
        .filter(Boolean)
        .join('\n');

      const waUrl = `https://wa.me/5521975938088?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // 8. Accessible FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');
    if (!trigger || !answer) return;

    trigger.addEventListener('click', () => {
      const willOpen = !item.classList.contains('is-open');

      faqItems.forEach((other) => {
        other.classList.remove('is-open');
        const otherBtn = other.querySelector('.faq-trigger');
        const otherAns = other.querySelector('.faq-answer');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherAns) otherAns.style.maxHeight = null;
      });

      if (willOpen) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  // 9. Scroll Reveal via IntersectionObserver + viewport sweep
  const revealEls = document.querySelectorAll('[data-reveal]');
  function sweepVisibleAboveFold() {
    const cutoff = window.innerHeight * 0.96;
    revealEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= cutoff) {
        el.classList.add('is-visible');
      }
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
    window.addEventListener('scroll', sweepVisibleAboveFold, { passive: true });
    window.addEventListener('hashchange', sweepVisibleAboveFold);
    sweepVisibleAboveFold();

    // 10. Hide mobile sticky CTA while #inscricao is visible so it doesn't cover the form
    const stickyBar = document.getElementById('mobile-sticky-cta');
    const enrollSection = document.getElementById('inscricao');
    if (stickyBar && enrollSection) {
      const stickyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            stickyBar.classList.toggle('is-hidden', entry.isIntersecting);
          });
        },
        { threshold: 0.15 }
      );
      stickyObserver.observe(enrollSection);
    }
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();
