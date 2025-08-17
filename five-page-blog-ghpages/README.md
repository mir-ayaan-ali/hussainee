# Five-Page Blog (Vite + React + Tailwind)

## Run locally
1. Install Node.js 18+.
2. In a terminal, run:
   ```bash
   npm install
   npm run dev
   ```
3. Open the URL printed in the terminal.

## Build for production
```bash
npm run build
npm run preview
```

## Notes
- Uses React Router for pages: **Home**, **Blog-1..4** within `/blog/:pageNum`.
- Blog tiles show a headline + 2-line excerpt; clicking opens a modal with the full post.
- Desktop shows **4 tiles per row**, mobile shows **1 tile per row**.


---

## Deploy to GitHub Pages (HashRouter)

1. Replace `REPO_NAME` in `vite.config.js` with your repository name (e.g., `/five-page-blog/`).
2. Commit and push to the `main` branch on GitHub.
3. In **Settings → Pages**, set **Source** to **GitHub Actions** (or it will auto-detect after first run).
4. The included workflow builds the site and deploys the `/dist` folder to Pages automatically.
5. Your live URL will be `https://<your-username>.github.io/REPO_NAME/`.

*Routing note:* This project uses **HashRouter**, so URLs like `#/blog/1` will work on Pages without extra redirects.
