import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";
import { verifyToken } from "@/lib/jwt";

const BOOKING_SELECT = "*, service:services(*)";

function getUserFromAuthHeader(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    return verifyToken(token);
  }
  return null;
}

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromAuthHeader(req);
    // Add logic here to verify user.role === 'admin' if needed, similar to adminMiddleware

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    let query = supabase
      .from("bookings")
      .select(BOOKING_SELECT)
      .order("created_at", { ascending: false });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;

    if (error) throw error;

    return NextResponse.json({ success: true, data: { bookings: camelize(data) } });
  } catch (error: any) {
    console.error("GetAllBookings Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal server error" }, { status: 500 });
  }
}
