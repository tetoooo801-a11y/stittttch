import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";
import { resolveService } from "@/lib/resolveService";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const service = await resolveService(id, "*");

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

function decamelize(obj: any) {
  const result: any = {};
  for (const key in obj) {
    const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    if (key === "_id") result.id = obj[key];
    else result[snakeKey] = obj[key];
  }
  delete result._id;
  return result;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const dbData = decamelize(body);
    delete dbData.id;
    delete dbData.name;
    const { data, error } = await supabase.from("services").update(dbData).eq("id", id).select("*").single();
    if (error) throw error;
    return NextResponse.json({ success: true, data: { service: camelize(data) } });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { error } = await supabase.from("services").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
