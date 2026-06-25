import { supabase } from "./supabase";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function resolveService(idOrSlug: string, columns = "id"): Promise<any> {
  let query = supabase.from("services").select(columns).eq("is_active", true);
  query = UUID_RE.test(idOrSlug)
    ? query.or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
    : query.eq("slug", idOrSlug);

  const { data, error } = await query.maybeSingle();
  if (error) throw error;
  return data;
}
