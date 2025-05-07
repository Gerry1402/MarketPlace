import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseRoleKey);
export const supabase = createClient(supabaseUrl, supabaseAnonKey);


export const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey);
