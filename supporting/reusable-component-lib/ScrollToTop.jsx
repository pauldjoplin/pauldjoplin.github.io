import { useEffect } from "react";

export default function ScrollToTop({
  pathname = typeof window !== "undefined" ? window.location.pathname : "",
  hash = typeof window !== "undefined" ? window.location.hash : "",
  behavior = "auto",
  hashBehavior = "smooth",
  block = "start",
}) {
  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1));

      if (target) {
        window.setTimeout(() => target.scrollIntoView({ behavior: hashBehavior, block }), 0);
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, hash, behavior, hashBehavior, block]);

  return null;
}
