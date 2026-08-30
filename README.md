# Portfolio

Personal portfolio and blog, built with Next.js. Features a terminal-inspired design, dark/light theme switching, smooth custom scrolling, and a small blog for longer-form posts.

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Framer Motion](https://www.framer.com/motion/) for animation
- [next-themes](https://github.com/pacocoursey/next-themes) for dark mode
- [Lucide](https://lucide.dev/) for icons

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local dev server |
| `npm run build` | Create a production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
src/
  app/            Routes (home, blog list, blog post) and global styles
  components/     Reusable UI: navbar, footer, sections, theme provider
  lib/            Blog post data, smooth-scroll engine, class-name helper
public/           Static assets (icons, robots.txt)
```

Blog posts live as plain data in `src/lib/posts.ts` — add a new entry there to publish a post.

## Deployment

The site is a standard Next.js app and deploys as-is to [Vercel](https://vercel.com/) or any Node-compatible host. Run `npm run build` followed by `npm run start` for a self-hosted deployment.
