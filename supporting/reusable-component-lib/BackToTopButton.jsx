import { useEffect, useState } from "react";

export default function BackToTopButton({
  threshold = 300,
  behavior = "smooth",
  label = "Back to top",
  children,
  className = "",
  visibleClassName = "",
  hiddenClassName = "",
  iconClassName = "",
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      setVisible(window.scrollY > threshold);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateVisibility);
        ticking = true;
      }
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label={label}
      className={[
        "back-to-top-button",
        visible ? "back-to-top-button--visible" : "back-to-top-button--hidden",
        visible ? visibleClassName : hiddenClassName,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      hidden={!visible}
    >
      {children || (
        <span className={["back-to-top-button__icon", iconClassName].filter(Boolean).join(" ")} aria-hidden="true">
          ↑
        </span>
      )}
    </button>
  );
}
