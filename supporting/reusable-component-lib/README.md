# Reusable Component Library

This repository contains standalone, generic React components adapted from a capstone enhancement project. They do not depend on the original website's routes, branding, colors, copy, or CSS.

## Components

- `BackToTopButton.jsx`: A floating scroll-to-top button that appears after a configurable scroll threshold.
- `SiteHeader.jsx`: A generic header with brand text, navigation links, hide-on-scroll behavior, and a connected drawer trigger.
- `SiteFooter.jsx`: A generic footer with brand, description, optional location, links, copyright, and extra content support.
- `NavDrawer.jsx`: A reusable slide-out navigation drawer with grouped links, Escape/outside-click close behavior, body scroll locking, and active-link support.
- `ScrollToTop.jsx`: A route/navigation helper that scrolls to hash targets or resets the viewport to the top.
- `SectionWrapper.jsx`: A flexible section wrapper with optional title, subtitle, semantic element selection, and className hooks.

## Importing Later

Import individual components:

```jsx
import BackToTopButton from "./BackToTopButton.jsx";
import SiteHeader from "./SiteHeader.jsx";
```

Or import from the folder index:

```jsx
import {
  BackToTopButton,
  SiteHeader,
  SiteFooter,
  NavDrawer,
  ScrollToTop,
  SectionWrapper,
} from ".";
```

Inside another project, adjust the path to wherever this library folder lives:

```jsx
import { BackToTopButton } from "./reusable-component-lib";
```

## Notes

- These components use plain `<a>` links by default.
- To use a router link component, pass a `LinkComponent` prop that accepts `href`, `className`, `onClick`, and `children`.
- Styling is intentionally minimal. Components expose stable class hooks such as `site-header`, `nav-drawer__link`, and `section-wrapper__content`.
- No new dependencies are required.
