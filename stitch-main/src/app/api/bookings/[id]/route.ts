import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";

const BOOKING_SELECT = "*, service:services(*)";
const DEPOSIT_RATE = 0.5;
const VALID_DISCOUNT_CODES: Record<string, number> = { STITCH10: 10, WELCOME15: 15 };

function calcTotals(price: number, quantity: number, discountAmount = 0) {
  const subtotal = price * quantity;
  const depositAmount = Math.round(subtotal * DEPOSIT_RATE * 100) / 100;
  const total = Math.max(0, depositAmount - discountAmount);
  return { subtotal, depositAmount, total };
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { data: booking, error } = await supabase
      .from("bookings")
      .select(BOOKING_SELECT)
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (!booking) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { booking: camelize(booking) } });
  } catch (error: any) {
    console.error("Get Booking Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { data: existing, error: getError } = await supabase
      .from("bookings")
      .select(BOOKING_SELECT)
      .eq("id", id)
      .maybeSingle();

    if (getError) throw getError;
    if (!existing) {
      return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    }

    const body = await req.json();
    const { quantity, discountCode, firstName, lastName, email, phone, healthNotes, paymentMethod } = body;

    const update: any = {};
    let qty = existing.quantity;
    let discountAmount = existing.discount_amount;
    let recalc = false;

    if (quantity !== undefined) {
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
      update.customer_name = [firstName, lastName].filter(Boolean).join(" ").trim() || existing.customer_name;
    }
    if (email) update.customer_email = email;
    if (phone !== undefined) update.customer_phone = phone;
    if (healthNotes !== undefined) update.health_notes = healthNotes;
    if (paymentMethod) update.payment_method = paymentMethod;

    const { data: booking, error } = await supabase
      .from("bookings")
      .update(update)
      .eq("id", id)
      .select(BOOKING_SELECT)
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data: { booking: camelize(booking) } });
  } catch (error: any) {
    console.error("Update Booking Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal server error" }, { status: 500 });
  }
}

