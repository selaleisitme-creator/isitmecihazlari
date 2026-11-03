import { createClient } from "@supabase/supabase-js";

let client = null;

// Created on first use rather than at import time: ES module imports run before
// server.js calls dotenv.config(), so the environment is not loaded yet at import.
// The secret key bypasses Row Level Security, so this client must stay on the server.
export function getSupabase() {
  if (!client) {
    client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}
