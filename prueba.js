// Import the Supabase client
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
const supabase = createClient(
    'https://apwvdicuxcbvlhqcjpld.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwd3ZkaWN1eGNidmxocWNqcGxkIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzA3MDUyMCwiZXhwIjoyMDU4NjQ2NTIwfQ.Cg6G1dldaTSAHpMGAZ3Yd6I-P3fHntocPtv8Col3Pz0',
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);

const tables = ['colors', 'conditions', 'materials', 'shops', 'sizes', 'sources', 'subcategories', 'targets'];

const fetchTableData = async table => {
    const { data, error } = await supabase.from(table).select('*');
    if (error) {
        console.error(`Error fetching data from ${table}:`, error);
    } else {
        console.log(`const ${table} = `, data);
    }
};

tables.forEach(table => {
    fetchTableData(table);
});
