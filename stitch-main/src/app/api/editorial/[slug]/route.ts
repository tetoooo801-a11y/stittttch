import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const { data, error } = await supabase
      .from("editorials")
      .select("*")
      .eq("slug", params.slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) throw error;
    if (!data) return NextResponse.json({ success: false, message: "Editorial not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: { editorial: camelize(data) } });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
