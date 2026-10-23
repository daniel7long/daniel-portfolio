// POST /api/track  — receives "this visitor spent N seconds in section X" pings
// from src/tracking.js and stores them, together with the visitor's IP.
import { pipeline } from "./_store.js";

// ---- Settings -------------------------------------------------------------
const STORE_FULL_IP = true; // false = store only a masked IP (e.g. 203.0.113.0)
const KEEP_DAYS = 90; // visits older than this are deleted automatically
// ---------------------------------------------------------------------------

const TTL = KEEP_DAYS * 24 * 60 * 60;
const SECTION_NAME = /^[a-z0-9:_-]{1,40}$/i;
const SESSION_ID = /^[a-zA-Z0-9-]{8,64}$/;
const BOTS = /bot|crawl|spider|preview|headless|lighthouse|monitor/i;

function clientIp(req) {
  const forwarded = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const ip = forwarded || String(req.headers["x-real-ip"] || "") || req.socket?.remoteAddress || "";
  return ip.slice(0, 64);
}

function maskIp(ip) {
  if (STORE_FULL_IP) return ip;
  if (ip.includes(".")) return ip.replace(/\.\d+$/, ".0");
  return ip.split(":").slice(0, 3).join(":") + "::";
}

function safeDecode(value) {
  try {
    return decodeURIComponent(String(value || ""));
  } catch {
    return "";
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end();
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).end();
    }
  }
  const { sid, sections } = body || {};
  if (typeof sid !== "string" || !SESSION_ID.test(sid)) return res.status(400).end();
  if (!sections || typeof sections !== "object" || Array.isArray(sections)) {
    return res.status(400).end();
  }

  const userAgent = String(req.headers["user-agent"] || "").slice(0, 200);
  if (BOTS.test(userAgent)) return res.status(204).end();

  const now = Date.now();
  const key = `s:${sid}`;
  const commands = [
    ["HSETNX", key, "first", String(now)],
    [
      "HSET",
      key,
      "ip", maskIp(clientIp(req)),
      "country", String(req.headers["x-vercel-ip-country"] || "").slice(0, 8),
      "city", safeDecode(req.headers["x-vercel-ip-city"]).slice(0, 80),
      "ua", userAgent,
      "last", String(now),
    ],
  ];

  let accepted = 0;
  for (const [name, rawSeconds] of Object.entries(sections)) {
    if (accepted >= 20) break;
    if (!SECTION_NAME.test(name)) continue;
    const seconds = Math.min(Math.max(Number(rawSeconds) || 0, 0), 120);
    if (!seconds) continue;
    commands.push(["HINCRBYFLOAT", key, `t:${name}`, String(seconds)]);
    accepted += 1;
  }

  commands.push(
    ["EXPIRE", key, String(TTL)],
    ["ZADD", "sessions", String(now), sid],
    ["ZREMRANGEBYSCORE", "sessions", "0", String(now - TTL * 1000)]
  );

  try {
    await pipeline(commands);
    return res.status(204).end();
  } catch (err) {
    console.error("track failed:", err.message);
    return res.status(500).end();
  }
}
