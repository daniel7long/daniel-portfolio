// Visitor tracking: counts how many seconds each visitor spends in each section
// (hero / work / about / contact / each project page) and sends it to /api/track.
//
// Time only counts while the tab is visible AND the visitor was active in the
// last minute (scroll, mouse, key, touch), so a tab left open overnight doesn't
// show up as hours of reading.
import { useEffect, useRef } from "react";

// ---- Settings -------------------------------------------------------------
const ENDPOINT = "/api/track";
const RESPECT_DNT = true; // skip visitors whose browser sends "Do Not Track"
const IDLE_AFTER_MS = 60_000;
const FLUSH_MS = 15_000;
const TICK_MS = 1_000;
// element id on the page -> name shown in the stats dashboard
const SECTIONS = [
  ["top", "hero"],
  ["work", "work"],
  ["about", "about"],
  ["contact", "contact"],
];
// ---------------------------------------------------------------------------

function trackingAllowed() {
  try {
    // Visit  https://your-site/?notrack  once per browser to exclude yourself.
    if (new URLSearchParams(window.location.search).has("notrack")) {
      localStorage.setItem("noTrack", "1");
    }
    if (localStorage.getItem("noTrack") === "1") return false;
  } catch {
    /* storage blocked: carry on */
  }

  if (RESPECT_DNT && (navigator.doNotTrack === "1" || window.doNotTrack === "1")) return false;

  const isLocal = ["localhost", "127.0.0.1", "[::1]"].includes(window.location.hostname);
  if (isLocal) {
    // `npm run dev` has no /api, so tracking is off locally unless you opt in:
    //   localStorage.setItem("trackDebug", "1")
    try {
      return localStorage.getItem("trackDebug") === "1";
    } catch {
      return false;
    }
  }
  return true;
}

function getSessionId() {
  const make = () =>
    (window.crypto && crypto.randomUUID && crypto.randomUUID()) ||
    Math.random().toString(36).slice(2) + Date.now().toString(36);
  try {
    let id = sessionStorage.getItem("visitSid");
    if (!id) {
      id = make();
      sessionStorage.setItem("visitSid", id);
    }
    return id;
  } catch {
    return make();
  }
}

function currentSection(route) {
  if (route.name === "project") {
    return `project:${route.id}`.toLowerCase().replace(/[^a-z0-9:_-]/g, "-").slice(0, 40);
  }
  const atBottom =
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
  if (atBottom) return "contact";

  const middle = window.innerHeight / 2;
  for (const [id, name] of SECTIONS) {
    const el = document.getElementById(id);
    if (!el) continue;
    const rect = el.getBoundingClientRect();
    if (rect.top <= middle && rect.bottom > middle) return name;
  }
  return null;
}

export function useTracking(route) {
  const routeRef = useRef(route);
  routeRef.current = route;

  useEffect(() => {
    if (!trackingAllowed()) return undefined;

    const sid = getSessionId();
    let buckets = {};
    let lastInput = Date.now();

    const send = (sections) => {
      const body = JSON.stringify({ sid, sections });
      try {
        if (navigator.sendBeacon) {
          const queued = navigator.sendBeacon(
            ENDPOINT,
            new Blob([body], { type: "application/json" })
          );
          if (queued) return;
        }
      } catch {
        /* fall through to fetch */
      }
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        keepalive: true,
      }).catch(() => {});
    };

    const flush = () => {
      if (Object.keys(buckets).length === 0) return;
      const sections = buckets;
      buckets = {};
      send(sections);
    };

    const markActive = () => {
      lastInput = Date.now();
    };
    const inputEvents = ["scroll", "mousemove", "keydown", "touchstart", "click"];
    inputEvents.forEach((e) => window.addEventListener(e, markActive, { passive: true }));

    const tick = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      if (Date.now() - lastInput > IDLE_AFTER_MS) return;
      const section = currentSection(routeRef.current);
      if (section) buckets[section] = (buckets[section] || 0) + TICK_MS / 1000;
    }, TICK_MS);

    const flushTimer = window.setInterval(flush, FLUSH_MS);
    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);

    send({}); // registers the visit (IP, time) even if they leave within seconds

    return () => {
      window.clearInterval(tick);
      window.clearInterval(flushTimer);
      inputEvents.forEach((e) => window.removeEventListener(e, markActive));
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, []);
}
