import { site } from "../data/site.js";

export default function Hero() {
  const { hero } = site;
  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <h1 className="hero__title">
          {hero.taglineStart} <span className="gradient-text">{hero.taglineHighlight}</span>
        </h1>
        <p className="hero__subline">{hero.subline}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href={hero.primaryCta.href}>
            {hero.primaryCta.label}
          </a>
          <a className="btn btn--ghost" href={hero.secondaryCta.href}>
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
