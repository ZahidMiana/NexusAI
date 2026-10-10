# NexusAI

A cyberpunk style portfolio website for a team of AI engineers.
Dark neon design, bento grid layout and lots of small interactive demos.

Built with Next.js, React, Tailwind CSS and Framer Motion.

## Features

* **Hero section** with a clear pitch, a book a call button and an animated neural network
* **Case studies** in a bento grid, each opening a full story with results
* **Team showcase** with a live widget for each engineer
  * LLM stats with GPU usage and token counters
  * Agent workflow simulator and ROI calculator
  * Phone demo that runs an on device AI model and object detection
* **Process timeline** that fills in as you scroll
* **Services** with three engagement plans and starting prices
* **Client proof** with a scrolling logo strip and testimonials
* **Live terminal** where you can type commands like `/help`, `/team` and `/book`
* **Tech stack** grid where every badge opens a short expertise summary
* **FAQ** with answers to common client questions
* **Contact form** that emails you every new lead, with spam protection
* **Footer** with encrypted email that unlocks on hover and live world clocks
* **Mobile friendly** with a menu, touch support and readable text sizes
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
| `/about` | Show the agency mission |
| `/whoami` | Show session info |
| `/clear` | Clear the screen |

Shortcuts: arrow keys for history, Tab to autocomplete, Ctrl + K to open the terminal.

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
| Team names, bios, photos and links | `src/data/team.ts` |
| Case studies | `src/data/caseStudies.ts` |
| Services and prices | `src/data/services.ts` |
| Client logos and testimonials | `src/data/proof.ts` |
| FAQ | `src/data/faq.ts` |
| Tech stack items | `src/data/techStack.ts` |
| Emails and site name | `src/config/site.ts` |
| Colors and animations | `src/app/globals.css` |
| Terminal commands | `src/lib/terminal/commands` |

The case studies, client logos and testimonials are sample content. Replace them with your real work before launch.

To add a new terminal command, create a file in `src/lib/terminal/commands` and register it in `src/lib/terminal/index.ts`.

## Code Principles

The code follows SOLID principles. Content, logic and UI are kept in separate places, each hook does one job, and new features like terminal commands can be added without changing existing code.

## Author

Made by [ZahidMiana](https://github.com/ZahidMiana)
