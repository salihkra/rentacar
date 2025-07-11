import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gvawdlrdtdhxjlbezgyn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2YXdkbHJkdGRoeGpsYmV6Z3luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyMzEwMjQsImV4cCI6MjA2NzgwNzAyNH0.Td8K3ST8autinrN5fpA-RNYU-Cibsw7E5uOmXFBxq4Y';

export const supabase = createClient(supabaseUrl, supabaseKey);