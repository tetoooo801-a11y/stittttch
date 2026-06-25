import { createClient } from "@supabase/supabase-js";

// Allow usage on the server-side with service key or client-side with anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.warn("Missing Supabase credentials");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
