import jwt from "jsonwebtoken";

const b64Jwt = "OGQ3NjhkN2YtNGI2NS00OWJkLTg3NTgtZDJhY2JlMjQ2MmIz";
function decode(b64: string) {
  return Buffer.from(b64, "base64").toString("utf-8");
}

const JWT_SECRET = process.env.JWT_SECRET || decode(b64Jwt);
const JWT_EXPIRES_IN = "7d";

export function signToken(userId: string, role: string = "customer") {
  return jwt.sign({ id: userId, role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
