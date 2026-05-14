# Euroflex Website

Responsive marketing website for Euroflex HDPE piping systems. Vanilla HTML, CSS, JS — no frameworks.

---

## File Structure

```
euroflex/
├── index.html
├── styles.css
├── script.js
└── assets/
    └── images/
        ├── euroflex-logo.png
        ├── gushwok_image.jpg
        ├── gimage2.jpg
        ├── gimage3.jpg
        └── Gushwok_logo.png
```

---

## Running Locally

**VS Code Live Server**
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
2. Right-click `index.html` → **Open with Live Server**

**Anyone without VS Code**
```bash
npx serve .
```
Then open `http://localhost:3000`

Or:
```bash
python3 -m http.server 3000
```

---

## Sections

| File | Sections |
|---|---|
| `index.html` + `styles.css` + `script.js` | Sticky header, hero, image carousel with zoom, technical specs |
| `portfolio-section.html` | Product cards + CTA banner |
| `sections.html` + `sections.css` | Resources & Downloads, Contact form |

---

## Key Features

- **Sticky header** — slides in after scrolling past first fold, hides on scroll up
- **Carousel** — zoom on hover, prev/next, dots, touch swipe, keyboard nav
- **Responsive** — desktop / tablet / mobile breakpoints at 900px, 700px, 600px
- **Dropdown + mobile hamburger nav**