# NexusAI

A cyberpunk style portfolio website for a team of AI engineers.
Dark neon design, bento grid layout and lots of small interactive demos.

Built with Next.js, React, Tailwind CSS and Framer Motion.

## Features

* **Hero section** with a clear pitch, a book a call button, an animated neural network and a synthwave horizon
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
* **Three design styles**: Clay (light claymorphism, default), Cyber (dark neon) and Brutal (light neo brutalism), switched from the style button in the navbar
* **Command palette** (Ctrl + K) to jump to any section, book a call or switch style and theme
* **Three color themes** for the Cyber style: Cyber, Synthwave and Matrix
* **Effects switch**: Full or Calm, where Calm turns off all ambient motion
* **Small moments**: a short boot intro on first visit, headings that decode and numbers that count up
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
| `/theme` | Switch Cyber color theme, for example `/theme synthwave` |
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
| Team names, bios, photos and links | `src/data/team.ts` |
| Case studies | `src/data/caseStudies.ts` |
| Services and prices | `src/data/services.ts` |
| Client logos and testimonials | `src/data/proof.ts` |
| FAQ | `src/data/faq.ts` |
| Tech stack items | `src/data/techStack.ts` |
| Emails and site name | `src/config/site.ts` |
| Design style tokens | `src/app/design-styles.css` |
| Style and theme lists | `src/lib/preferences/themes.ts` |
| Animations and effects | `src/app/globals.css` |
| Terminal commands | `src/lib/terminal/commands` |

The case studies, client logos and testimonials are sample content. Replace them with your real work before launch.

To add a new terminal command, create a file in `src/lib/terminal/commands` and register it in `src/lib/terminal/index.ts`.

## Design Styles

The whole site can switch between three looks. The style button in the navbar shows the current style, and clicking it opens a menu with all three:

| Style | Look |
| :--- | :--- |
| Clay | Light pastel, soft puffy cards, rounded font (default) |
| Cyber | Dark neon, glow and glitch effects |
| Brutal | Light cream, thick black borders, hard shadows, bold font |

To change the default style, edit `DEFAULT_STYLE` in `src/lib/preferences/themes.ts`.

Components never use fixed colors. They use design tokens such as `text-fg`, `bg-panel` and `border-line`, and each style sets its own values for colors, corner radius, shadows and fonts in `src/app/design-styles.css`. The terminal and phone demo stay dark in every style, like real devices. Every text element passes WCAG AA contrast in all three styles.

The chosen style is remembered for the next visit and applied before the page paints, so there is no flash.

## Themes and Effects

All neon colors in the Cyber style come from three CSS variables, so a theme only changes three values. To add a theme, add one entry to `src/lib/preferences/themes.ts` and it shows up in the command palette, the `/theme` command and the CSS automatically.

The site respects the reduced motion setting of your device. Calm mode goes further and also stops textures, glitches, the cursor ring and live counters, while keeping every feature usable.

## Code Principles

The code follows SOLID principles. Content, logic and UI are kept in separate places, each hook does one job, and new features like terminal commands can be added without changing existing code.

## Author

Made by [ZahidMiana](https://github.com/ZahidMiana)
