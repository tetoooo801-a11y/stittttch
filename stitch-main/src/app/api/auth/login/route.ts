import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";
import { signToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const { data: user } = await supabase
      .from("profiles")
      .select("id, name, email, password, created_at")
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
    }

    const token = signToken(user.id);
    delete user.password;

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: { user: camelize(user), token },
    });
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal server error" }, { status: 500 });
  }
}
