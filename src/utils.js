export function initials(title) {
  return title
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export function pad(n) {
  return String(n).padStart(2, "0");
}
