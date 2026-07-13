import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const { data, error } = await supabase
      .from("editorials")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error) throw error;
    if (!data) return NextResponse.json({ success: false, message: "Editorial not found" }, { status: 404 });

    return NextResponse.json({ success: true, data: { editorial: camelize(data) } });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
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

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const dbData = decamelize(body);
    delete dbData.id;
    const { data, error } = await supabase.from("editorials").update(dbData).eq("id", slug).select("*").single();
    if (error) throw error;
    return NextResponse.json({ success: true, data: { post: camelize(data) } });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const { error } = await supabase.from("editorials").delete().eq("id", slug);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
