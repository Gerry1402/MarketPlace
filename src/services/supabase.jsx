import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// export const supabase = createClient(supabaseUrl, supabaseRoleKey);
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabaseAuth = createClient(supabaseUrl, supabaseRoleKey);

export const signOut = async () => await supabase.auth.signOut();

export const fetchTable = async tableName => {
    const { data, error } = await supabase.from(tableName).select('*');
    if (error) {
        console.error(`Error fetching ${tableName}:`, error);
        return null;
    }
    // console.log(data)
    return data;
};
