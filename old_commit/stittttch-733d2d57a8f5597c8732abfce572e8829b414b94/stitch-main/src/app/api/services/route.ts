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
