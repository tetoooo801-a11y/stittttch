import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";

const BOOKING_SELECT = "*, service:services(*)";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { data: booking, error } = await supabase
      .from("bookings")
      .update({ status: "confirmed" })
      .eq("id", id)
      .in("status", ["pending", "pending_deposit"])
      .select(BOOKING_SELECT)
      .maybeSingle();

    if (error) throw error;
    if (!booking) return NextResponse.json({ success: false, message: "Booking not found" }, { status: 404 });
    
    return NextResponse.json({ success: true, message: "Booking confirmed", data: { booking: camelize(booking) } });
  } catch (error: any) {
    console.error("Confirm Booking Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal server error" }, { status: 500 });
  }
}
