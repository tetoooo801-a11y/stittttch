import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    }

    const { data: user } = await supabase
      .from("profiles")
      .select("id, name, email, role, created_at")
      .eq("id", payload.id)
      .maybeSingle();

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: { user: camelize(user) } });
  } catch (error: any) {
    console.error("Get Me Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal server error" }, { status: 500 });
  }
}
