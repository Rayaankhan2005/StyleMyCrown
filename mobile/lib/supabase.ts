import { createClient } from '@supabase/supabase-js';

// These will be replaced with your actual Supabase credentials
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    // Enable auto-refresh of tokens
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
