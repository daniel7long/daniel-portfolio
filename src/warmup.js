// Wakes sleeping backends (e.g. Render free tier) while a visitor is still
// browsing the portfolio, so the Live demo is ready when they click it.
// Each project can set `warmup: "https://its-backend.onrender.com"` in
// src/data/projects.js. Any GET request wakes the service; the response is
// ignored. A wrong or unreachable URL is harmless.

const COOLDOWN_MS = 10 * 60 * 1000; // don't re-ping the same URL within 10 min
const KEY = "warmup:";

function recentlyWarmed(url) {
  try {
    const t = Number(window.localStorage.getItem(KEY + url));
    return t && Date.now() - t < COOLDOWN_MS;
  } catch {
    return false;
  }
}

function markWarmed(url) {
  try {
    window.localStorage.setItem(KEY + url, String(Date.now()));
  } catch {
    /* storage unavailable: fine */
  }
}

export function warmUp(projects) {
  if (typeof window === "undefined" || !window.fetch) return;
  const urls = [...new Set(projects.map((p) => p.warmup).filter(Boolean))];
  urls.forEach((url) => {
    if (recentlyWarmed(url)) return;
    markWarmed(url);
    fetch(url, { mode: "no-cors", cache: "no-store", credentials: "omit" }).catch(() => {});
  });
}
