import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

export default supabase;
