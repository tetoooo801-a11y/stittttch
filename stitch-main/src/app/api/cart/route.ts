import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { camelize } from "@/lib/camelize";
import { verifyToken } from "@/lib/jwt";
import { resolveService } from "@/lib/resolveService";

function getUserFromAuthHeader(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    return verifyToken(token);
  }
  return null;
}

export async function GET(req: NextRequest) {
  try {
    const user = getUserFromAuthHeader(req);
    if (!user) return NextResponse.json({ success: true, data: { cart: { _id: "demo", items: [] } } });

    let { data: cart } = await supabase
      .from("carts")
      .select("id, user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!cart) {
      const { data: newCart } = await supabase
        .from("carts")
        .insert({ user_id: user.id })
        .select("id, user_id")
        .single();
      cart = newCart;
    }

    const { data: items } = await supabase
      .from("cart_items")
      .select("id, quantity, service:services(*)")
      .eq("cart_id", cart!.id);

    return NextResponse.json({ success: true, data: { cart: camelize({ ...cart, items: items || [] }) } });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = getUserFromAuthHeader(req);
    if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const { serviceId, quantity = 1 } = await req.json();
    const service = await resolveService(serviceId, "id");
    if (!service) return NextResponse.json({ success: false, message: "Service not found" }, { status: 404 });

    let { data: cart } = await supabase.from("carts").select("id").eq("user_id", user.id).maybeSingle();
    if (!cart) {
      const { data: newCart } = await supabase.from("carts").insert({ user_id: user.id }).select("id").single();
      cart = newCart;
    }

    const { data: existingItem } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("cart_id", cart!.id)
      .eq("service_id", service.id)
      .maybeSingle();

    if (existingItem) {
      await supabase.from("cart_items").update({ quantity: existingItem.quantity + quantity }).eq("id", existingItem.id);
    } else {
      await supabase.from("cart_items").insert({ cart_id: cart!.id, service_id: service.id, quantity });
    }

    const { data: items } = await supabase
      .from("cart_items")
      .select("id, quantity, service:services(*)")
      .eq("cart_id", cart!.id);

    return NextResponse.json({ success: true, data: { cart: camelize({ ...cart, items: items || [] }) } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
