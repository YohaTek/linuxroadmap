// Minimal client-side router using hash routes (#/1, #/2, ...)

window.RoadmapRouter = (() => {
  const routes = [
    { id: 1, title: 'Navigation Basics', file: 'pages/1-navigation.html', icon: 'fa-folder-open', module: 'Module 1: The Essentials' },
    { id: 2, title: 'Super User & File Operations', file: 'pages/2-superuser.html', icon: 'fa-shield-halved', module: 'Module 1: The Essentials' },
    { id: 3, title: 'Text Processing & Streams', file: 'pages/3-text-processing.html', icon: 'fa-file-lines', module: 'Module 1: The Essentials' },
    { id: 4, title: 'System Review & Monitoring', file: 'pages/4-monitoring.html', icon: 'fa-chart-line', module: 'Module 2: System Diagnostics' },
    { id: 5, title: 'Process Management', file: 'pages/5-processes.html', icon: 'fa-microchip', module: 'Module 2: System Diagnostics' },
    { id: 6, title: 'User & Group Management', file: 'pages/6-users-groups.html', icon: 'fa-users', module: 'Module 2: System Diagnostics' },
    { id: 7, title: 'Service Management', file: 'pages/7-services.html', icon: 'fa-server', module: 'Module 3: Core Infrastructure' },
    { id: 8, title: 'Package Management', file: 'pages/8-packages.html', icon: 'fa-box-open', module: 'Module 3: Core Infrastructure' },
    { id: 9, title: 'Disks & Filesystems', file: 'pages/9-disks-filesystems.html', icon: 'fa-hard-drive', module: 'Module 3: Core Infrastructure' },
    { id: 10, title: 'Boot & Logs', file: 'pages/10-boot-logs.html', icon: 'fa-power-off', module: 'Module 4: Advanced Engineering' },
    { id: 11, title: 'Networking', file: 'pages/11-networking.html', icon: 'fa-network-wired', module: 'Module 4: Advanced Engineering' },
    { id: 12, title: 'Shell Scripting', file: 'pages/12-scripting.html', icon: 'fa-code', module: 'Module 4: Advanced Engineering' },
    { id: 13, title: 'Containerization', file: 'pages/13-containers.html', icon: 'fa-box', module: 'Module 4: Advanced Engineering' },
    { id: 14, title: 'Continue Learning', file: 'pages/14-continue.html', icon: 'fa-graduation-cap', module: 'Module 4: Advanced Engineering' },
    { id: 99, title: 'Sponsor Us', file: 'pages/sponsor.html', icon: 'fa-handshake', module: 'Support Us' },
    { id: 100, title: 'Register', file: 'pages/register.html', icon: 'fa-user-plus', module: 'Account' }
  ];

  const getRouteFromHash = () => {
    const m = location.hash.match(/#\/(\d+)/);
    const id = m ? parseInt(m[1], 10) : 1;
    return routes.find(r => r.id === id) || routes[0];
  };

  const loadContent = async (route) => {
    const content = document.getElementById('content');
    content.innerHTML = `<div class="muted">Loading...</div>`;
    // If opened via file:// most browsers block fetch of local files
    if (location.protocol === 'file:') {
      content.innerHTML = `
        <div class="card">
          <h2>Cannot load pages from file://</h2>
          <p class="muted">Start a local server and open http://localhost:5500 instead.</p>
          <div class="grid">
            <div class="card">
              <strong>Python</strong>
              <pre data-code="cd linux-roadmap\npython -m http.server 5500"></pre>
            </div>
            <div class="card">
              <strong>Node</strong>
              <pre data-code="npx serve -l 5500"></pre>
            </div>
          </div>
        </div>`;
      enhanceInteractiveBlocks(content);
      return;
    }
    try {
      const res = await fetch(route.file + `?t=${Date.now()}`);
      const html = await res.text();
      content.innerHTML = html;
      enhanceInteractiveBlocks(content);
      // Initialize slides with quiz bank
      const questions = QuizBank[route.id] || [];
      Slides.init({ container: content, sectionId: route.id, title: route.title, questions });
      markActive(route.id);
      document.title = `${route.id}. ${route.title} — Linux Roadmap`;
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', `Learn about ${route.title} in this comprehensive Linux learning roadmap module.`);
      document.dispatchEvent(new CustomEvent('progress:update'));

      // Close sidebar on mobile after content loads
      if (window.innerWidth <= 980) {
        const sidebar = document.getElementById('sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        sidebar?.classList.remove('open');
        backdrop?.classList.remove('open');
      }
    } catch (e) {
      content.innerHTML = `<div class="card">Failed to load content. If you opened this file directly, please run a local server (see README).</div>`;
      console.error(e);
    }
  };

  const enhanceInteractiveBlocks = (root) => {
    root.querySelectorAll('pre[data-code]').forEach(block => {
      const code = block.getAttribute('data-code');
      const node = UI.codeBlock(code);
      block.replaceWith(node);
    });

    // Intentionally skip rendering checklists to avoid extra checkboxes in slides

    root.querySelectorAll('[data-quiz]')
      .forEach(container => {
        const key = container.getAttribute('data-quiz');
        const question = container.getAttribute('data-question') || '';
        const options = JSON.parse(container.getAttribute('data-options') || '[]');
        const correctIndex = parseInt(container.getAttribute('data-correct') || '0', 10);
        container.appendChild(UI.quiz({ question, options, correctIndex, storageKey: `quiz:${key}` }));
      });

    root.querySelectorAll('[data-images]')
      .forEach(container => {
        const topic = container.getAttribute('data-images');
        const title = container.getAttribute('data-title') || 'Related Visuals';

        const imageMappings = {
          'navigation': [
            { filename: 'linux-topic-13.jpg', description: 'Filesystem Tree & Navigation' },
            { filename: 'linux-topic-14.jpg', description: 'Absolute vs Relative Paths' },
            { filename: 'linux-topic-15.jpg', description: 'Command Cheatsheet' }
          ],
          'superuser': [
            { filename: 'linux-topic-21.jpg', description: 'User vs Root Context' },
            { filename: 'linux-topic-22.jpg', description: 'Understanding Permissions' }
          ],
          'text-processing': [
            { filename: 'linux-topic-23.jpg', description: 'Pipes and Redirection' },
            { filename: 'linux-topic-24.jpg', description: 'Grep and Awk filters' }
          ]
        };

        const selectedImages = imageMappings[topic] || [
          { filename: 'linux-topic-10.jpg', description: 'General Linux Concept' },
          { filename: 'linux-topic-11.jpg', description: 'System Architecture Diagram' }
        ];

        container.appendChild(UI.imageGallery(selectedImages, title));
      });
  };

  const renderNav = () => {
    const nav = document.getElementById('nav-list');
    if (!nav) return;
    nav.innerHTML = '';

    const modules = {};
    routes.forEach(r => {
      const mName = r.module || 'Default';
      if (!modules[mName]) modules[mName] = [];
      modules[mName].push(r);
    });

    Object.keys(modules).forEach(mName => {
      const moduleDiv = document.createElement('div');
      moduleDiv.className = 'nav-module expanded'; // All expanded by default for discoverability

      const moduleHeader = document.createElement('div');
      moduleHeader.className = 'nav-module-header';
      moduleHeader.innerHTML = `
        <div class="nav-module-title">
          <i class="fas fa-chevron-right toggle-icon"></i>
          <span>${mName}</span>
        </div>
        <div class="nav-module-progress">
          <svg viewBox="0 0 36 36" class="circular-chart">
            <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path class="circle" stroke-dasharray="0, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
        </div>
      `;

      const moduleContent = document.createElement('div');
      moduleContent.className = 'nav-module-content';

      modules[mName].forEach(r => {
        const a = document.createElement('a');
        a.href = '#/' + r.id;
        a.innerHTML = `<i class="fas ${r.icon || 'fa-file'}"></i> <span>${r.id}. ${r.title}</span>`;
        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = progressForRoute(r.id) + '%';
        a.appendChild(badge);
        moduleContent.appendChild(a);
      });

      moduleHeader.addEventListener('click', () => {
        moduleDiv.classList.toggle('expanded');
      });

      moduleDiv.appendChild(moduleHeader);
      moduleDiv.appendChild(moduleContent);
      nav.appendChild(moduleDiv);
    });
  };

  const progressForRoute = (id) => {
    let set;
    if (window.DB && window.DB.isConfigured) {
      set = window.DB.getProgress(`quizset:${id}`);
    } else {
      const local = localStorage.getItem(`quizset:${id}`);
      set = local ? JSON.parse(local) : null;
    }

    if (set) {
      try {
        const { score, total } = typeof set === 'string' ? JSON.parse(set) : set;
        if (total) return Math.round((score / total) * 100);
      } catch {}
    }
    return 0;
  };

  const markActive = (id) => {
    document.querySelectorAll('#nav-list a').forEach(a => a.classList.remove('active'));
    document.querySelectorAll('.nav-module').forEach(m => m.classList.remove('active-module'));
    const active = document.querySelector(`#nav-list a[href="#/${id}"]`);
    if (active) {
      active.classList.add('active');
      const parentModule = active.closest('.nav-module');
      if (parentModule) {
        parentModule.classList.add('expanded');
        parentModule.classList.add('active-module');
      }
    }
  };

  const updateGlobalProgress = () => {
    const total = routes.length;
    const sum = routes.reduce((acc, r) => acc + progressForRoute(r.id), 0);
    const pct = total ? Math.round(sum / total) : 0;
    const bar = document.getElementById('progress-bar-fill'); // wait, global is `progress-fill`
    const label = document.getElementById('progress-percentage'); // wait, global logic changed.
    // In index.html, it's `id="progress-fill"` and `id="progress-percentage"`
    const _bar = document.getElementById('progress-fill');
    const _label = document.getElementById('progress-percentage');
    if (_bar) _bar.style.width = pct + '%';
    if (_label) _label.textContent = pct + '%';

    document.querySelectorAll('#nav-list a').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      const idStr = href.split('/')[1];
      if (!idStr) return;
      const id = parseInt(idStr, 10);
      const badge = a.querySelector('.badge');
      if (badge) badge.textContent = progressForRoute(id) + '%';
    });

    document.querySelectorAll('.nav-module').forEach(mNode => {
      const titleSpan = mNode.querySelector('.nav-module-title span');
      if (!titleSpan) return;
      const mName = titleSpan.textContent;
      const mRoutes = routes.filter(r => r.module === mName);
      if (mRoutes.length === 0) return;

      const t = mRoutes.length * 100;
      const e = mRoutes.reduce((acc, r) => acc + progressForRoute(r.id), 0);
      const modPct = t ? Math.round((e / t) * 100) : 0;

      const circle = mNode.querySelector('path.circle');
      if (circle) circle.setAttribute('stroke-dasharray', `${modPct}, 100`);
    });
  };

  const resetProgress = () => {
    Object.keys(localStorage)
      .filter(k => k.startsWith('checklist:') || k.startsWith('quiz:'))
      .forEach(k => localStorage.removeItem(k));
    updateGlobalProgress();
  };

  const init = () => {
    console.log('🚀 Router initializing...');
    renderNav();
    const route = getRouteFromHash();
    loadContent(route);

    // Sidebar toggle with mobile support
    const toggleBtn = document.getElementById('sidebar-toggle');
    console.log('Sidebar toggle button:', toggleBtn);
    toggleBtn?.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      const backdrop = document.getElementById('sidebar-backdrop');
      console.log('Toggle clicked. Screen width:', window.innerWidth);
      if (window.innerWidth <= 980) {
        sidebar?.classList.toggle('open');
        backdrop?.classList.toggle('open');
        console.log('Sidebar open:', sidebar?.classList.contains('open'));
      } else {
        document.body.classList.toggle('sidebar-collapsed');
      }
    });

    // Close sidebar button in sidebar header (mobile)
    const closeBtn = document.getElementById('sidebar-close');
    console.log('📍 Sidebar close button found:', !!closeBtn, closeBtn);
    if (closeBtn) {
      console.log('   Attaching click listener to sidebar-close button...');
      closeBtn.addEventListener('click', (e) => {
        console.log('🖱️  sidebar-close click event fired!', e);
        e.preventDefault();
        e.stopPropagation();
        closeSidebarMenu();
      });
      console.log('   ✅ Click listener attached successfully');
    } else {
      console.error('❌ sidebar-close button element NOT FOUND in DOM!');
    }

    // Close sidebar when backdrop is clicked (mobile)
    document.getElementById('sidebar-backdrop')?.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      const backdrop = document.getElementById('sidebar-backdrop');
      sidebar?.classList.remove('open');
      backdrop?.classList.remove('open');
    });

    // Close sidebar when navigation link is clicked (mobile)
    document.getElementById('nav-list')?.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' && window.innerWidth <= 980) {
        const sidebar = document.getElementById('sidebar');
        const backdrop = document.getElementById('sidebar-backdrop');
        sidebar?.classList.remove('open');
        backdrop?.classList.remove('open');
      }
    });

    // Close sidebar when content loads (mobile)
    const closeSidebarOnMobile = () => {
      if (window.innerWidth <= 980) {
        const sidebar = document.getElementById('sidebar');
        sidebar?.classList.remove('open');
      }
    };

    document.getElementById('reset-progress')?.addEventListener('click', () => {
      resetProgress();
      const current = getRouteFromHash();
      loadContent(current);
      closeSidebarOnMobile();
    });

    window.addEventListener('hashchange', () => {
      loadContent(getRouteFromHash());
      closeSidebarOnMobile();
    });
    document.addEventListener('progress:update', updateGlobalProgress);
    updateGlobalProgress();

    // rudimentary search filter on sidebar
    const search = document.getElementById('search-input');
    search?.addEventListener('input', () => {
      const q = search.value.toLowerCase();
      document.querySelectorAll('#nav-list a').forEach(a => {
        a.style.display = a.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  };

  return { init, routes };
})();

