import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!

// We can use the service role key for admin bypass if needed, but for simplicity we'll use anon/URL
// Keep in mind in a real production app you'd want Row Level Security (RLS) policies configured.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
