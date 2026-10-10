# NexusAI

A cyberpunk style portfolio website for a team of AI engineers.
Dark neon design, bento grid layout and lots of small interactive demos.

Built with Next.js, React, Tailwind CSS and Framer Motion.

## Features

* **Hero section** with an animated neural network that reacts to your mouse or touch
* **Team showcase** with a live widget for each engineer
  * LLM stats with GPU usage and token counters
  * Agent workflow simulator and ROI calculator
  * Phone demo that runs an on device AI model and object detection
* **Live terminal** where you can type commands like `/help`, `/team` and `/stack`
* **Tech stack** grid where every badge opens a short expertise summary
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

## Customize

| What to change | File |
| :--- | :--- |
| Team names and bios | `src/data/team.ts` |
| Tech stack items | `src/data/techStack.ts` |
| Emails and site name | `src/config/site.ts` |
| Colors and animations | `src/app/globals.css` |
| Terminal commands | `src/lib/terminal/commands` |

To add a new terminal command, create a file in `src/lib/terminal/commands` and register it in `src/lib/terminal/index.ts`.

## Code Principles

The code follows SOLID principles. Content, logic and UI are kept in separate places, each hook does one job, and new features like terminal commands can be added without changing existing code.

## Author

Made by [ZahidMiana](https://github.com/ZahidMiana)
