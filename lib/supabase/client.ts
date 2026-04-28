import { createClient } from "@supabase/supabase-js"
import { getSupabasePublicConfig } from "./shared" [modified]
import type { Database } from "./types"  [edited]

export function createBrowserSupabaseClient() {
  const { url, anonKey } = getSupabasePublicConfig()
  if (!url || !anonKey) return null
  return createClient<Database>(url, anonKey)  [edited]
}