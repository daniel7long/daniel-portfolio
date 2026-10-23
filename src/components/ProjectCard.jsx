import { initials } from "../utils.js";
import { projectHref, rememberHomeScroll } from "../router.js";

export default function ProjectCard({ project }) {
  const { id, thumbnail, type, title, abstract, stack, liveDemo } = project;

  return (
    <article className="card">
      <div className="card__thumb">
        {thumbnail ? (
          <img src={thumbnail} alt={`${title} thumbnail`} loading="lazy" />
        ) : (
          <div className="card__thumb-placeholder" aria-hidden="true">
            {initials(title)}
          </div>
        )}
      </div>

      <div className="card__body">
        <span className="card__type">{type}</span>
        <h3 className="card__title">{title}</h3>
        <p className="card__abstract">{abstract}</p>

        <ul className="card__stack" aria-label="Tech stack">
          {stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>

        <div className="card__footer">
          {liveDemo ? (
            <a
              className="btn btn--demo"
              href={liveDemo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="btn__dot" aria-hidden="true" />
              Live demo
              <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="btn btn--demo btn--disabled" aria-disabled="true">
              Live demo coming soon
            </span>
          )}

          <a
            className="btn btn--more"
            href={projectHref(id)}
            onClick={rememberHomeScroll}
            aria-label={`View more about ${title}`}
          >
            View more
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}
