# NexusAI

A cyberpunk style portfolio website for a team of AI engineers.
Dark neon design, bento grid layout and lots of small interactive demos.

Built with Next.js, React, Tailwind CSS and Framer Motion.

## Features

* **Hero section** with a clear pitch, a book a call button and an animated neural network
* **Case studies**: six real projects from the team, each opening a full story
* **Team showcase** with a live demo for each member
  * Zahid Iqbal, Full Stack AI Engineer: RAG pipeline stats and agent architecture graph
  * Zeeshan Khalid, AI Security Engineer: prompt injection lab, OWASP LLM Top 10 audit and threat feed
* **Process timeline** that fills in as you scroll
* **Services** with three engagement plans and starting prices
* **Verified credentials**: real roles, certifications and leadership
* **Live terminal** where you can type commands like `/help`, `/team` and `/book`
* **Tech stack** grid where every badge opens a short expertise summary
* **FAQ** with answers to common client questions
* **Contact form** that emails you every new lead, with spam protection
* **Footer** with encrypted email that unlocks on hover and live world clocks
* **Two design styles**: Clay (soft claymorphism, default) and Brutal (bold neo brutalism), switched from the style button in the navbar
* **Command palette** (Ctrl + K) to jump to any section, book a call or switch style
* **Effects switch**: Full or Calm, where Calm turns off all ambient motion
* **Small moments**: headings that decode and numbers that count up
* **Mobile friendly** with touch support and readable text sizes
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
| `/ping` | Test latency across regions |
| `/contact` | Show contact details |
| `/book` | Open the contact form (try `/book on-device`) |
| `/style` | Switch design style, for example `/style clay` |
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
| Design style tokens | `src/app/design-styles.css` |
| Style list and default | `src/lib/preferences/styles.ts` |
| Animations and effects | `src/app/globals.css` |
| Terminal commands | `src/lib/terminal/commands` |

## Adding a Team Member

1. Add an entry to `src/data/team.ts` with name, role, bio, focus areas and links
2. Pick a `specialty`. It decides which showcase card the member gets: `full-stack`, `security`, `product` or `mobile`
3. Put a photo in `public/team/` and set `photo: "/team/name.jpg"`

The product and mobile cards are ready for future members and appear as soon as someone uses that specialty. Credentials go in `src/data/proof.ts` and projects in `src/data/caseStudies.ts`.

To add a new terminal command, create a file in `src/lib/terminal/commands` and register it in `src/lib/terminal/index.ts`.

## Design Styles

The whole site can switch between two looks. The style button in the navbar shows the current style, and clicking it opens a menu with both:

| Style | Look |
| :--- | :--- |
| Clay | Light pastel, soft puffy cards, rounded font (default) |
| Brutal | Light cream, thick black borders, hard shadows, bold font |

To change the default style, edit `DEFAULT_STYLE` in `src/lib/preferences/styles.ts`. To add a new style, add it to that file and add a token block for it in `src/app/design-styles.css`.

Components never use fixed colors. They use design tokens such as `text-fg`, `bg-panel` and `border-line`, and each style sets its own values for colors, corner radius, shadows and fonts in `src/app/design-styles.css`. The terminal and phone demo stay dark in every style, like real devices. Every text element passes WCAG AA contrast in both styles.

The chosen style is remembered for the next visit and applied before the page paints, so there is no flash.

## Effects

The site respects the reduced motion setting of your device. The Calm effects mode (in the command palette, or `/fx calm` in the terminal) goes further and stops all ambient animation and live counters, while keeping every feature usable.

## Code Principles

The code follows SOLID principles. Content, logic and UI are kept in separate places, each hook does one job, and new features like terminal commands can be added without changing existing code.

## Author

Made by [ZahidMiana](https://github.com/ZahidMiana)
