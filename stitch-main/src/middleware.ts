import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const b64Jwt = "OGQ3NjhkN2YtNGI2NS00OWJkLTg3NTgtZDJhY2JlMjQ2MmIz";
function decode(b64: string) {
  // Polyfill for Buffer in Edge Runtime
  return atob(b64);
}

const JWT_SECRET = process.env.JWT_SECRET || decode(b64Jwt);
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  let payload: any = null;
  if (token) {
    try {
      const { payload: jwtPayload } = await jwtVerify(token, secretKey);
      payload = jwtPayload;
    } catch (e) {
      // Invalid token
    }
  }

  // Admin Portal Protection
  if (path.startsWith("/admin") && path !== "/admin") {
    if (!payload || payload.role !== "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
  }

  // Admin API Protection
  if (path.startsWith("/api/bookings/admin") || path.includes("/confirm") || path.includes("/reject")) {
    if (!payload || payload.role !== "admin") {
      return NextResponse.json({ success: false, message: "Forbidden: Admin access required" }, { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/bookings/admin/:path*",
    "/api/bookings/:path*/confirm",
    "/api/bookings/:path*/reject"
  ],
};
