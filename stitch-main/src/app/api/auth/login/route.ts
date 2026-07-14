import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";
import { signToken } from "@/lib/jwt";

import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const { data: user } = await supabase
      .from("profiles")
      .select("id, name, email, password, role, created_at")
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (!user || (user.password !== password && !(await bcrypt.compare(password, user.password)))) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 });
    }

    const token = signToken(user.id, user.role);
    delete user.password;

    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 // 7 days
    });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      data: { user: camelize(user) }, // Remove token from response body for security
    });
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal server error" }, { status: 500 });
  }
}
