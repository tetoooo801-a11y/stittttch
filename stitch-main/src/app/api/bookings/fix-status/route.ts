import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { error } = await supabase
      .from("bookings")
      .update({ status: "pending" })
      .eq("status", "confirmed");

    if (error) throw error;

    return NextResponse.json({ success: true, message: "All confirmed bookings have been successfully updated to pending!" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message || "Internal server error" }, { status: 500 });
  }
}
