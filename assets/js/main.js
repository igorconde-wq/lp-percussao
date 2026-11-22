/**
 * Oficina de Percussão — Bloco do Caramuela
 * Vanilla JS: Navigation, Interactive Instrument Explorer + Groove Synth,
 * WhatsApp Enrollment Builder, FAQ Accordion & Scroll Reveal.
 */

(function () {
  'use strict';

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

  // 2. Mobile Drawer Navigation
  const mobileToggle = document.getElementById('btn-mobile-menu');
  const mobileClose = document.getElementById('btn-mobile-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function setDrawerOpen(isOpen) {
    if (!mobileDrawer || !mobileToggle) return;
    mobileDrawer.classList.toggle('is-open', isOpen);
    mobileDrawer.setAttribute('aria-hidden', String(!isOpen));
    mobileToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => setDrawerOpen(true));
  }
  if (mobileClose) {
    mobileClose.addEventListener('click', () => setDrawerOpen(false));
  }
  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => setDrawerOpen(false));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('is-open')) {
      setDrawerOpen(false);
    }
  });

  // 3. Interactive Instrument Explorer
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
      grooveLabel: 'Ouvir levada de Zabumba (Baião)'
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
      grooveLabel: 'Ouvir levada de Triângulo (Baião)'
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
      grooveLabel: 'Ouvir levada de Caixa (Baião)'
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
      grooveLabel: 'Ouvir levada de Ganzá (Baião)'
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
      grooveLabel: 'Ouvir levada de Pandeiro (Baião)'
    }
  };

  let currentInstrument = 'zabumba';
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

    // Sync form default smoothly if user hasn't picked another value manually
    if (selectInstrumentoForm && !selectInstrumentoForm.dataset.userTouched) {
      selectInstrumentoForm.value = data.title;
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      selectInstrument(tab.dataset.instrument);
    });
  });

  if (selectInstrumentoForm) {
    selectInstrumentoForm.addEventListener('change', () => {
      selectInstrumentoForm.dataset.userTouched = 'true';
    });
  }

  // 4. Web Audio API Synthetic Baião Groove Preview (zero external audio files needed)
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
    const dur = open ? 0.24 : 0.055;
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
    const peak = accent ? gainVal * 1.45 : gainVal * 0.75;
    gain.gain.setValueAtTime(peak, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.065);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(time);
  }

  // 8-step 16th-note Baião cell (2 beats of 2/4)
  function playBaiaoStep(step) {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime + 0.01;
    const focus = currentInstrument;

    // Subtle ensemble backing + highlighted selected instrument
    const zGain = focus === 'zabumba' ? 0.62 : 0.22;
    const tGain = focus === 'triangulo' ? 0.34 : 0.11;
    const cGain = focus === 'caixa' ? 0.38 : 0.1;
    const gGain = focus === 'ganza' ? 0.26 : 0.07;

    // Zabumba Baião: Bass on 0, 3; Bacalhau on 2, 6
    if (step === 0 || step === 3) {
      triggerZabumbaBass(ctx, now, focus === 'pandeiro' ? 0.36 : zGain);
    }
    if (step === 2 || step === 6) {
      triggerBacalhau(ctx, now, zGain * 0.65);
    }

    // Triângulo Baião: closed/open pattern
    if (step === 0 || step === 2 || step === 4 || step === 6) {
      const isOpen = step === 2 || step === 6;
      triggerTriangle(ctx, now, isOpen, tGain);
    } else if (step === 3 || step === 7) {
      triggerTriangle(ctx, now, false, tGain * 0.55);
    }

    // Caixa / Pandeiro syncopation
    if (step === 2 || step === 5 || step === 6) {
      triggerBacalhau(ctx, now, focus === 'pandeiro' ? 0.32 : cGain);
    }

    // Ganzá steady 16ths with accent on 2 & 6
    triggerShaker(ctx, now, step === 2 || step === 6, gGain);
  }

  function stopGroove() {
    isPlayingGroove = false;
    if (grooveTimer) {
      clearInterval(grooveTimer);
      grooveTimer = null;
    }
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
    // ~104 BPM 16th note = ~144ms
    playBaiaoStep(stepIndex);
    grooveTimer = setInterval(() => {
      stepIndex = (stepIndex + 1) % 8;
      playBaiaoStep(stepIndex);
    }, 144);
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      if (isPlayingGroove) {
        stopGroove();
      } else {
        startGroove();
      }
    });
  }

  // 5. WhatsApp Pre-Registration Builder
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

  // 6. Accessible FAQ Accordion
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

  // 7. Scroll Reveal via IntersectionObserver + viewport sweep on jump
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
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();
