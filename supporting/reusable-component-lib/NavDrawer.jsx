import { useEffect, useMemo, useRef, useState } from "react";

const defaultGroups = [
  {
    label: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
    ],
  },
  {
    label: "Support",
    items: [
      { label: "Contact", href: "/contact" },
      { label: "Help", href: "/help" },
    ],
  },
];

function DefaultLink({ href, children, className, onClick, "aria-current": ariaCurrent }) {
  return (
    <a href={href} className={className} onClick={onClick} aria-current={ariaCurrent}>
      {children}
    </a>
  );
}

function normalizePath(path = "") {
  return path.replace(/\/+$/, "") || "/";
}

export default function NavDrawer({
  id = "navigation-drawer",
  open,
  onClose,
  width = 320,
  title = "Menu",
  homeLink = { label: "Home", href: "/" },
  groups = defaultGroups,
  LinkComponent = DefaultLink,
  activePath = "",
  closeOnLinkClick = true,
  className = "",
  backdropClassName = "",
  panelClassName = "",
  headerClassName = "",
  closeButtonClassName = "",
  linkClassName = "",
  activeLinkClassName = "",
  groupButtonClassName = "",
}) {
  const panelRef = useRef(null);
  const [openGroups, setOpenGroups] = useState({});
  const currentPath = normalizePath(activePath || (typeof window !== "undefined" ? window.location.pathname : ""));

  const navigation = useMemo(
    () => ({
      home: homeLink,
      groups,
    }),
    [homeLink, groups]
  );

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    const onMouseDown = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose?.();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    const next = {};
    navigation.groups.forEach((group) => {
      next[group.label] = group.items.some((item) => normalizePath(item.href) === currentPath);
    });
    setOpenGroups((previous) => ({ ...previous, ...next }));
  }, [currentPath, navigation.groups]);

  const toggleGroup = (label) => {
    setOpenGroups((previous) => ({ ...previous, [label]: !previous[label] }));
  };

  const closeAfterNavigation = () => {
    if (closeOnLinkClick) onClose?.();
  };

  const renderLink = (item, extraClassName = "") => {
    const isActive = normalizePath(item.href) === currentPath;

    return (
      <LinkComponent
        key={`${item.href}-${item.label}`}
        href={item.href}
        className={[
          "nav-drawer__link",
          isActive ? "nav-drawer__link--active" : "",
          linkClassName,
          isActive ? activeLinkClassName : "",
          extraClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        onClick={closeAfterNavigation}
        aria-current={isActive ? "page" : undefined}
      >
        {item.label}
      </LinkComponent>
    );
  };

  return (
    <div className={["nav-drawer", open ? "nav-drawer--open" : "", className].filter(Boolean).join(" ")}>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={[
          "nav-drawer__backdrop",
          open ? "nav-drawer__backdrop--visible" : "nav-drawer__backdrop--hidden",
          backdropClassName,
        ]
          .filter(Boolean)
          .join(" ")}
      />

      <aside
        id={id}
        ref={panelRef}
        aria-label="Site navigation"
        aria-hidden={!open}
        className={[
          "nav-drawer__panel",
          open ? "nav-drawer__panel--open" : "nav-drawer__panel--closed",
          panelClassName,
        ]
          .filter(Boolean)
          .join(" ")}
        style={{ width }}
      >
        <div className={["nav-drawer__header", headerClassName].filter(Boolean).join(" ")}>
          <h2 className="nav-drawer__title">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className={["nav-drawer__close-button", closeButtonClassName].filter(Boolean).join(" ")}
          >
            ×
          </button>
        </div>

        <nav className="nav-drawer__nav" aria-label="Drawer navigation">
          {navigation.home ? renderLink(navigation.home, "nav-drawer__home-link") : null}

          {navigation.groups.map((group) => {
            const isOpen = !!openGroups[group.label];
            const panelId = `${id}-${group.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

            return (
              <section className="nav-drawer__group" key={group.label}>
                <button
                  type="button"
                  className={["nav-drawer__group-button", groupButtonClassName].filter(Boolean).join(" ")}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleGroup(group.label)}
                >
                  <span>{group.label}</span>
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>

                <div id={panelId} className="nav-drawer__group-panel" hidden={!isOpen}>
                  {group.items.map((item) => renderLink(item))}
                </div>
              </section>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
