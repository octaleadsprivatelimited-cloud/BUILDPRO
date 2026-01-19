/**
 * Supabase Configuration
 * 
 * Setup Instructions:
 * 1. Create a Supabase project at https://supabase.com
 * 2. Go to Settings > API
 * 3. Copy your Project URL and anon/public key
 * 4. Create a .env file in the root directory with:
 *    VITE_SUPABASE_URL=your_project_url
 *    VITE_SUPABASE_ANON_KEY=your_anon_key
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

