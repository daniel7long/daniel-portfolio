import { site } from "../data/site.js";
import { projects } from "../data/projects.js";
import ProjectCard from "./ProjectCard.jsx";

export default function Work() {
  const { work } = site;
  return (
    <section id="work" className="section">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow eyebrow--line">{work.eyebrow}</span>
          <h2 className="section__title">{work.title}</h2>
          <p className="section__intro">{work.intro}</p>
        </div>

        <div className="grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
