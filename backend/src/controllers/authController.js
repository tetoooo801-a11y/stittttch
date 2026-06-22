import bcrypt from "bcryptjs";
import { supabase } from "../config/supabase.js";
import { signToken, setTokenCookie, clearTokenCookie } from "../utils/jwt.js";
import { camelize } from "../utils/camelize.js";

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", normalizedEmail)
      .maybeSingle();

    if (existing) {
      return res.status(409).json({ success: false, message: "email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const { data: user, error } = await supabase
      .from("profiles")
      .insert({ name, email: normalizedEmail, password: hashedPassword })
      .select("id, name, email, created_at")
      .single();

    if (error) throw error;

    const token = signToken(user.id);
    setTokenCookie(res, token);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: { user: camelize(user) },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    const { data: user } = await supabase
      .from("profiles")
      .select("id, name, email, password, created_at")
      .eq("email", email.toLowerCase())
      .maybeSingle();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = signToken(user.id);
    setTokenCookie(res, token);

    delete user.password;
    res.json({
      success: true,
      message: "Login successful",
      data: { user: camelize(user) },
    });
  } catch (error) {
    next(error);
  }
}

export function logout(_req, res) {
  clearTokenCookie(res);
  res.json({ success: true, message: "Logged out successfully" });
}

export async function getMe(req, res) {
  res.json({ success: true, data: { user: req.user } });
}
