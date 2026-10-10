# NexusAI

A cyberpunk style portfolio website for a team of AI engineers.
Dark neon design, bento grid layout and lots of small interactive demos.

Built with Next.js, React, Tailwind CSS and Framer Motion.

## Features

* **Hero section** with a clear pitch, a book a call button and an interactive animated neural network
* **Case studies**: six real projects from the team, each with a cover and a full story
* **Team showcase** with a live demo for each member
  * Zahid Iqbal, Full Stack AI Engineer: RAG pipeline stats and agent architecture graph
  * Zeeshan Khalid, AI Security Engineer: prompt injection lab, OWASP LLM Top 10 audit and threat feed
* **Services and process**: three plans with starting prices and a four step delivery process
* **Verified credentials**: real roles, certifications and leadership
* **Tech stack and terminal playground**: tap any tool to see how we used it, or type commands like `/help`, `/team` and `/book`
* **FAQ** with answers to common client questions
* **Contact form** that emails you every new lead, with spam protection
* **Footer** with encrypted email that unlocks on hover and live world clocks
* **Neo brutalist design**: cream paper, thick black borders, hard shadows and bold type, with a rounded pill navbar
* **Command palette** (Ctrl + K) to jump to any section, book a call or switch effects
* **Effects switch**: Full or Calm, where Calm turns off all ambient motion
* **Small moments**: headings that decode and numbers that count up
* **Mobile friendly** with swipeable cards, touch support, readable text and a sticky "Book a free call" button
* **Fast and findable**: Lighthouse 100 on desktop, social preview image, sitemap and structured data
* **Accessible** with good contrast and support for reduced motion

## Tech Stack

| Tool | Purpose |
| :--- | :--- |
| Next.js 16 | Framework and routing |
| React 19 | UI |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |

## Getting Started

You need Node.js 20 or newer.

```bash
git clone https://github.com/ZahidMiana/NexusAI.git
cd NexusAI
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Contact Form Setup

The contact form sends every lead to your inbox using [Resend](https://resend.com).

1. Create a free Resend account and get an API key
2. Copy `.env.example` to `.env.local`
3. Fill in the values

```bash
RESEND_API_KEY=re_your_key
CONTACT_TO_EMAIL=you@yourdomain.com
CONTACT_FROM_EMAIL="NexusAI <hello@yourdomain.com>"
```

Without these settings the form still works in development and prints each lead in your terminal. In production it shows a message asking visitors to email you directly, so no lead is lost silently.

The form checks every field in the browser and again on the server. It also has a hidden spam trap and allows 5 messages per visitor every 10 minutes.

## Scripts

| Command | What it does |
| :--- | :--- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Run the production build |
| `npm run lint` | Check the code with ESLint |
| `npm run typecheck` | Check TypeScript types |

## Terminal Commands

| Command | Output |
| :--- | :--- |
| `/help` | List all commands |
| `/team` | Show the team members |
| `/stack` | Show the main technologies |
| `/explain` | Explain how we use a tool, for example `/explain langgraph` |
| `/ping` | Test latency across regions |
| `/contact` | Show contact details |
| `/book` | Open the contact form (try `/book on-device`) |
| `/fx` | Switch effects, `/fx calm` or `/fx full` |
| `/about` | Show the agency mission |
| `/whoami` | Show session info |
| `/clear` | Clear the screen |

Shortcuts: arrow keys for history, Tab to autocomplete. Press Ctrl + K anywhere to open the command palette.

## Project Structure

| Folder | Contents |
| :--- | :--- |
| `src/app` | Pages, layout and global styles |
| `src/components/ui` | Reusable pieces like cards and buttons |
| `src/components/layout` | Navbar, footer and background |
| `src/components/sections` | Hero, team, terminal and tech stack sections |
| `src/data` | All text content and lists |
| `src/hooks` | Reusable React hooks |
| `src/lib` | Helpers, terminal engine and animation logic |
| `src/config` | Site name, emails and navigation |
| `src/app/actions` | Server Action that handles the contact form |
| `src/lib/contact` | Form validation, email sending and rate limiting |

## Customize

| What to change | File |
| :--- | :--- |
| Team members, photos and links | `src/data/team.ts` |
| Case studies | `src/data/caseStudies.ts` |
| Services and prices | `src/data/services.ts` |
| Credentials and organisations | `src/data/proof.ts` |
| FAQ | `src/data/faq.ts` |
| Tech stack items | `src/data/techStack.ts` |
| Emails and site name | `src/config/site.ts` |
| Colors, fonts, borders and shadows | `src/app/design-styles.css` |
| Animations and effects | `src/app/globals.css` |
| Terminal commands | `src/lib/terminal/commands` |

## Before Launch

| What | Where |
| :--- | :--- |
| Site URL | Set `NEXT_PUBLIC_SITE_URL` (for example `https://yourdomain.com`) in your hosting settings |
| Real contact email | `contact.email` in `src/config/site.ts` |
| Calendly or booking link | `contact.bookingUrl` in `src/config/site.ts`. When set, every "Book a call" button opens it |
| Availability text | `availability` in `src/config/site.ts` |
| Project images | Covers are free Unsplash photos in `public/work/`. Replace with real screenshots any time via `cover` in `src/data/caseStudies.ts` |
| GitHub and demo links | `links` in `src/data/caseStudies.ts` |
| Team photos and CV | `photo` and `resumeUrl` in `src/data/team.ts` |

## Adding a Team Member

1. Add an entry to `src/data/team.ts` with name, role, bio, focus areas and links
2. Pick a `specialty`. It decides which showcase card the member gets: `full-stack`, `security`, `product` or `mobile`
3. Put a photo in `public/team/` and set `photo: "/team/name.jpg"`

The product and mobile cards are ready for future members and appear as soon as someone uses that specialty. Credentials go in `src/data/proof.ts` and projects in `src/data/caseStudies.ts`.

To add a new terminal command, create a file in `src/lib/terminal/commands` and register it in `src/lib/terminal/index.ts`.

## Design

The whole look lives in one file, `src/app/design-styles.css`. Components never use fixed colors. They use design tokens such as `text-fg`, `bg-panel` and `border-line`, so changing a value in that file updates the entire site. The terminal and phone demo stay dark like real devices. Every text element passes WCAG AA contrast.

## Effects

The site respects the reduced motion setting of your device. The Calm effects mode (in the command palette, or `/fx calm` in the terminal) goes further and stops all ambient animation and live counters, while keeping every feature usable.

## Code Principles

The code follows SOLID principles. Content, logic and UI are kept in separate places, each hook does one job, and new features like terminal commands can be added without changing existing code.

## Author

Made by [ZahidMiana](https://github.com/ZahidMiana)
