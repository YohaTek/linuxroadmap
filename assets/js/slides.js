// Slide generator: splits loaded HTML into slides per h2 and appends quiz slide

window.Slides = (() => {
  const buildSlidesFromContent = (root) => {
    // Create slides: intro (h1 + first p), then one per h2 section
    const slides = [];
    const cloned = root.cloneNode(true);
    const h1 = cloned.querySelector('h1');
    const intro = document.createElement('section');
    intro.className = 'slide';
    if (h1) {
      const title = h1.cloneNode(true);
      intro.appendChild(title);
      let next = h1.nextElementSibling;
      while (next && next.tagName !== 'H2') {
        intro.appendChild(next.cloneNode(true));
        next = next.nextElementSibling;
      }
      slides.push(intro);
    }

    const h2s = Array.from(cloned.querySelectorAll('h2'));
    h2s.forEach((h2, idx) => {
      const slide = document.createElement('section');
      slide.className = 'slide';
      slide.appendChild(h2.cloneNode(true));
      let node = h2.nextElementSibling;
      while (node && node.tagName !== 'H2') {
        slide.appendChild(node.cloneNode(true));
        node = node.nextElementSibling;
      }
      slides.push(slide);
    });

    return slides;
  };

  const renderSlides = ({ container, slides, sectionId, title }) => {
    container.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.className = 'slides-wrapper';

    const controls = document.createElement('div');
    controls.className = 'slides-controls';
    controls.innerHTML = `
      <button class="btn btn-muted" id="slide-prev" aria-label="Previous">◀ Prev</button>
      <span id="slide-indicator" class="muted slides-indicator"></span>
      <button class="btn" id="slide-next" aria-label="Next">Next ▶</button>
    `;

    const viewport = document.createElement('div');
    viewport.className = 'slides-viewport';

    slides.forEach(s => viewport.appendChild(s));

    const adBanner = document.createElement('a');
    adBanner.href = "mailto:sponsor@example.com";
    adBanner.className = 'ad-banner';
    adBanner.style.textDecoration = 'none';
    adBanner.innerHTML = `<span class="ad-badge">Sponsored</span><div class="ad-content" style="color:#cbd5e1;"><strong>Your Organization Here</strong><br>Reach developers mastering Linux. Click to sponsor.</div>`;

    // Append viewport BEFORE adBanner and controls to push them to the bottom
    wrapper.appendChild(viewport);
    wrapper.appendChild(adBanner);
    wrapper.appendChild(controls);
    container.appendChild(wrapper);

    let index = parseInt(sessionStorage.getItem(`slideIndex:${sectionId}`) || '0', 10);
    index = Math.min(Math.max(0, index), slides.length - 1);

    const update = () => {
      slides.forEach((s, i) => {
        s.style.display = i === index ? 'block' : 'none';
      });
      const indicator = document.getElementById('slide-indicator');
      if (indicator) indicator.textContent = `Slide ${index + 1} / ${slides.length}`;
      sessionStorage.setItem(`slideIndex:${sectionId}`, String(index));

      document.getElementById('slide-prev').disabled = index === 0;

      // Update next button for finish state
      const nextBtn = document.getElementById('slide-next');
      if (index === slides.length - 1) {
        nextBtn.textContent = 'Finish ✔';
        nextBtn.classList.add('btn-finish');
      } else {
        nextBtn.textContent = 'Next ▶';
        nextBtn.classList.remove('btn-finish');
      }
    };

    document.getElementById('slide-prev').addEventListener('click', () => {
      index = Math.max(0, index - 1);
      update();
      window.scrollTo(0, 0);
    });

    document.getElementById('slide-next').addEventListener('click', () => {
      if (index < slides.length - 1) {
        index++;
        update();
        window.scrollTo(0, 0);
      } else {
        document.getElementById('sidebar')?.classList.add('open');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' && index < slides.length - 1) { index++; update(); window.scrollTo(0, 0); }
      if (e.key === 'ArrowLeft' && index > 0) { index--; update(); window.scrollTo(0, 0); }
    });

    update();
  };

  // Quiz slide generation (multi-question)
  const buildQuizSlide = ({ sectionId, questions }) => {
    const slide = document.createElement('section');
    slide.className = 'slide';
    const header = document.createElement('h2');
    header.textContent = 'Section Quiz';
    slide.appendChild(header);

    const form = document.createElement('div');
    form.className = 'card';
    let saved;
    if (window.DB && window.DB.isConfigured) {
        saved = window.DB.getProgress(`quizset:${sectionId}`) || {};
    } else {
        saved = JSON.parse(localStorage.getItem(`quizset:${sectionId}`) || '{}');
    }
    const answers = {};
    questions.forEach((q, qi) => {
      const block = document.createElement('div');
      block.style.marginBottom = '10px';
      const title = document.createElement('div');
      title.style.fontWeight = '600';
      title.textContent = `${qi + 1}. ${q.question}`;
      block.appendChild(title);
      q.options.forEach((opt, oi) => {
        const id = `q${qi}-o${oi}`;
        const label = document.createElement('label');
        label.style.display = 'block';
        const input = document.createElement('input');
        input.type = 'radio'; input.name = `q-${qi}`; input.value = String(oi);
        if (saved?.answers?.[qi] !== undefined && Number(saved.answers[qi]) === oi) input.checked = true;
        label.appendChild(input);
        const span = document.createElement('span');
        span.textContent = ' ' + opt;
        label.appendChild(span);
        block.appendChild(label);
        input.addEventListener('change', () => { answers[qi] = oi; });
      });
      form.appendChild(block);
    });

    const footer = document.createElement('div');
    footer.style.display = 'flex'; footer.style.alignItems = 'center'; footer.style.gap = '10px';
    const submit = document.createElement('button'); submit.className = 'btn'; submit.textContent = 'Submit Answers';
    const result = document.createElement('span'); result.className = 'muted';
    footer.appendChild(submit); footer.appendChild(result);
    form.appendChild(footer);

    submit.addEventListener('click', () => {
      let score = 0; const total = questions.length;
      for (let i = 0; i < total; i++) {
        const ans = answers[i] !== undefined ? answers[i] : saved?.answers?.[i];
        if (Number(ans) === Number(questions[i].correctIndex)) score++;
      }
      const passed = score === total;
      
      const payload = { score, total, answers };
      if (window.DB && window.DB.isConfigured && window.DB.getUser()) {
          window.DB.saveProgress(`quizset:${sectionId}`, payload);
      } else {
          localStorage.setItem(`quizset:${sectionId}`, JSON.stringify(payload));
      }

      result.textContent = passed ? `✅ Perfect! ${score}/${total}` : `Result: ${score}/${total}. Correct all to complete.`;
      document.dispatchEvent(new CustomEvent('progress:update'));
    });

    if (saved?.total) {
      const passed = saved.score === saved.total;
      const summary = document.createElement('div');
      summary.className = 'muted';
      summary.textContent = passed ? `Previously completed: ${saved.score}/${saved.total}` : `Previous score: ${saved.score}/${saved.total}`;
      form.appendChild(summary);
    }

    slide.appendChild(form);
    return slide;
  };

  const init = ({ container, sectionId, title, questions }) => {
    const slides = buildSlidesFromContent(container);
    // Append quiz slide at end
    if (questions && questions.length) slides.push(buildQuizSlide({ sectionId, questions }));
    renderSlides({ container, slides, sectionId, title });
  };

  return { init };
})();




