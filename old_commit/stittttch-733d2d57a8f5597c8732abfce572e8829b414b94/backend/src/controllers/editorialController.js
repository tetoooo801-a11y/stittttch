import { supabase } from "../config/supabase.js";
import { camelize } from "../utils/camelize.js";

export async function getEditorials(_req, res, next) {
  try {
    const { data, error } = await supabase
      .from("editorials")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, data: { posts: camelize(data) } });
  } catch (error) {
    next(error);
  }
}

export async function getEditorialBySlug(req, res, next) {
  try {
    const { data: post, error } = await supabase
      .from("editorials")
      .select("*")
      .eq("slug", req.params.slug)
      .maybeSingle();

    if (error) throw error;
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }

    res.json({ success: true, data: { post: camelize(post) } });
  } catch (error) {
    next(error);
  }
}
