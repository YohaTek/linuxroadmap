# Linux Roadmap

An interactive, single-page learning roadmap for Linux. Each topic is a
self-contained page with worked command examples, checklists, a quiz, and
copy-to-clipboard snippets. Progress is tracked in the browser and can be
synced to the cloud for signed-in users.

No build step, no framework: plain HTML, CSS, and JavaScript.

## Features

- Hash-based client-side router (`#/0` … `#/14`, plus `#/99` and `#/100`)
- Sidebar navigation grouped into modules, with per-topic progress badges
- Code blocks with copy-to-clipboard, checklists, and per-topic quizzes
- Progress saved per topic in `localStorage`
- Optional Supabase sign-in / sign-up to sync progress across devices
- Content search over topics and commands
- Built-in mock terminal pane for practising commands

## Requirements

- A modern browser.
- A local HTTP server for development. The router fetches the files in
  `pages/`, which browsers block on `file://` URLs.
- Optional: a Supabase project if you want cloud accounts and progress sync.

## Running locally

```sh
# from the repository root
python3 -m http.server 5500
# then open http://localhost:5500
```

Any static server works (`npx serve`, `php -S localhost:5500`, …). Opening
`index.html` directly from disk shows a warning page instead of the lessons.

## Cloud accounts (optional)

`assets/js/db.js` holds the Supabase project URL and *publishable* (anon) key.
With those set, the site exposes sign-in and registration; without them every
user stays on the local-storage fallback path.

The client expects two tables:

| Table           | Purpose                                              |
| --------------- | ---------------------------------------------------- |
| `user_progress` | one row per `user_id` + `module_key` with quiz state |
| `profiles`      | `id`, `full_name`, `username`, `updated_at`          |

Because the anon key ships in the client, both tables must be protected with
row-level security policies that scope rows to `auth.uid()`.

## Project structure

```text
index.html              App shell: sidebar, topbar, terminal pane, auth modal
assets/css/styles.css   All styling (GNOME-inspired dark theme)
assets/js/app.js        Bootstrap: auth wiring, sidebar, terminal, events
assets/js/db.js         Supabase client wrapper with localStorage fallback
assets/js/router.js     Route table, content loading, search, progress
assets/js/components.js UI widgets: code blocks, checklists, quizzes, gallery
assets/js/content.js    Quiz question bank
assets/js/slides.js     Splits lesson content into paged slides for the router
assets/images/          Theme artwork (hero, landing background)
pages/                  Lesson content, one HTML fragment per route
images/                 Imported raw screenshots (see Known gaps)
scripts/                One-off maintenance utilities (see below)
```

### Lesson routes

| Route | Page                             | Module                      |
| ----- | -------------------------------- | --------------------------- |
| `#/1`  | Navigation Basics               | The Essentials              |
| `#/2`  | Super User & File Operations    | The Essentials              |
| `#/3`  | Text Processing & Streams       | The Essentials              |
| `#/4`  | System Review & Monitoring      | System Diagnostics          |
| `#/5`  | Process Management              | System Diagnostics          |
| `#/6`  | User & Group Management         | System Diagnostics          |
| `#/7`  | Service Management              | Core Infrastructure         |
| `#/8`  | Package Management              | Core Infrastructure         |
| `#/9`  | Disks & Filesystems             | Core Infrastructure         |
| `#/10` | Boot & Logs                     | Advanced Engineering        |
| `#/11` | Networking                      | Advanced Engineering        |
| `#/12` | Shell Scripting                 | Advanced Engineering        |
| `#/13` | Containerization                | Advanced Engineering        |
| `#/14` | Continue Learning               | Advanced Engineering        |
| `#/0`  | Welcome (landing)               | Welcome                     |
| `#/99` | Sponsor Us                      | Support Us                  |
| `#/100`| Register                        | Account                     |

## Maintenance scripts

These are developer utilities kept for reference, not part of the shipped site:

- `scripts/organize-images.js` — regenerates `scripts/image-mapping.json` from
  the files in `images/` (`node scripts/organize-images.js`).
- `scripts/categorize-images.html` — small local UI for editing that mapping;
  open it through the same local server.
- `scripts/remove-grid.py` — one-off Codemod that unwrapped `<div class="grid">`
  blocks in `pages/*.html`. Kept for provenance only; the migration is applied.

## Known gaps

- Route `#/99` points at `pages/sponsor.html`, which does not exist yet, so the
  sponsor links fall back to the load-error card.
- `images/` holds 43 imported screenshots with original download filenames.
  No page references them; the image gallery expects `linux-topic-*.jpg` names
  that were never produced. `scripts/image-mapping.json` is the intended
  rename/topic map.

## Notes

- Commands assume a typical Linux environment and may need `sudo` or
  distro-specific tooling.
- The site deliberately uses no bundler or package manager.
