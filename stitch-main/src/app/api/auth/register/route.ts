import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";
import { signToken } from "@/lib/jwt";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    const normalizedEmail = email.toLowerCase();

    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ success: false, message: "Email already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const { data: user, error } = await supabase
      .from("profiles")
      .insert({ name, email: normalizedEmail, password: hashedPassword })
      .select("id, name, email, created_at")
      .single();

    if (error) throw error;

    const token = signToken(user.id);

    return NextResponse.json({
      success: true,
      message: "Registration successful",
      data: { user: camelize(user), token },
    }, { status: 201 });
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json({ success: false, message: error.message || "Internal server error" }, { status: 500 });
  }
}
