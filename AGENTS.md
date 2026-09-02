# IvanPerez9.github.io — portfolio site

## Project structure

Static HTML/CSS/JS personal portfolio. **No build tools, no package.json, no tests.**

### Portfolio (single-page)

| File | CSS | JS | Dependencies |
|------|-----|----|--------------|
| `index.html` | `assets/css/modern-style.css`, `modern-dark.css`, `modern-responsive.css` | `assets/js/modern-main.js` (vanilla JS) | Font Awesome 6 (CDN), DM Sans + JetBrains Mono fonts |

### Standalone apps (not portfolio)

| App | File | CSS | JS |
|-----|------|-----|----|
| Weekly meal planner | `weekly.html` | `assets/css/weekly.css` | `assets/js/weekly.js` |
| Grocery list | `groceryList.html` | `assets/css/grocery.css` | `assets/js/grocery.js` |
| WhatsApp stats | `whatstats.html` | inline | inline |

All standalone apps use Font Awesome 6 (CDN).

## Commands

```sh
# Local dev server
python3 -m http.server 1337
# → http://localhost:1337/index.html
```

No test/lint/typecheck commands exist. CI `super-linter` job is commented out.

## Internationalization (i18n)

- Custom `Translator` class in `assets/js/translator.js`
- Translations: `i18n/en.json`, `i18n/es.json`
- HTML elements tagged with `data-i18n="key.subkey"` attributes (dot-path into JSON)
- **Default language: Spanish (`es`)**
- Language is persisted to `localStorage` key `"language"`
- Init (`assets/js/modern-main.js`): `filesLocation: "./i18n"`
- The `Translator` default config has a bug: `languages: ["en,es"]` (single string item). `modern-main.js` correctly passes `languages: ["en", "es"]`.

## Dark/Light theme

- CSS variables in `modern-dark.css`, toggled via `data-theme` attribute on `<html>`

## Design system

- **Fonts**: DM Sans (body), JetBrains Mono (code/accents)
- **Primary color**: `#3AC499` (Ocean Green)
- **Dark BG**: `#121214`
- **Border radius**: `0.25rem` — `0.75rem` (minimal rounding)

## Deployment

- **Default branch: `master`** (not `main`)
- GitHub Actions (`.github/workflows/pagesDeployment.yml`): builds with Jekyll, deploys to GitHub Pages
- Triggers: daily at 06:00 UTC, push to `master`, manual `workflow_dispatch`

## CV PDFs

- `PDFs/IvanPerezHuete_CV_en.pdf` (English)
- `PDFs/IvanPerezHuete_CV.pdf` (Spanish)
- CV download button in hero changes link based on current language.

## Agent skills (`.agents/skills/`)

Three auto-skills are installed: **accessibility**, **frontend-design**, **seo**. Load with the `/skill` tool when relevant work arises. Locked via `skills-lock.json`.
