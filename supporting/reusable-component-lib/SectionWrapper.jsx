export default function SectionWrapper({
  as: Component = "section",
  title,
  subtitle,
  children,
  className = "",
  headerClassName = "",
  titleClassName = "",
  subtitleClassName = "",
  contentClassName = "",
  id,
  labelledBy,
}) {
  const titleId = labelledBy || (id && title ? `${id}-title` : undefined);

  return (
    <Component id={id} aria-labelledby={titleId} className={["section-wrapper", className].filter(Boolean).join(" ")}>
      {title || subtitle ? (
        <header className={["section-wrapper__header", headerClassName].filter(Boolean).join(" ")}>
          {title ? (
            <h2 id={titleId} className={["section-wrapper__title", titleClassName].filter(Boolean).join(" ")}>
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className={["section-wrapper__subtitle", subtitleClassName].filter(Boolean).join(" ")}>
              {subtitle}
            </p>
          ) : null}
        </header>
      ) : null}

      <div className={["section-wrapper__content", contentClassName].filter(Boolean).join(" ")}>{children}</div>
    </Component>
  );
}
