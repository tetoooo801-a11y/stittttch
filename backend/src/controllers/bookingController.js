import { supabase } from "../config/supabase.js";
import { camelize } from "../utils/camelize.js";
import { resolveService } from "../utils/resolveService.js";

const DEPOSIT_RATE = 0.5;
const BOOKING_SELECT = "*, service:services(*)";
const VALID_DISCOUNT_CODES = { STITCH10: 10, WELCOME15: 15 };

function calcTotals(price, quantity, discountAmount = 0) {
  const subtotal = price * quantity;
  const depositAmount = Math.round(subtotal * DEPOSIT_RATE * 100) / 100;
  const total = Math.max(0, depositAmount - discountAmount);
  return { subtotal, depositAmount, total };
}

export async function createBooking(req, res, next) {
  try {
    const { serviceId, name, email, phone, date, time, notes, quantity = 1 } = req.body;

    const service = await resolveService(serviceId, "id, price");

    if (!service) {
      return res.status(404).json({ success: false, message: "Service not found" });
    }

    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const { subtotal, depositAmount, total } = calcTotals(service.price, qty);

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        user_id: req.user?._id || null,
        service_id: service.id,
        customer_name: name,
        customer_email: email,
        customer_phone: phone || "",
        date,
        time,
        notes: notes || "",
        quantity: qty,
        subtotal,
        deposit_amount: depositAmount,
        total,
        status: "pending_deposit",
      })
      .select(BOOKING_SELECT)
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, data: { booking: camelize(booking) } });
  } catch (error) {
    next(error);
  }
}

export async function getBooking(req, res, next) {
  try {
    const { data: booking, error } = await supabase
      .from("bookings")
      .select(BOOKING_SELECT)
      .eq("id", req.params.id)
      .maybeSingle();

    if (error) throw error;
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, data: { booking: camelize(booking) } });
  } catch (error) {
    next(error);
  }
}

export async function updateBooking(req, res, next) {
  try {
    const { data: existing, error: getError } = await supabase
      .from("bookings")
      .select(BOOKING_SELECT)
      .eq("id", req.params.id)
      .maybeSingle();

    if (getError) throw getError;
    if (!existing) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    const {
      quantity,
      discountCode,
      firstName,
      lastName,
      email,
      phone,
      healthNotes,
      paymentMethod,
    } = req.body;

    const update = {};
    let qty = existing.quantity;
    let discountAmount = existing.discount_amount;
    let recalc = false;

    if (quantity) {
      qty = Math.max(1, parseInt(quantity, 10));
      update.quantity = qty;
      recalc = true;
    }

    if (discountCode !== undefined) {
      discountAmount = VALID_DISCOUNT_CODES[discountCode?.toUpperCase()] || 0;
      update.discount_code = discountCode;
      update.discount_amount = discountAmount;
      recalc = true;
    }

    if (recalc) {
      const totals = calcTotals(existing.service.price, qty, discountAmount);
      update.subtotal = totals.subtotal;
      update.deposit_amount = totals.depositAmount;
      update.total = totals.total;
    }

    if (firstName || lastName) {
      update.customer_name =
        [firstName, lastName].filter(Boolean).join(" ").trim() || existing.customer_name;
    }
    if (email) update.customer_email = email;
    if (phone !== undefined) update.customer_phone = phone;
    if (healthNotes !== undefined) update.health_notes = healthNotes;
    if (paymentMethod) update.payment_method = paymentMethod;

    const { data: booking, error } = await supabase
      .from("bookings")
      .update(update)
      .eq("id", req.params.id)
      .select(BOOKING_SELECT)
      .single();

    if (error) throw error;

    res.json({ success: true, data: { booking: camelize(booking) } });
  } catch (error) {
    next(error);
  }
}

export async function confirmBooking(req, res, next) {
  try {
    const { data: booking, error } = await supabase
      .from("bookings")
      .update({ status: "confirmed" })
      .eq("id", req.params.id)
      .select(BOOKING_SELECT)
      .maybeSingle();

    if (error) throw error;
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.json({ success: true, message: "Booking confirmed", data: { booking: camelize(booking) } });
  } catch (error) {
    next(error);
  }
}

export async function getMyBookings(req, res, next) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select(BOOKING_SELECT)
      .eq("user_id", req.user._id)
      .order("created_at", { ascending: false });

    if (error) throw error;

    res.json({ success: true, data: { bookings: camelize(data) } });
  } catch (error) {
    next(error);
  }
}
