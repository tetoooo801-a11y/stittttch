import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { quantity } = await req.json();
    await supabase.from("cart_items").update({ quantity }).eq("id", params.id);
    
    const { data: item } = await supabase.from("cart_items").select("cart_id").eq("id", params.id).single();
    const { data: cart } = await supabase.from("carts").select("id, user_id").eq("id", item.cart_id).single();
    const { data: items } = await supabase.from("cart_items").select("id, quantity, service:services(*)").eq("cart_id", cart.id);
    
    return NextResponse.json({ success: true, data: { cart: camelize({ ...cart, items: items || [] }) } });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data: item } = await supabase.from("cart_items").select("cart_id").eq("id", params.id).single();
    await supabase.from("cart_items").delete().eq("id", params.id);
    
    const { data: cart } = await supabase.from("carts").select("id, user_id").eq("id", item.cart_id).single();
    const { data: items } = await supabase.from("cart_items").select("id, quantity, service:services(*)").eq("cart_id", cart.id);
    
    return NextResponse.json({ success: true, data: { cart: camelize({ ...cart, items: items || [] }) } });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
