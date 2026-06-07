# CLAUDE.md

This file provides guidance to agentic agents when working with code in this repository.

## Commands

```sh
pnpm install          # install dependencies
pnpm start            # dev server (clean + watch assets + eleventy --serve)
pnpm run build        # production build (clean → assets → eleventy → workbox SW)
pnpm run build:assets # gulp build only (JS + CSS production + critical CSS)
pnpm run svg          # regenerate SVG sprite from src/icons/*.svg → src/includes/icons.svg
pnpm run plop         # scaffold new district page interactively
```

No test suite exists in this project.

Linting:

```sh
pnpm exec eslint src/assets/scripts
pnpm exec stylelint src/assets/styles
```

## Architecture

**Stack**: Eleventy 1.x (SSG) + Gulp 4 (asset pipeline) + PostCSS + Browserify/Babel + Workbox (SW).

**Build flow**:

1. Gulp compiles `src/assets/scripts/main.js` → `dist/assets/scripts/` (Browserify + Babel)
2. Gulp compiles `src/assets/styles/*.css` → `dist/assets/styles/` (PostCSS)
3. Critical CSS (`src/assets/styles/critical/*.css`) → `src/includes/critical/` (inlined at build time)
4. Eleventy processes `src/` → `dist/` (Nunjucks + Markdown)
5. Workbox generates service worker into `dist/`

**Eleventy config** (`.eleventy.js`):

- Input: `src/`, output: `dist/`
- Template engines: Nunjucks (`.njk`) and Markdown (`.md`), plus `11ty.js`
- `src/data/` → global data; `src/includes/` → partials; `src/layouts/` → base layouts
- `lazyimages` plugin active only in production (`ELEVENTY_ENV=production`)
- HTML minification active only in production

**Content**: District pages live in `src/districts/` as Markdown files. Each uses the `district` layout. New districts are scaffolded via `pnpm run plop` (template in `plop/`).

**Layouts** (`src/layouts/`): `base.njk` → `default.njk` / `district.njk` / `narrow.njk`.

**Custom filters** (`src/utils/filters.js`): `dateToFormat`, `dateToISO`, `sortByTitle`.

**Shortcodes** (`src/utils/shortcodes.js`): `{% email %}`, `{% map mid %}`, `{% youtube id %}`.

**SVG sprite**: Source icons in `src/icons/`, compiled to `src/includes/icons.svg` by `pnpm run svg`. Referenced inline via `<use xlink:href="#icon-name">`.

**Static assets** copied verbatim to `dist/`: `src/static/` (xml/html/ico), `src/assets/fonts/`, `src/assets/images/`, `src/downloads/`.
