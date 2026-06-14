# IvanPerez9.github.io — portfolio site

## Project structure

Static HTML/CSS/JS personal portfolio. **No build tools, no package.json, no tests.**

### Two parallel site versions

| Version | Base file | CSS | JS | Dependencies |
|---------|-----------|-----|----|--------------|
| **Classic** | `index.html`, `about.html`, `projects.html`, `contact.html`, etc. | `assets/css/*.css` + `assets/css/darkThemeCSS/` | `assets/js/main.js` (jQuery) | Bootstrap 3, jQuery, Font Awesome (vendored in `assets/plugins/`) |
| **Modern** | `index-modern.html` | `assets/css/modern-*.css` (CSS custom properties) | `assets/js/modern-main.js` (vanilla JS) | Font Awesome 6 (CDN), no Bootstrap/jQuery |

Both share the same i18n system and dark/light toggle mechanism.

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
- Classic pages reload on language switch (`window.location.reload()`)
- Classic init (`assets/js/main.js`): `filesLocation: "/i18n"`
- Modern init (`assets/js/modern-main.js`): `filesLocation: "./i18n"` — the path differs!
- The `Translator` default config has a bug: `languages: ["en,es"]` (single string item). Both `main.js` and `modern-main.js` correctly pass `languages: ["en", "es"]`.

## Dark/Light theme

- **Classic**: CSS file swapping via `assets/css/toggleDarkLight.css`. Dark overrides in `assets/css/darkThemeCSS/`.
- **Modern**: CSS variables in `modern-dark.css`, toggled via `data-theme` attribute on `<html>`.

## Deployment

- **Default branch: `master`** (not `main`)
- GitHub Actions (`.github/workflows/pagesDeployment.yml`): builds with Jekyll, deploys to GitHub Pages
- Triggers: daily at 06:00 UTC, push to `master`, manual `workflow_dispatch`

## LESS source files

`assets/less/` contains `.less` source files. These are **source-only** — the compiled CSS lives in `assets/css/`. There is no automated LESS compilation step; compile manually if you edit LESS files.

## CV PDFs

- `PDFs/IvanPerezHuete_CV_en.pdf` (English)
- `PDFs/IvanPerezHuete_CV.pdf` (Spanish)
- The translator switches the download link based on current language.

## Agent skills (`.agents/skills/`)

Three auto-skills are installed: **accessibility**, **frontend-design**, **seo**. Load with the `/skill` tool when relevant work arises. Locked via `skills-lock.json`.
