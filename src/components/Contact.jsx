import { site } from "../data/site.js";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false">
      <rect width="24" height="24" rx="4" fill="#0a7bbd" />
      <path
        fill="#fff"
        d="M6.94 9.5H4.2V19h2.74V9.5ZM5.57 5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2ZM19.8 13.8c0-2.5-1.35-4.5-3.6-4.5-1.1 0-1.9.55-2.3 1.2V9.5h-2.63V19H13.9v-5.2c0-1.4.65-2.2 1.7-2.2 1 0 1.5.7 1.5 2.2V19h2.7v-5.2Z"
      />
    </svg>
  );
}

export default function Contact() {
  const { contact, name } = site;
  return (
    <footer id="contact" className="contact">
      <div className="container">
        <div className="contact__row">
          <h2 className="contact__title">{contact.title}</h2>

          <a className="contact__email" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>

          <address className="contact__address">
            {contact.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </address>
        </div>

        <div className="contact__row contact__row--bottom">
          <a
            className="contact__linkedin"
            href={contact.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedInIcon />
            <span>{contact.linkedin.label}</span>
          </a>

          <p className="contact__copy">
            © {new Date().getFullYear()} {name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
