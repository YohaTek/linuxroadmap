# Linux Roadmap (Interactive)

An interactive, learner-friendly website covering the Linux roadmap topics. Each section is a separate page with examples, checklists, and a quick quiz. Progress is tracked locally in your browser.

## Features
- Single Page App with hash routing (`#/1`..`#/14`)
- Sidebar navigation with per-topic progress badges
- Copy-to-clipboard code blocks
- Checklists and lightweight quizzes
- Local progress tracking via `localStorage`
- Client-side search filter for topics

## Getting Started
1. Open `index.html` directly in your browser (no build needed).
2. Use the left sidebar to navigate topics. Your progress saves automatically.
3. Click "Reset Progress" in the sidebar to clear saved progress.

## Structure
- `index.html` — App shell, sidebar, topbar, content area
- `assets/css/styles.css` — Styles
- `assets/js/components.js` — UI widgets (code blocks, checklists, quiz)
- `assets/js/router.js` — Routes, content loading, progress logic
- `assets/js/app.js` — Bootstraps the app
- `pages/*.html` — Content pages (1–14)

## Notes
- All commands assume a typical Linux environment and may require `sudo` or distro-specific tools.
- This site intentionally uses no build tooling; everything is vanilla HTML/CSS/JS.


