import { useState } from "react";
import { about } from "../data/about.js";

function Portrait() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="portrait">
      <div className="portrait__ring portrait__ring--outer" aria-hidden="true" />
      <div className="portrait__ring" aria-hidden="true" />

      <div className="portrait__photo">
        {about.photo && !failed ? (
          <img src={about.photo} alt={about.photoAlt} onError={() => setFailed(true)} />
        ) : (
          <div className="portrait__placeholder" aria-hidden="true">
            DL
          </div>
        )}
      </div>

      {about.tags.map((tag, i) => (
        <div className={`portrait__tag portrait__tag--${i + 1}`} key={tag.title}>
          <strong>{tag.title}</strong>
          <span>{tag.text}</span>
        </div>
      ))}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section section--about">
      <div className="container about">
        <div className="about__media">
          <Portrait />
        </div>

        <div className="about__content">
          <span className="eyebrow eyebrow--line">{about.eyebrow}</span>
          <h2 className="about__title">
            {about.headlineStart} <span className="gradient-text">{about.headlineHighlight}</span>
          </h2>

          <div className="about__copy">
            {about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="about__cards">
            {about.cards.map((c) => (
              <div className="info-card" key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </div>
            ))}
          </div>

          <ul className="about__pills">
            {about.pills.map((pill) => (
              <li key={pill}>{pill}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
