# Jonatas Souza — CV website

A text-first, bilingual CV published at [joonatassouza.github.io](https://joonatassouza.github.io/).

English is the default; the monochrome flags link to English and Brazilian Portuguese. Sun and moon controls select light or dark mode. A new visitor starts in light mode. Both language pages work without JavaScript; JavaScript adds theme preferences and printing. Use **Print / save PDF** for a paper-friendly copy of the current language.

## Edit and preview

Update `content/en.md` and `content/pt-BR.md` together, then regenerate the committed HTML:

```sh
python3 scripts/build-site.py
python3 -m http.server 8000
```

Open <http://localhost:8000>. No packages, external fonts, icon libraries, or build service are required. `style.css` controls screen and print styles; `script.js` handles theme selection and printing. GitHub Pages serves `index.html` and `pt.html` directly.

The content was reconciled with the supplied CV workspace and user-confirmed career updates through September 30, 2026, including Todos, NestJS familiarity, GCP, GitHub Actions, and the reviewed core resume enhancements. Original job dates and overlapping roles are preserved. The private working material under `cv/` is excluded from the published repository; the reviewed public copy lives in `content/`.
