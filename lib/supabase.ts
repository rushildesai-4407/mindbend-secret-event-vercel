import { createClient } from '@supabase/supabase-js'

// Force IPv4 for Supabase server-side fetch requests to prevent Node 18+ undici IPv6 timeout issues
if (typeof window === 'undefined') {
    try {
        const dns = require('node:dns');
        if (dns.setDefaultResultOrder) {
            dns.setDefaultResultOrder('ipv4first');
        }
    } catch (e) {
        // Ignore if running in a non-Node edge environment
    }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!

// We can use the service role key for admin bypass if needed, but for simplicity we'll use anon/URL
// Keep in mind in a real production app you'd want Row Level Security (RLS) policies configured.
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
