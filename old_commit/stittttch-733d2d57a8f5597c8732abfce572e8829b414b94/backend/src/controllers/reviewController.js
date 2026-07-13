import { supabase } from "../config/supabase.js";
import { camelize } from "../utils/camelize.js";
import { resolveService } from "../utils/resolveService.js";

export async function createReview(req, res, next) {
  try {
    const { serviceId, title, text, rating, authorName } = req.body;

    const service = await resolveService(serviceId, "id");

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const { data: review, error } = await supabase
      .from("reviews")
      .insert({
        service_id: service.id,
        user_id: req.user?._id || null,
        author_name: authorName || req.user?.name || "Guest",
        title,
        text,
        rating,
      })
      .select("*")
      .single();

    if (error) throw error;

    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select("rating")
      .eq("service_id", service.id);

    if (reviewsError) throw reviewsError;

    const reviewsCount = reviews.length;
    const avgRating =
      Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount) * 10) / 10;

    const { error: updateError } = await supabase
      .from("services")
      .update({ reviews_count: reviewsCount, rating: avgRating })
      .eq("id", service.id);

    if (updateError) throw updateError;

    res.status(201).json({ success: true, data: { review: camelize(review) } });
  } catch (error) {
    next(error);
  }
}

export async function getReviews(req, res, next) {
  try {
    const service = await resolveService(req.params.serviceId, "id");

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("service_id", service.id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, data: { reviews: camelize(data) } });
  } catch (error) {
    next(error);
  }
}
