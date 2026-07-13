import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, subject, message } = await req.json();

    const { error } = await supabase.from("contacts").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      subject,
      message,
      status: "new"
    });

    if (error) throw error;
    return NextResponse.json({ success: true, message: "Message sent successfully" }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
