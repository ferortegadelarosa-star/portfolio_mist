# Fer's 2026 — Portfolio

Personal portfolio of Fer Ortega, brand and product designer (branding, editorial and web design).

Static site built with plain HTML, CSS and JavaScript — no build step or dependencies.

## Structure

```
index.html            Home: intro, selected works, contact
pages/about.html      About
pages/archive.html    Visual archive of personal explorations
styles.css            Global styles
script.js             Main site logic
assets/
  js/                 Theme toggle and archive scripts
  fonts/              Fraunces and Helvetica
  img/                Project images and videos
  videos/             Intro video
```

## Run locally

Open `index.html` directly in a browser, or serve the folder (recommended, since some
assets are loaded with `fetch`):

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

## Deploy (GitHub Pages)

1. Push to GitHub.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.
3. The site will be published at `https://<user>.github.io/<repo>/`.

## Credits

MMM, Baiala and Faro Santander were made as part of the Erretres branding team.

© 2026 Fer Ortega. All rights reserved. Images, videos and project work may not be reused without permission.
