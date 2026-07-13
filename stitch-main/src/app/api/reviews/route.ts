import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { resolveService } from "@/lib/resolveService";

export async function POST(req: NextRequest) {
  try {
    const { serviceId, title, text, rating, authorName } = await req.json();
    const service = await resolveService(serviceId, "id");
    
    if (!service) return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });

    const { error } = await supabase.from("reviews").insert({
      service_id: service.id,
      title,
      text,
      rating,
      author_name: authorName || "Anonymous",
      status: "pending"
    });

    if (error) throw error;
    return NextResponse.json({ success: true, message: "Review submitted for approval" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
