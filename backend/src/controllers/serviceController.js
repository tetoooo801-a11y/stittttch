import { supabase } from "../config/supabase.js";
import { camelize } from "../utils/camelize.js";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getServices(req, res, next) {
  try {
    const { category, sort } = req.query;
    let query = supabase.from("services").select("*").eq("is_active", true);
    if (category && category !== "all") {
      query = query.eq("category", category);
    }
    if (sort === "price_low") query = query.order("price", { ascending: true });
    else if (sort === "price_high") query = query.order("price", { ascending: false });
    else query = query.order("created_at", { ascending: false });
    const { data, error } = await query;
    if (error) throw error;
    res.json({ success: true, data: { services: camelize(data) } });
  } catch (error) {
    next(error);
  }
}

export async function getServicesByCategory(req, res, next) {
  try {
    const { category } = req.params;
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("category", category)
      .eq("is_active", true)
      .order("price", { ascending: true });
    if (error) throw error;
    const services = camelize(data);
    const bannerUrl = services[0]?.bannerUrl || "";
    res.json({ success: true, data: { category, bannerUrl, services } });
  } catch (error) {
    next(error);
  }
}

export async function getServiceById(req, res, next) {
  try {
    const id = req.params.id;
    let query = supabase.from("services").select("*").eq("is_active", true);
    query = UUID_RE.test(id) ? query.or(`id.eq.${id},slug.eq.${id}`) : query.eq("slug", id);
    const { data: service, error } = await query.maybeSingle();
    if (error) throw error;
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }
    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select("*")
      .eq("service_id", service.id)
      .order("created_at", { ascending: false })
      .limit(10);
    if (reviewsError) throw reviewsError;
    res.json({
      success: true,
      data: { service: camelize(service), reviews: camelize(reviews || []) },
    });
  } catch (error) {
    next(error);
  }
}

export async function createService(req, res, next) {
  try {
    const { name, slug, category, price, description, bannerUrl } = req.body;

    const { data: service, error } = await supabase
      .from("services")
      .insert({
        name,
        slug,
        category,
        price,
        description: description || "",
        banner_url: bannerUrl || "",
        is_active: true,
      })
      .select("*")
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data: { service: camelize(service) } });
  } catch (error) {
    next(error);
  }
}

export async function updateService(req, res, next) {
  try {
    const { name, category, price, description, bannerUrl, isActive } = req.body;

    const update = {};
    if (name !== undefined) update.name = name;
    if (category !== undefined) update.category = category;
    if (price !== undefined) update.price = price;
    if (description !== undefined) update.description = description;
    if (bannerUrl !== undefined) update.banner_url = bannerUrl;
    if (isActive !== undefined) update.is_active = isActive;

    const { data: service, error } = await supabase
      .from("services")
      .update(update)
      .eq("id", req.params.id)
      .select("*")
      .maybeSingle();

    if (error) throw error;
    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    res.json({ success: true, data: { service: camelize(service) } });
  } catch (error) {
    next(error);
  }
}

export async function deleteService(req, res, next) {
  try {
    const { error } = await supabase
      .from("services")
      .update({ is_active: false })
      .eq("id", req.params.id);

    if (error) throw error;

    res.json({ success: true, message: "Service deleted" });
  } catch (error) {
    next(error);
  }
}