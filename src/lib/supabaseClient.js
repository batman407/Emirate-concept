import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabaseInstance;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️ Missing Supabase credentials. Auth features will be disabled. Fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable Auth.'
  );
  // Mock supabase client to prevent runtime crashes when environment variables are not configured
  supabaseInstance = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: async () => ({ data: {}, error: new Error("Authentication is disabled (missing credentials)") }),
      signInWithPassword: async () => ({ data: {}, error: new Error("Authentication is disabled (missing credentials)") }),
      signOut: async () => ({ error: null }),
      resetPasswordForEmail: async () => ({ data: {}, error: new Error("Authentication is disabled (missing credentials)") }),
      updateUser: async () => ({ data: {}, error: new Error("Authentication is disabled (missing credentials)") }),
    }
  };
} else {
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseInstance;

