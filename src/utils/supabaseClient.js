
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qssrtoeiqrmfnbczncer.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabaseClient = createClient(supabaseUrl, supabaseKey);

export default supabaseClient;