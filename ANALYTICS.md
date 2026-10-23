# Visitor analytics — setup

What you get: for every visit, the visitor's IP address, rough location (city/country from Vercel),
and the seconds spent in Hero / Work / About / Contact and each project details page.
View it at `https://daniel7long.com/stats.html` (needs your secret token).

## One-time setup in Vercel
1. Project → **Storage** (or Marketplace) → add **Upstash Redis** (free plan) → connect it to this project.
   This adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically.
2. Project → **Settings → Environment Variables** → add `STATS_TOKEN` = a long random password you choose
   (Production). 
3. **Redeploy** (Deployments → … → Redeploy) so the new variables are picked up.

## Using it
- Open `/stats.html`, enter your token. Click a row to see each individual visit.
- Exclude yourself: open `https://daniel7long.com/?notrack` once in each browser/device you use.
- Local `npm run dev` does not run `/api`, so tracking is off on localhost.

## Settings
- `api/track.js`: `STORE_FULL_IP` (false = store masked IPs), `KEEP_DAYS` (auto-delete after N days).
- `src/tracking.js`: `RESPECT_DNT`, `IDLE_AFTER_MS`, section names.

## Privacy
IP addresses are personal data in many places (e.g. the EU/UK). Consider adding a short notice
such as "This site records visits (IP address and time spent per section) to understand how it is used."
