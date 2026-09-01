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

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the real value:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_CONTACT_WORKER_URL` | URL of the Cloudflare Worker that receives and emails contact-form submissions. Public value — safe to be visible client-side. |

No email-sending secrets live in this repo. The Worker that actually sends mail (via Cloudflare Email Service) is a separate deployment on Cloudflare, with its own sender/recipient addresses stored as encrypted Worker secrets, not here.

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

## Contact Form

`src/components/contact-section.tsx` submits to a Cloudflare Worker (deployed
separately, not part of this repo) at the URL in `NEXT_PUBLIC_CONTACT_WORKER_URL`.
The Worker sends the message on via Cloudflare Email Service — no email API key
or recipient address is stored in this codebase.

## Deployment

The site is a standard Next.js app and deploys as-is to [Vercel](https://vercel.com/) or any Node-compatible host. Run `npm run build` followed by `npm run start` for a self-hosted deployment.
