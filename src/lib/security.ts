import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

const attempts = new Map<string, { count: number; resetAt: number }>();
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_MAX_ATTEMPTS = 10;

export function getClientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

export function checkLoginRateLimit(key: string) {
  const now = Date.now();
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + LOGIN_WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  current.count += 1;
  if (current.count > LOGIN_MAX_ATTEMPTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  return { allowed: true, retryAfter: 0 };
}

export async function requireAdmin() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return false;

  try {
    return verifyToken(token).role === "admin";
  } catch {
    return false;
  }
}

export function validateImageFile(file: File | null) {
  const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
  const maxBytes = 5 * 1024 * 1024;

  if (!file) return "No file uploaded.";
  if (!allowedTypes.has(file.type)) return "Only JPEG, PNG, WebP, and GIF images are allowed.";
  if (file.size > maxBytes) return "Images must be 5 MB or smaller.";

  return null;
}
