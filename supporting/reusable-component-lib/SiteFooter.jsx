const defaultLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Contact", href: "/contact" },
];

function DefaultLink({ href, children, className }) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

export default function SiteFooter({
  brand = "Site Name",
  description = "A concise description can go here.",
  location = "",
  links = defaultLinks,
  LinkComponent = DefaultLink,
  copyrightName = brand,
  showYear = true,
  children,
  className = "",
  innerClassName = "",
  brandClassName = "",
  linkClassName = "",
}) {
  const year = new Date().getFullYear();

  return (
    <footer className={["site-footer", className].filter(Boolean).join(" ")}>
      <div className={["site-footer__inner", innerClassName].filter(Boolean).join(" ")}>
        <div className="site-footer__summary">
          <h2 className={["site-footer__brand", brandClassName].filter(Boolean).join(" ")}>{brand}</h2>
          {description ? <p className="site-footer__description">{description}</p> : null}
          {location ? <p className="site-footer__location">{location}</p> : null}
        </div>

        {links.length ? (
          <nav className="site-footer__nav" aria-label="Footer navigation">
            {links.map((link) => (
              <LinkComponent
                key={`${link.href}-${link.label}`}
                href={link.href}
                className={["site-footer__link", linkClassName].filter(Boolean).join(" ")}
              >
                {link.label}
              </LinkComponent>
            ))}
          </nav>
        ) : null}

        {children ? <div className="site-footer__extra">{children}</div> : null}

        <p className="site-footer__copyright">
          © {showYear ? `${year} ` : ""}
          {copyrightName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
