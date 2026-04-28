import { createClient } from "@supabase/supabase-js"
import { getSupabasePublicConfig } from "./shared"
import type { Database } from "./types"  [edited]

export function createBrowserSupabaseClient() {
  const { url, anonKey } = getSupabasePublicConfig()
  if (!url || !anonKey) return null [modified]
  return createClient<Database>(url, anonKey)  [edited]
}