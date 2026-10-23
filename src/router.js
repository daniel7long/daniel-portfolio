// Tiny hash-based router (no extra dependency, works on Vercel with no config).
//   #/project/langogo  -> project details page
//   anything else      -> home page (and "#work", "#about"... scroll to sections)
import { useEffect, useState } from "react";

const PREFIX = "#/project/";

export function projectHref(id) {
  return PREFIX + encodeURIComponent(id);
}

function parseHash(hash) {
  if (hash.startsWith(PREFIX)) {
    return { name: "project", id: decodeURIComponent(hash.slice(PREFIX.length)) };
  }
  return { name: "home", id: null };
}

export function useRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parseHash(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

// Remember where the visitor was on the home page, so "Back" returns them there.
let savedScroll = 0;

export function rememberHomeScroll() {
  if (!window.location.hash.startsWith(PREFIX)) {
    savedScroll = window.scrollY;
  }
}

export function getSavedScroll() {
  return savedScroll;
}
