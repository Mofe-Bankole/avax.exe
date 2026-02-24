import { Request, Response, NextFunction } from "express";
import { config } from "../config/config";


const WINDOW_MS =
  Number(config.window_ms) ||
  (config.NODE.enviroment === "production" ? 60_000 : 10_000);
const MAX_REQUESTS =
  Number(process.env.RATE_LIMIT_MAX_REQUESTS) ||
  (config.NODE.enviroment === "production" ? 60 : 120);


const buckets = new Map<string, { count: number; windowStart: number }>();

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const ip = req.ip as any;
  const now = Date.now();
  const bucket = buckets.get(ip) ?? { count: 0, windowStart: now };

  if (now - bucket.windowStart > WINDOW_MS) {
    bucket.count = 0;
    bucket.windowStart = now;
  }

  bucket.count += 1;
  buckets.set(ip, bucket);

  if (bucket.count > MAX_REQUESTS) {
    return res
      .status(429)
      .json({ status: "error", message: "Too many requests, slow down." });
  }

  next();
}
