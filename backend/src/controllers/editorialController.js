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

export async function createEditorial(req, res, next) {
  try {
    const { title, slug, content, sortOrder } = req.body;

    const { data: post, error } = await supabase
      .from("editorials")
      .insert({
        title,
        slug,
        content: content || "",
        sort_order: sortOrder || 0,
      })
      .select("*")
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data: { post: camelize(post) } });
  } catch (error) {
    next(error);
  }
}

export async function updateEditorial(req, res, next) {
  try {
    const { title, content, sortOrder } = req.body;

    const update = {};
    if (title !== undefined) update.title = title;
    if (content !== undefined) update.content = content;
    if (sortOrder !== undefined) update.sort_order = sortOrder;

    const { data: post, error } = await supabase
      .from("editorials")
      .update(update)
      .eq("id", req.params.id)
      .select("*")
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

export async function deleteEditorial(req, res, next) {
  try {
    const { error } = await supabase
      .from("editorials")
      .delete()
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({ success: true, message: "Post deleted" });
  } catch (error) {
    next(error);
  }
}