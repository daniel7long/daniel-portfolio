// Tiny Upstash Redis client using the REST API (no npm package needed).
// Files starting with "_" in /api are NOT exposed as endpoints by Vercel.
//
// The env vars are added automatically when you connect an Upstash Redis
// database to the project in Vercel (Storage / Marketplace).
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export async function pipeline(commands) {
  if (!URL_ || !TOKEN) {
    throw new Error("Redis env vars missing (KV_REST_API_URL / KV_REST_API_TOKEN)");
  }
  const res = await fetch(`${URL_}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`Redis request failed: ${res.status}`);
  const out = await res.json();
  return out.map((item) => {
    if (item.error) throw new Error(item.error);
    return item.result;
  });
}
