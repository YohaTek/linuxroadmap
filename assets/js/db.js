window.DB = (() => {
  // ==========================================
  // 🔴 IMPORTANT: SUPABASE CONFIGURATION
  // ==========================================
  // Replace these with your project credentials from supabase.com
  const SUPABASE_URL = 'YOUR_SUPABASE_URL';
  const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
  // ==========================================

  const isConfigured = SUPABASE_URL !== 'YOUR_SUPABASE_URL' && SUPABASE_URL.startsWith('http');
  const client = isConfigured ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

  let currentUser = null;
  let cachedProgress = {};

  const init = async () => {
    if (!isConfigured) {
      console.warn("Supabase is not configured. Falling back to simple LocalStorage.");
      return;
    }

    try {
      const { data: { session } } = await client.auth.getSession();
      currentUser = session?.user || null;
      if (currentUser) {
        await loadRemoteProgress();
      }

      client.auth.onAuthStateChange(async (event, session) => {
        currentUser = session?.user || null;
        if (currentUser) {
          await loadRemoteProgress();
        } else {
          cachedProgress = {};
        }
        document.dispatchEvent(new CustomEvent('auth:change', { detail: { user: currentUser } }));
        document.dispatchEvent(new CustomEvent('progress:update'));
      });

    } catch (e) {
      console.error("Supabase init error:", e);
    }
  };

  const loadRemoteProgress = async () => {
    if (!client || !currentUser) return;
    const { data, error } = await client.from('user_progress').select('module_key, data').eq('user_id', currentUser.id);
    if (!error && data) {
      cachedProgress = {};
      data.forEach(row => {
        cachedProgress[row.module_key] = row.data;
      });
    }
  };

  const getProgress = (key) => {
    if (!isConfigured || !currentUser) {
      // Fallback
      const local = localStorage.getItem(key);
      return local ? JSON.parse(local) : null;
    }
    return cachedProgress[key] || null;
  };

  const saveProgress = async (key, payload) => {
    if (!isConfigured || !currentUser) {
      // Fallback
      localStorage.setItem(key, JSON.stringify(payload));
      return;
    }
    
    // Optimistic cache update
    cachedProgress[key] = payload;
    
    // Upsert to DB
    const { error } = await client.from('user_progress').upsert({
      user_id: currentUser.id,
      module_key: key,
      data: payload,
      updated_at: new Date()
    }, { onConflict: 'user_id, module_key' });

    if (error) console.error("Error saving progress to cloud:", error);
  };

  const signIn = async (email, password) => {
    if(!isConfigured) return {error: {message: "Supabase not configured."}};
    return await client.auth.signInWithPassword({ email, password });
  };

  const signUp = async (email, password) => {
    if(!isConfigured) return {error: {message: "Supabase not configured."}};
    return await client.auth.signUp({ email, password });
  };

  const signOut = async () => {
    if(!isConfigured) return;
    await client.auth.signOut();
  };

  return { 
    isConfigured, 
    client, 
    init, 
    getProgress, 
    saveProgress,
    signIn,
    signUp,
    signOut,
    getUser: () => currentUser
  };
})();
