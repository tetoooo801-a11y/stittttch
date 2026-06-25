import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";

export async function GET(req: NextRequest, { params }: { params: { category: string } }) {
  try {
    const { data: services, error } = await supabase
      .from("services")
      .select("*")
      .eq("category", params.category)
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) throw error;

    let bannerUrl = "";
    if (params.category === "face") bannerUrl = "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=1200&q=80";
    else if (params.category === "hair") bannerUrl = "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80";
    else if (params.category === "body") bannerUrl = "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=80";
    else bannerUrl = "https://images.unsplash.com/photo-1615397323214-3a216f446059?auto=format&fit=crop&w=1200&q=80";

    return NextResponse.json({
      success: true,
      data: {
        category: params.category,
        bannerUrl,
        services: camelize(services)
      }
    });
  } catch (error: any) {
    console.error("Get Category Services Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal server error" }, { status: 500 });
  }
}
