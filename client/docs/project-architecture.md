# Project Architecture Guide

This document outlines the architecture for the project, It defines where different types of code should go, with a focus on scalability, clarity, and developer onboarding.

---

## 🗂 Directory Overview

```
src/
├── app/              # App shell and application logic
│   ├── app.ts
│   ├── pages/        # Route folders for layout and routing
│   ├── modules/      # Route-based business features (FSD-style modules)
│   ├── features/     # Functional, reusable action units
│   └── widgets/      # Composite UI blocks (layout or display sections)
├── core/             # App-wide framework: Router, Layout, Page abstractions
├── shared/           # Design system, icons, helpers, and utilities
│   ├── components/   # Dumb, reusable UI primitives (Button, Input, etc.)
│   ├── icon/         # Icon components or loaders
│   ├── lib/          # General-purpose logic (e.g., crypto, date)
│   └── util/         # Utility functions (e.g., event bus, fetch)
└── tests/            # Global or unit tests
```

---

## 📁 Folder Purpose

### `app/`

- The root of application logic and routing
- Hosts `pages/`, `modules/`, `features/`, and `widgets/`
- Keeps core business UI and logic grouped by application purpose

### `modules/`

- **Primary units of business logic**
- Each module maps to a route or set of related routes (e.g., `case-notes/`, `roster/`)
- Should be self-contained: API, hooks, UI, state
- Should **not import other modules**

### `features/`

- Small, focused pieces of **user-driven functionality**
- Encapsulate a single interaction or business flow (e.g., login, like button, search input)
- Include:

  - UI specific to the interaction (e.g., `LoginForm`, `SearchInput`)
  - Local state and hooks
  - API logic specific to that feature

- **Think of features as verbs** — what the user can _do_

### `widgets/`

- **Composite UI blocks** composed of multiple features/entities/shared UI
- Represent reusable **layout or display sections** (e.g., `Header`, `Sidebar`, `UserProfileCard`)
- May contain state or logic to coordinate features
- **Think of widgets as nouns** — parts of the page the user _sees_

### `shared/`

- Design system and utilities
- Dumb, stateless UI primitives (buttons, inputs, etc.)
- Icons, constants, utils, and generic helper libs

---

## 📚 Conventions

- Components in `shared/ui/` must be **dumb** (only use props, no internal state unless UI-specific)
- `app/features/` components encapsulate **user interactions** and should contain the logic/UI for that specific behavior
- `app/widgets/` represent **composite layout blocks** that assemble features and UI into cohesive sections
- Layouts should only be used if at least one page exists that resolves within or beneath that layout's directory.
- Don't treat a layout.ts as its own routable component.

---
