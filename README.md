# Interactive Portfolio — phone-friendly starter

A responsive Next.js portfolio with a dark premium theme, red accents, scroll reveals, project filters, theme toggle, mobile navigation, contact links, and project detail modals. It uses static sample data, so it works without a database or secret keys.

## Edit your details
Open `src/data/portfolio.ts` and replace the sample name, intro, links, skills, and projects. Replace `public/resume.pdf` with your own resume PDF (optional). Replace the example email and social URLs before publishing.

## Run locally
Requires Node.js 20.9+.
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy from Android
1. Create a GitHub repository and upload/push all files in this project.
2. Sign in at https://vercel.com using GitHub.
3. Add New → Project → import your repository.
4. Keep the framework preset as Next.js and deploy.
5. Vercel gives you a public URL. Future pushes to the connected branch redeploy automatically.

You can do these steps from Chrome on Android. A cloud editor such as Replit or StackBlitz can help you edit/run code if you don't have a laptop. If uploading a ZIP, extract it first so `package.json` is at the repository root.

## Important
- This starter has no database, admin login, or server-side contact storage. The contact button opens an email draft using the address in `portfolio.ts`.
- Do not add passwords, private API keys, or secrets to source files.
- Before public launch, update all placeholder links and content and test the site on mobile.
