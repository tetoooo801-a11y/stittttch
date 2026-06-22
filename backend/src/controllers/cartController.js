import { supabase } from "../config/supabase.js";
import { camelize } from "../utils/camelize.js";
import { resolveService } from "../utils/resolveService.js";

const CART_SELECT = "*, items:cart_items(*, service:services(*))";

async function getOrCreateCart(userId) {
  let { data: cart, error } = await supabase
    .from("carts")
    .select(CART_SELECT)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;

  if (!cart) {
    const { data: newCart, error: insertError } = await supabase
      .from("carts")
      .insert({ user_id: userId })
      .select(CART_SELECT)
      .single();

    if (insertError) throw insertError;
    cart = newCart;
  }

  return cart;
}

export async function getCart(req, res, next) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    res.json({ success: true, data: { cart: camelize(cart) } });
  } catch (error) {
    next(error);
  }
}

export async function addToCart(req, res, next) {
  try {
    const { serviceId, quantity = 1 } = req.body;

    const service = await resolveService(serviceId, "id");

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const cart = await getOrCreateCart(req.user._id);
    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const existing = cart.items.find((i) => i.service_id === service.id);

    if (existing) {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity: existing.quantity + qty })
        .eq("id", existing.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("cart_items")
        .insert({ cart_id: cart.id, service_id: service.id, quantity: qty });
      if (error) throw error;
    }

    const updated = await getOrCreateCart(req.user._id);
    res.json({ success: true, data: { cart: camelize(updated) } });
  } catch (error) {
    next(error);
  }
}

export async function updateCartItem(req, res, next) {
  try {
    const { quantity } = req.body;
    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.find((i) => i.id === req.params.itemId);

    if (!item) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    if (quantity <= 0) {
      const { error } = await supabase.from("cart_items").delete().eq("id", item.id);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from("cart_items")
        .update({ quantity })
        .eq("id", item.id);
      if (error) throw error;
    }

    const updated = await getOrCreateCart(req.user._id);
    res.json({ success: true, data: { cart: camelize(updated) } });
  } catch (error) {
    next(error);
  }
}

export async function removeCartItem(req, res, next) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    const item = cart.items.find((i) => i.id === req.params.itemId);

    if (!item) {
      return res.status(404).json({ success: false, message: "Cart item not found" });
    }

    const { error } = await supabase.from("cart_items").delete().eq("id", item.id);
    if (error) throw error;

    const updated = await getOrCreateCart(req.user._id);
    res.json({ success: true, data: { cart: camelize(updated) } });
  } catch (error) {
    next(error);
  }
}

export async function clearCart(req, res, next) {
  try {
    const cart = await getOrCreateCart(req.user._id);

    const { error } = await supabase.from("cart_items").delete().eq("cart_id", cart.id);
    if (error) throw error;

    const updated = await getOrCreateCart(req.user._id);
    res.json({ success: true, data: { cart: camelize(updated) } });
  } catch (error) {
    next(error);
  }
}
