import { useEffect } from "react";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import ProjectDetail from "./components/ProjectDetail.jsx";
import { projects } from "./data/projects.js";
import { site } from "./data/site.js";
import { useRoute, getSavedScroll } from "./router.js";
import { useTracking } from "./tracking.js";

export default function App() {
  const route = useRoute();
  useTracking(route);

  // We restore scroll positions ourselves (see below).
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // Tab title
  useEffect(() => {
    const project = route.name === "project" && projects.find((p) => p.id === route.id);
    document.title = project
      ? `${project.title} — ${site.name}`
      : `${site.name} — ${site.title} & UX Designer`;
  }, [route.name, route.id]);

  // Scroll handling when switching between the home page and a project page.
  useEffect(() => {
    const instant = { behavior: "instant" };
    if (route.name === "project") {
      window.scrollTo({ top: 0, ...instant });
      return;
    }
    const sectionId = window.location.hash.slice(1);
    const target = sectionId ? document.getElementById(sectionId) : null;
    if (target) {
      target.scrollIntoView(instant);
    } else {
      window.scrollTo({ top: getSavedScroll(), ...instant });
    }
  }, [route.name, route.id]);

  return (
    <>
      <Navbar route={route} />
      <main>
        {route.name === "project" ? (
          <ProjectDetail id={route.id} />
        ) : (
          <>
            <Hero />
            <Work />
            <About />
          </>
        )}
      </main>
      <Contact />
    </>
  );
}
