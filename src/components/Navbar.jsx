import { useEffect, useState } from "react";
import { site } from "../data/site.js";
import "../nav.css";

// Home is added here automatically, so site.js does not need to change.
const HOME_LINK = { label: "Home", href: "#top" };
const links = site.navLinks.some((l) => l.href === HOME_LINK.href)
  ? site.navLinks
  : [HOME_LINK, ...site.navLinks];

const NAV_HEIGHT = 68;

// Works out which nav item is "current":
//  - on a project details page -> Work
//  - on the home page -> the section that is currently on screen
function useActiveId(route) {
  const [active, setActive] = useState("top");

  useEffect(() => {
    if (route.name === "project") {
      setActive("work");
      return undefined;
    }

    const ids = links.map((l) => l.href.slice(1));
    let ticking = false;

    const update = () => {
      ticking = false;
      const line = NAV_HEIGHT + window.innerHeight * 0.3;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(atBottom ? ids[ids.length - 1] : current);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [route.name]);

  return active;
}

function Logo() {
  const [failed, setFailed] = useState(false);

  if (site.logo && !failed) {
    return (
      <img
        className="navbar__logo"
        src={site.logo}
        alt=""
        width="40"
        height="40"
        onError={() => setFailed(true)}
      />
    );
  }
  // Fallback badge, shown until you add your own icon file.
  return (
    <span className="navbar__logo navbar__logo--badge" aria-hidden="true">
      DL
    </span>
  );
}

export default function Navbar({ route }) {
  const active = useActiveId(route);

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <a href="#top" className="navbar__brand" aria-label={`${site.name}, ${site.title} — home`}>
          <Logo />
          <span className="navbar__id">
            <span className="navbar__name">{site.name}</span>
            <span className="navbar__role">{site.title}</span>
          </span>
        </a>
        <nav aria-label="Primary">
          <ul className="navbar__links">
            {links.map((link) => {
              const isActive = link.href.slice(1) === active;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={isActive ? "is-active" : undefined}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
