# TODO — Limpieza para diseño moderno

Eliminar todo lo relacionado con el diseño clásico (Bootstrap/jQuery) y dejar solo el diseño moderno (vanilla JS).

---

## HTML — Borrar (5 archivos)

- [ ] `index.html` — Homepage clásico
- [ ] `about.html` — Página "Sobre mí" clásica
- [ ] `projects.html` — Página de proyectos clásica
- [ ] `contact.html` — Página de contacto clásica
- [ ] `confirmation.html` — Página de confirmación de formulario

## CSS — Borrar (14 archivos)

- [ ] `assets/css/base.css`
- [ ] `assets/css/navbar.css`
- [ ] `assets/css/index.css`
- [ ] `assets/css/projects.css`
- [ ] `assets/css/contact.css`
- [ ] `assets/css/skillSet.css`
- [ ] `assets/css/confirmation.css`
- [x] ~~`assets/css/404.css`~~ — Rehecho para diseño moderno
- [ ] `assets/css/toggleDarkLight.css`
- [ ] `assets/css/darkThemeCSS/baseDark.css`
- [ ] `assets/css/darkThemeCSS/navbarDark.css`
- [ ] `assets/css/darkThemeCSS/indexDark.css`
- [ ] `assets/css/darkThemeCSS/projectsDark.css`
- [ ] `assets/css/darkThemeCSS/contactDark.css`

## JS — Borrar (2 archivos)

- [ ] `assets/js/main.js` — Init clásico (jQuery fade, translator)
- [ ] `assets/js/min/main-min.js` — Minificado de main.js

## Plugins — Borrar todo el directorio (~53 archivos)

- [ ] `assets/plugins/jquery-1.11.3.min.js`
- [ ] `assets/plugins/bootstrap/` — Bootstrap 3 completo (CSS, JS, fonts)
- [ ] `assets/plugins/font-awesome/` — Font Awesome 4 completo (CSS, fonts, LESS, SCSS)

## LESS — Borrar todo el directorio

- [ ] `assets/less/` — Fuentes LESS y CSS compilado (~6 archivos)

## Imágenes — Borrar (21 archivos)

Solo las que usa el diseño clásico:

- [ ] `assets/images/checked.png`
- [ ] `assets/images/competitive.png`
- [ ] `assets/images/cv-green.png`
- [ ] `assets/images/emailSent.png`
- [ ] `assets/images/ivan2.jpg`
- [ ] `assets/images/logoFITURJC.png`
- [ ] `assets/images/mail-send25.png`
- [ ] `assets/images/mailBox25.png`
- [ ] `assets/images/message.png`
- [ ] `assets/images/messageAntiguo.png`
- [ ] `assets/images/netflix.png`
- [ ] `assets/images/netflix-video-expire.jpg`
- [ ] `assets/images/orange.png`
- [ ] `assets/images/paper_cv25.png`
- [ ] `assets/images/paper_plane_flying-25.png`
- [ ] `assets/images/prueba.png`
- [ ] `assets/images/resume.png`
- [ ] `assets/images/terminal.png`
- [ ] `assets/images/themeImg.png`
- [ ] `assets/images/unchecked.png`
- [ ] `assets/images/web.jpg`

**Imágenes que SÍ se quedan** (las usa el moderno):
- `assets/images/2023ivan.jpg` — Foto de perfil
- `assets/images/icon.png` — Favicon
- `assets/images/ivan.jpg` — Foto perfil
- `assets/images/weekly.png` — Favicon del weekly planner

## i18n — Limpiar keys del clásico

Los JSONs de traducción tienen keys que solo usa el HTML clásico. Revisar cuáles son usadas por `index-modern.html` y borrar el resto.

Keys candidatas a eliminar:
- [ ] `education.*`
- [ ] `hobbies.*`
- [ ] `interest.*`
- [ ] `projectsCourses.*`
- [ ] `projects.card4`, `projects.card5`, `projects.card6`
- [ ] `skills.p1`, `skills.p2`, `skills.p3`, `skills.p4` (revisar si moderno las usa)
- [ ] `confirmation.*`
- [x] ~~`404.*`~~ — Se mantiene, usado por 404.html moderno

---

## Qué se queda

| Categoría | Archivos |
|---|---|
| **Modern HTML** | `index-modern.html`, `404.html` |
| **Modern CSS** | `modern-style.css`, `modern-dark.css`, `modern-responsive.css`, `404.css` |
| **Modern JS** | `modern-main.js`, `translator.js` |
| **i18n** | `i18n/en.json`, `i18n/es.json` (limpiados) |
| **PDFs** | `PDFs/IvanPerezHuete_CV.pdf`, `PDFs/IvanPerezHuete_CV_en.pdf` |
| **GroceryList** | `groceryList.html`, `assets/css/grocery.css`, `assets/js/grocery.js` |
| **Weekly** | `weekly.html`, `assets/css/weekly.css`, `assets/js/weekly.js`, `assets/images/weekly.png`, `assets/json/meals.json` |
| **Config** | `.agents/`, `AGENTS.md`, `skills-lock.json`, `.github/` |
| **Imágenes** | `2023ivan.jpg`, `icon.png`, `ivan.jpg` |

## Notas

- GroceryList y Weekly son **completamente standalone** — no dependen de Bootstrap/jQuery ni del diseño clásico. Se pueden dejar tal cual.
- Si se quieren ocultar de buscadores: añadir `<meta name="robots" content="noindex">` en ambos HTMLs.
