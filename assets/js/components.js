// UI helpers and interactive widgets

window.UI = (() => {
  const el = (html) => {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  };

  const codeBlock = (code, lang = 'bash') => {
    const container = el(`<div class="code"><button class="copy-btn">Copy</button><pre><code></code></pre></div>`);
    container.querySelector('code').textContent = code;
    const btn = container.querySelector('.copy-btn');
    btn.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(code); btn.textContent = 'Copied!'; setTimeout(()=> btn.textContent='Copy', 1200); }
      catch { btn.textContent = 'Failed'; setTimeout(()=> btn.textContent='Copy', 1200); }
    });
    return container;
  };

  const checklist = (items, storageKey) => {
    let saved = {};
    if (window.DB && window.DB.isConfigured) saved = window.DB.getProgress(storageKey) || {};
    else saved = JSON.parse(localStorage.getItem(storageKey) || '{}');

    const frag = document.createDocumentFragment();
    items.forEach((text, idx) => {
      const id = `${storageKey}-${idx}`;
      const wrapper = el(`<label class="checklist-item"><input type="checkbox"><span>${text}</span></label>`);
      const box = wrapper.querySelector('input');
      box.checked = !!saved[id];
      box.addEventListener('change', () => {
        let state = {};
        if (window.DB && window.DB.isConfigured) state = window.DB.getProgress(storageKey) || {};
        else state = JSON.parse(localStorage.getItem(storageKey) || '{}');

        state[id] = box.checked;

        if (window.DB && window.DB.isConfigured && window.DB.getUser()) window.DB.saveProgress(storageKey, state);
        else localStorage.setItem(storageKey, JSON.stringify(state));

        document.dispatchEvent(new CustomEvent('progress:update'));
      });
      frag.appendChild(wrapper);
    });
    return frag;
  };

  const quiz = ({ question, options, correctIndex, storageKey }) => {
    let saved;
    if (window.DB && window.DB.isConfigured) saved = window.DB.getProgress(storageKey);
    else saved = localStorage.getItem(storageKey);

    const root = el(`<div class="card"></div>`);
    const q = el(`<div style="font-weight:600; margin-bottom:8px;">${question}</div>`);
    const list = el(`<div class="grid"></div>`);
    const result = el(`<div class="muted" style="margin-top:8px"></div>`);
    options.forEach((opt, i) => {
      const b = el(`<button class="btn btn-muted" style="text-align:left;">${opt}</button>`);
      b.addEventListener('click', () => {
        const correct = i === correctIndex;
        result.textContent = correct ? '✅ Correct!' : '❌ Try again';
        if (correct) {
          if (window.DB && window.DB.isConfigured && window.DB.getUser()) window.DB.saveProgress(storageKey, 'passed');
          else localStorage.setItem(storageKey, 'passed');

          document.dispatchEvent(new CustomEvent('progress:update'));
        }
      });
      list.appendChild(b);
    });
    if (saved === 'passed') result.textContent = '✅ Completed previously';
    root.append(q, list, result);
    return root;
  };

    const imageGallery = (images, title = 'Related Images') => {
      if (!images || images.length === 0) return document.createDocumentFragment();
      
      const container = el(`
        <div class="card">
          <h3>${title}</h3>
          <div class="image-gallery"></div>
        </div>
      `);
      
      const gallery = container.querySelector('.image-gallery');
      images.forEach(img => {
        const imgEl = el(`
          <div class="gallery-item">
            <img src="images/${img.filename}" alt="${img.description}" loading="lazy">
            <div class="image-caption">${img.description}</div>
          </div>
        `);
        gallery.appendChild(imgEl);
      });
      
      return container;
    };

    const MockTerminal = () => {
      const container = document.createElement('div');
      container.className = 'js-terminal';
      container.setAttribute('tabindex', '0');
      
      let history = [];
      let historyIdx = -1;
      let cwd = '/home/learner';
      let user = 'learner';
      let host = 'linux-roadmap';
      
      const print = (text, isHtml = false) => {
        const line = document.createElement('div');
        if (isHtml) line.innerHTML = text;
        else line.textContent = text;
        container.insertBefore(line, container.lastElementChild);
        container.scrollTop = container.scrollHeight;
      };
      
      const renderPrompt = () => {
        const p = document.createElement('div');
        p.style.display = 'flex';
        p.innerHTML = `<span style="color:#81a1c1;">${user}@${host}</span>:<span style="color:#b48ead;">${cwd}</span>$ <input type="text" style="flex:1;background:transparent;border:none;color:#e5e9f0;font-family:inherit;font-size:inherit;outline:none;margin-left:8px;" autofocus spellcheck="false" autocomplete="off">`;
        container.appendChild(p);
        const input = p.querySelector('input');
        setTimeout(() => input.focus(), 10);
        
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const cmd = input.value.trim();
            p.innerHTML = `<span style="color:#81a1c1;">${user}@${host}</span>:<span style="color:#b48ead;">${cwd}</span>$ ${cmd}`;
            if (cmd) {
              history.push(cmd);
              historyIdx = history.length;
              execute(cmd);
            }
            renderPrompt();
          } else if (e.key === 'ArrowUp') {
            if (historyIdx > 0) { historyIdx--; input.value = history[historyIdx]; }
            e.preventDefault();
          } else if (e.key === 'ArrowDown') {
            if (historyIdx < history.length - 1) { historyIdx++; input.value = history[historyIdx]; }
            else { historyIdx = history.length; input.value = ''; }
            e.preventDefault();
          }
        });
      };
      
      const execute = (cmdStr) => {
        const args = cmdStr.split(' ').filter(Boolean);
        const cmd = args[0].toLowerCase();
        switch(cmd) {
          case 'help': print('Available mock commands: help, clear, pwd, ls, whoami, echo, date, uname'); break;
          case 'clear': container.innerHTML = ''; break;
          case 'pwd': print(cwd); break;
          case 'whoami': print(user); break;
          case 'uname': print(args[1] === '-a' ? 'Linux linux-roadmap 6.8.0-generic #1 SMP x86_64 GNU/Linux' : 'Linux'); break;
          case 'echo': print(args.slice(1).join(' ')); break;
          case 'date': print(new Date().toString()); break;
          case 'ls': print('learning-notes.txt   documents   scripts'); break;
          default: print(`bash: ${cmd}: command not found (mock terminal only supports basic commands)`);
        }
      };
      
      container.innerHTML = '<div style="margin-bottom:12px;color:#8fbcbb;font-weight:600;">Welcome to the Linux Roadmap Browser Terminal.<br>Type "help" to see available commands.</div>';
      renderPrompt();
      
      container.addEventListener('click', () => { const inp = container.querySelector('input'); if(inp) inp.focus(); });
      return container;
    };

  return { el, codeBlock, checklist, quiz, imageGallery, MockTerminal };
})();

