import { projects } from "../data/projects.js";
import { initials, pad } from "../utils.js";
import ProjectCard from "./ProjectCard.jsx";

function Row({ label, children }) {
  return (
    <div className="pd-row">
      <h2 className="pd-row__label">{label}</h2>
      <div className="pd-row__body">{children}</div>
    </div>
  );
}

function DashList({ items }) {
  return (
    <ul className="pd-list">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function Chips({ items }) {
  return (
    <ul className="pd-chips">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function NotFound() {
  return (
    <section className="section">
      <div className="container pd">
        <h1 className="pd__title">Project not found</h1>
        <p className="pd__summary">That project doesn't exist (or was renamed).</p>
        <p style={{ marginTop: 24 }}>
          <a className="btn btn--primary" href="#work">
            Back to projects
          </a>
        </p>
      </div>
    </section>
  );
}

export default function ProjectDetail({ id }) {
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return <NotFound />;

  const project = projects[index];
  const {
    thumbnail,
    type,
    title,
    abstract,
    stack,
    liveDemo,
    role,
    status,
    overview,
    problem,
    built,
    features,
    implementation,
    outcome,
    repo,
  } = project;

  // Up to two other projects, starting with the one after this one.
  const related = [...projects.slice(index + 1), ...projects.slice(0, index)].slice(0, 2);

  return (
    <article className="pd-page">
      <div className="container pd">
        <nav className="pd__crumbs" aria-label="Breadcrumb">
          <a href="#top">Home</a>
          <span aria-hidden="true">/</span>
          <a href="#work">Projects</a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>

        <span className="pd__eyebrow">
          {pad(index + 1)} <i aria-hidden="true" /> {type}
        </span>
        <h1 className="pd__title">{title}</h1>
        <p className="pd__summary">{abstract}</p>

        <dl className="pd-meta">
          {role && (
            <div>
              <dt>Role</dt>
              <dd>{role}</dd>
            </div>
          )}
          <div>
            <dt>Type</dt>
            <dd>{type}</dd>
          </div>
          {status && (
            <div>
              <dt>Status</dt>
              <dd>{status}</dd>
            </div>
          )}
          <div>
            <dt>Availability</dt>
            <dd>
              {liveDemo ? (
                <a href={liveDemo} target="_blank" rel="noopener noreferrer">
                  Live demo ↗
                </a>
              ) : (
                "No public link listed"
              )}
            </dd>
          </div>
        </dl>

        <div className="pd-hero">
          <div className="pd-hero__text">
            <div className="pd-hero__top">
              <span className="pd-hero__count">
                {pad(index + 1)} / {pad(projects.length)}
              </span>
              <span className="pd-hero__badge">{type}</span>
            </div>
            <p className="pd-hero__name">{title}</p>
            <p className="pd-hero__abstract">{abstract}</p>
          </div>
          <div className="pd-hero__media">
            {thumbnail ? (
              <img src={thumbnail} alt={`${title} thumbnail`} />
            ) : (
              <div className="pd-hero__art" aria-hidden="true">
                <span className="pd-hero__orbit pd-hero__orbit--1" />
                <span className="pd-hero__orbit pd-hero__orbit--2" />
                <span className="pd-hero__orbit pd-hero__orbit--3" />
                <span className="pd-hero__core">{initials(title)}</span>
              </div>
            )}
          </div>
        </div>

        <div className="pd-rows">
          {overview && (
            <Row label="Overview">
              <p>{overview}</p>
            </Row>
          )}
          {role && (
            <Row label="My role">
              <p>{role}</p>
            </Row>
          )}
          {problem && (
            <Row label="The problem">
              <p>{problem}</p>
            </Row>
          )}
          {built && built.length > 0 && (
            <Row label="What I built">
              <DashList items={built} />
            </Row>
          )}
          {features && features.length > 0 && (
            <Row label="Key features">
              <Chips items={features} />
            </Row>
          )}
          {stack && stack.length > 0 && (
            <Row label="Technology stack">
              <Chips items={stack} />
            </Row>
          )}
          {implementation && implementation.length > 0 && (
            <Row label="Implementation details">
              <DashList items={implementation} />
            </Row>
          )}
          {outcome && (
            <Row label="Outcome">
              <p>{outcome}</p>
            </Row>
          )}
          <Row label="Links">
            <ul className="pd-links">
              {liveDemo && (
                <li>
                  <a href={liveDemo} target="_blank" rel="noopener noreferrer">
                    Live demo ↗
                  </a>
                </li>
              )}
              {repo && (
                <li>
                  <a href={repo} target="_blank" rel="noopener noreferrer">
                    Source code ↗
                  </a>
                </li>
              )}
              {!liveDemo && !repo && (
                <li>
                  No public demo or repository is listed for this project. If you'd like to know
                  more about it, <a href="#contact">get in touch</a>.
                </li>
              )}
            </ul>
          </Row>
        </div>

        {related.length > 0 && (
          <section className="pd-related" aria-labelledby="related-title">
            <div className="pd-related__head">
              <h2 id="related-title">Related projects</h2>
              <span>Selected works</span>
            </div>
            <div className="grid">
              {related.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
