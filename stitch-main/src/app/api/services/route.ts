import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const sort = searchParams.get("sort");

    let query = supabase.from("services").select("*").eq("is_active", true);

    if (category && category !== "all") {
      query = query.eq("category", category);
    }

    if (sort === "price-low") {
      query = query.order("price", { ascending: true });
    } else if (sort === "price-high") {
      query = query.order("price", { ascending: false });
    } else if (sort === "rating") {
      query = query.order("rating", { ascending: false });
    } else {
      query = query.order("created_at", { ascending: false });
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, data: { services: camelize(data) } });
  } catch (error: any) {
    console.error("Get Services Error:", error);
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = decamelize(body);
    const dbData = {
      title_key: "new_service",
      desc_key: "new_service_desc",
      title_en: "New Service",
      title_ar: "خدمة جديدة",
      desc_en: "Description coming soon...",
      desc_ar: "التفاصيل قريباً...",
      duration: 60,
      price: 100,
      rating: 5,
      reviews_count: 0,
      image_url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
      is_active: true,
      category: "face",
      slug: "new-service",
      ...parsed
    };
    delete dbData.id;
    delete dbData.name;
    const { data, error } = await supabase.from("services").insert(dbData).select("*").single();
    if (error) throw error;
    return NextResponse.json({ success: true, data: { service: camelize(data) } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
