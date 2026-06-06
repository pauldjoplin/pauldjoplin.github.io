import { useEffect, useRef, useState } from "react";
import NavDrawer from "./NavDrawer.jsx";

const defaultLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

function DefaultLink({ href, children, className, onClick }) {
  return (
    <a href={href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}

function useHideOnScroll({ enabled = true, threshold = 6, topLock = 8 } = {}) {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    if (!enabled) {
      setHidden(false);
      return undefined;
    }

    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (y <= topLock) {
            setHidden(false);
            lastY.current = y;
            ticking.current = false;
            return;
          }

          const delta = y - lastY.current;
          if (Math.abs(delta) > threshold) {
            setHidden(delta > 0);
            lastY.current = y;
          }

          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [enabled, threshold, topLock]);

  return hidden;
}

export default function SiteHeader({
  brand = "Site Name",
  brandHref = "/",
  links = defaultLinks,
  drawerGroups = [],
  LinkComponent = DefaultLink,
  activePath = "",
  hideOnScroll = true,
  drawerWidth = 320,
  className = "",
  innerClassName = "",
  brandClassName = "",
  navClassName = "",
  linkClassName = "",
  menuButtonClassName = "",
  drawerProps = {},
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const hidden = useHideOnScroll({ enabled: hideOnScroll });

  return (
    <>
      <header
        className={[
          "site-header",
          hidden ? "site-header--hidden" : "site-header--visible",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={["site-header__inner", innerClassName].filter(Boolean).join(" ")}>
          <LinkComponent href={brandHref} className={["site-header__brand", brandClassName].filter(Boolean).join(" ")}>
            {brand}
          </LinkComponent>

          <nav className={["site-header__nav", navClassName].filter(Boolean).join(" ")} aria-label="Primary navigation">
            {links.map((link) => (
              <LinkComponent
                key={`${link.href}-${link.label}`}
                href={link.href}
                className={["site-header__link", linkClassName].filter(Boolean).join(" ")}
              >
                {link.label}
              </LinkComponent>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="site-navigation-drawer"
            onClick={() => setDrawerOpen(true)}
            className={["site-header__menu-button", menuButtonClassName].filter(Boolean).join(" ")}
          >
            <span aria-hidden="true">☰</span>
            <span className="site-header__menu-text">Menu</span>
          </button>
        </div>
      </header>

      <NavDrawer
        id="site-navigation-drawer"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={drawerWidth}
        homeLink={links[0]}
        groups={drawerGroups}
        LinkComponent={LinkComponent}
        activePath={activePath}
        {...drawerProps}
      />
    </>
  );
}
