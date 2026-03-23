// Global function to close sidebar from anywhere
function closeSidebarMenu() {
  console.log('🔍 closeSidebarMenu() called');
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  
  console.log('Sidebar before:', sidebar?.className);
  console.log('Backdrop before:', backdrop?.className);
  
  if (sidebar) {
    sidebar.classList.remove('open');
    console.log('Removed open from sidebar');
  }
  if (backdrop) {
    backdrop.classList.remove('open');
    console.log('Removed open from backdrop');
  }
  
  console.log('Sidebar after:', sidebar?.className);
  console.log('Backdrop after:', backdrop?.className);
}

// App bootstrap

window.addEventListener('DOMContentLoaded', async () => {
  console.log('📄 DOM ready, initializing app...');

  // Initialize Auth & Cloud DB
  if (window.DB) {
    await window.DB.init();
    const authToggle = document.getElementById('auth-toggle');
    const authModal = document.getElementById('auth-modal');
    const authForm = document.getElementById('auth-form');
    const errorDiv = document.getElementById('auth-error');

    // Auto-update button text if already logged in via session cache
    if (window.DB.getUser() && authToggle) authToggle.textContent = 'Sign Out';

    authToggle?.addEventListener('click', () => {
      if (window.DB.getUser()) {
        window.DB.signOut();
      } else {
         authModal?.showModal();
      }
    });
    
    document.addEventListener('auth:change', (e) => {
      if (authToggle) authToggle.textContent = e.detail.user ? 'Sign Out' : 'Login';
      if (e.detail.user) authModal?.close();
    });

    document.getElementById('btn-register')?.addEventListener('click', (e) => {
        e.preventDefault();
        authModal?.close();
        location.hash = '#/100';
    });

    // Delegated listener for the full registration page form
    document.addEventListener('submit', async (e) => {
        if (e.target.id === 'full-register-form') {
            e.preventDefault();
            const email = document.getElementById('reg-email').value;
            const pass = document.getElementById('reg-password').value;
            const fullname = document.getElementById('reg-fullname').value;
            const username = document.getElementById('reg-username').value;
            const errorDiv = document.getElementById('reg-error');
            const successDiv = document.getElementById('reg-success');

            errorDiv.style.display = 'none';
            successDiv.style.display = 'none';

            const { data, error } = await window.DB.signUp(email, pass, { 
                full_name: fullname, 
                username: username 
            });

            if (error) {
                errorDiv.textContent = error.message;
                errorDiv.style.display = 'block';
            } else {
                successDiv.textContent = "Registration successful! " + 
                    (data?.user?.identities?.length === 0 ? "You're already registered." : "Please check your email if confirmation is enabled.");
                successDiv.style.display = 'block';
                // Wait and redirect to login/home
                setTimeout(() => { location.hash = '#/1'; }, 3000);
            }
        }
    });

    authForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('auth-email').value;
        const pass = document.getElementById('auth-password').value;
        const res = await window.DB.signIn(email, pass);
        if (res?.error) { errorDiv.textContent = res.error.message; errorDiv.style.display = 'block'; }
    });
  }

  console.log('RoadmapRouter:', window.RoadmapRouter);
  RoadmapRouter.init();
  console.log('✅ Router initialized');
  // Terminal pane toggling
  const pane = document.getElementById('terminal-pane');
  const body = document.getElementById('terminal-body');
  const openBtn = document.getElementById('terminal-toggle');
  const closeBtn = document.getElementById('terminal-close');
  let terminalInitialized = false;
  openBtn?.addEventListener('click', () => {
    if (!terminalInitialized && window.UI && window.UI.MockTerminal) {
      body.innerHTML = '';
      body.appendChild(UI.MockTerminal());
      terminalInitialized = true;
    }
    pane?.classList.toggle('open');
    if (pane?.classList.contains('open')) {
      setTimeout(() => { const inp = body.querySelector('input'); if(inp) inp.focus(); }, 350);
    }
  });
  closeBtn?.addEventListener('click', () => { pane?.classList.remove('open'); });
});

