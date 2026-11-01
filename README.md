# Isa Ali - Cyber / RGB Portfolio

A custom personal portfolio with a dark coding and gaming-inspired visual design. Neon green is the main color, with optional cyan and purple RGB accents. Everything is built using HTML, CSS and JavaScript. It works without frameworks, API keys, subscriptions, or a build process.

## Preview locally

1. Extract this ZIP.
2. Open `index.html` in Chrome or Edge.
3. Try the project popups, terminal tabs (`profile.json` and `focus.log`), mobile menu, and RGB switch in the top-right corner.

You can also open the folder in VS Code and use the Live Server extension, or run `python -m http.server 8000` in the folder and open `http://localhost:8000`.

## Customize the website

| File | Purpose |
| --- | --- |
| `index.html` | Text, sections, project descriptions, links, and components |
| `styles.css` | Layout, responsive behavior, gaming colors, animation |
| `app.js` | Navigation, scroll effects, RGB switch, terminal tabs, project details |
| `favicon.svg` | Small code-themed browser icon |
| `resume.pdf` | CV file to download from the website |

To change the primary color, edit `--green` in `:root` at the top of `styles.css`. The purple and cyan accent variables are `--purple` and `--cyan`.

For the text, edit the hero heading and paragraph near `<section class="hero ...>` in `index.html`. Project case-study popup text is stored in the `projectDetails` object of `app.js`.

## Publish via GitHub Pages

1. Make a new public repository (for example `isa-portfolio`).
2. Upload the files **inside** this folder to the repository root: `index.html`, `styles.css`, `app.js`, `favicon.svg`, `resume.pdf`, etc.
3. Commit the files on `main`.
4. Go to **Settings > Pages**, choose **Deploy from a branch**, then **main** and **/(root)**.
5. Save, and use the URL GitHub gives you. For the name above and GitHub username `1sa2li`, that should be `https://1sa2li.github.io/isa-portfolio/`.

Documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Important before publishing

- `resume.pdf` is a copy of your supplied CV. It may show your personal phone number, email, and location. Review it or replace it with a public-safe CV before making the website public.
- Confirm your email, LinkedIn, GitHub, dates, descriptions and technologies are correct. Project cards reflect previously discussed work, not independently verified production deliverables.
- Project visuals are *illustrations* built with HTML and CSS, not live reports or genuine operational metrics.
- Never publish real customer orders, shipments, production data, API secrets, Supabase keys, Shopify keys, or confidential Albayan Perfumes code.
- The RGB button switches secondary cyan and purple accents on/off; it does not turn on light mode. The site is always dark.

## How to keep learning

Start by changing `--green`, then add one new project card, and finally make a new dedicated project page using HTML/CSS/JS.

## Naming

The delivery management project is presented as **BHO** in the portfolio and resume.
Company names under work experience are retained as factual employment history.
