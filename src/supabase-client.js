import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  process.env.REACT_APP_API_URL,
  process.env.REACT_APP_ANON_KEY
);
