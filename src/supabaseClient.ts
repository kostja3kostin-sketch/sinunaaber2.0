import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kmnusdgvaddgzgmnoegb.supabase.co';
const supabaseKey = 'sb_publishable_Lej8V5itbZjuTvNANFzCWQ_1KpjPNh8';

export const supabase = createClient(supabaseUrl, supabaseKey);