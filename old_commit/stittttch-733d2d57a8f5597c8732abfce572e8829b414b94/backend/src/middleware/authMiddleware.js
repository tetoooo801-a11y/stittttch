import jwt from "jsonwebtoken";
import { supabase } from "../config/supabase.js";
import { env } from "../config/env.js";
import { camelize } from "../utils/camelize.js";

export async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const decoded = jwt.verify(token, env.jwtSecret);
    const { data: user, error } = await supabase
      .from("profiles")
      .select("id, name, email")
      .eq("id", decoded.id)
      .maybeSingle();

    if (error || !user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = camelize(user);
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

export async function optionalAuth(req, _res, next) {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if (token) {
      const decoded = jwt.verify(token, env.jwtSecret);
      const { data: user } = await supabase
        .from("profiles")
        .select("id, name, email")
        .eq("id", decoded.id)
        .maybeSingle();
      if (user) req.user = camelize(user);
    }
  } catch {
    // ignore invalid token
  }
  next();
}
