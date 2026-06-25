import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";
import { resolveService } from "@/lib/resolveService";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const service = await resolveService(params.id, "*");

    if (!service) {
      return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });
    }

    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("service_id", service.id)
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (error) throw error;

    return NextResponse.json({ success: true, data: { service: camelize(service), reviews: camelize(reviews) } });
  } catch (error: any) {
    console.error("Get Service Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal server error" }, { status: 500 });
  }
}
