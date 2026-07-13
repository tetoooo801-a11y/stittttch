import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";
import { resolveService } from "@/lib/resolveService";
import { verifyToken } from "@/lib/jwt";

const DEPOSIT_RATE = 0.5;
const BOOKING_SELECT = "*, service:services(*)";

function calcTotals(price: number, quantity: number, discountAmount = 0) {
  const subtotal = price * quantity;
  const depositAmount = Math.round(subtotal * DEPOSIT_RATE * 100) / 100;
  const total = Math.max(0, depositAmount - discountAmount);
  return { subtotal, depositAmount, total };
}

function getUserFromAuthHeader(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    return verifyToken(token);
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { serviceId, name, email, phone, date, time, notes, quantity = 1 } = body;

    const service = await resolveService(serviceId, "id, price");

    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }

    const qty = Math.max(1, parseInt(quantity, 10) || 1);
    const { subtotal, depositAmount, total } = calcTotals(service.price, qty);
    
    const user = getUserFromAuthHeader(req);

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        user_id: user?.id || null,
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
        status: "pending",
      })
      .select(BOOKING_SELECT)
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, data: { booking: camelize(booking) } }, { status: 201 });
  } catch (error: any) {
    console.error("Booking Create Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal server error" }, { status: 500 });
  }
}
