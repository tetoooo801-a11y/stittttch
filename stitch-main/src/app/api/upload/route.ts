import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const ext = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;

    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, buffer, {
        contentType: file.type,
      });

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    return NextResponse.json({ 
      success: true, 
      url: publicUrlData.publicUrl 
    });

  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
