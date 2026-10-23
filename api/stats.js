// GET /api/stats — returns the recorded visits. Protected by a secret token:
// set STATS_TOKEN in Vercel (Settings → Environment Variables) and send it as
// "Authorization: Bearer <token>". public/stats.html does this for you.
import { timingSafeEqual } from "node:crypto";
import { pipeline } from "./_store.js";

const MAX_SESSIONS = 500;

function sameSecret(given, expected) {
  const a = Buffer.from(String(given));
  const b = Buffer.from(String(expected));
  return a.length === b.length && timingSafeEqual(a, b);
}

function toObject(flat) {
  const obj = {};
  for (let i = 0; i < flat.length; i += 2) obj[flat[i]] = flat[i + 1];
  return obj;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  const expected = process.env.STATS_TOKEN;
  const given = String(req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  if (!expected || !sameSecret(given, expected)) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const [ids] = await pipeline([["ZREVRANGE", "sessions", "0", String(MAX_SESSIONS - 1)]]);
    if (!ids.length) return res.status(200).json({ sessions: [] });

    const rows = await pipeline(ids.map((id) => ["HGETALL", `s:${id}`]));
    const sessions = [];
    rows.forEach((flat, i) => {
      if (!flat || !flat.length) return; // expired
      const data = toObject(flat);
      const sections = {};
      for (const [k, v] of Object.entries(data)) {
        if (k.startsWith("t:")) sections[k.slice(2)] = Math.round(Number(v) * 10) / 10;
      }
      sessions.push({
        id: ids[i],
        ip: data.ip || "",
        country: data.country || "",
        city: data.city || "",
        ua: data.ua || "",
        first: Number(data.first) || 0,
        last: Number(data.last) || 0,
        sections,
      });
    });

    return res.status(200).json({ sessions });
  } catch (err) {
    console.error("stats failed:", err.message);
    return res.status(500).json({ error: "server error" });
  }
}
