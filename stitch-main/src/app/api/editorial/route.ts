import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("editorials")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) throw error;
    return NextResponse.json({ success: true, data: { editorials: camelize(data) } });
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = decamelize(body);
    const dbData = {
      title_en: "New Editorial",
      title_ar: "مقال جديد",
      slug: "new-editorial",
      content_en: "Content coming soon...",
      content_ar: "المحتوى قريباً...",
      image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
      status: "published",
      author_name: "Admin",
      read_time: "5 min",
      ...parsed
    };
    if (parsed.content) {
      dbData.content_en = parsed.content;
      dbData.content_ar = parsed.content;
      delete dbData.content;
    }
    delete dbData.id;
    const { data, error } = await supabase.from("editorials").insert(dbData).select("*").single();
    if (error) throw error;
    return NextResponse.json({ success: true, data: { post: camelize(data) } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
