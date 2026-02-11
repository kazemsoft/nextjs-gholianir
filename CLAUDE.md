# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Next.js 15 (App Router) portfolio website** using React 19 and Tailwind CSS. It uses server components by default, with `'use client'` directives on interactive components.

## Commands

```bash
npm run dev          # Start dev server on port 3000 (auto-generates content first)
npm run build        # Production build (auto-generates content first)
npm run start        # Start production server
npm run generate     # Regenerate all TypeScript data files from JSON
```

Individual content generators:
```bash
npm run generate:experiences
npm run generate:skills
npm run generate:projects
```

## Architecture

### App Router Structure

- `app/layout.tsx` — Root layout (server component), sets up Inter font via `next/font/google`, metadata, and global CSS
- `app/page.tsx` — Home page (server component), renders two-column layout with all section components
- `app/globals.css` — Tailwind directives + custom scrollbar styles
- `app/api/contact/route.ts` — Contact form API route (POST handler)

### Build-time Content Generation

Content lives in `content/*.json` files. Node scripts in `scripts/` read these JSON files and generate TypeScript modules (`generated-experiences.ts`, `generated-skills.ts`, `generated-projects.ts`) at the project root. These generated files are gitignored. The `dev` and `build` scripts auto-run generation before starting.

**Workflow**: Edit JSON in `content/` → `npm run generate` runs automatically → components import from generated TS files.

### Layout

`app/page.tsx` renders a two-column responsive layout:
- **Left (3/5 on desktop)**: Scrollable content — Navbar, Hero, Experience, Skills, Projects, Education, Contact, Footer
- **Right (2/5 on desktop)**: Sticky portrait image using `next/image`, shown first on mobile

### Components

All in `components/` — one file per section. Interactive components have `'use client'` directive:
- **Client components**: `Navbar.tsx`, `Hero.tsx`, `Experience.tsx`, `Contact.tsx`, `ResumeTemplate.tsx`
- **Server components**: `Skills.tsx`, `Projects.tsx`, `Education.tsx`, `Footer.tsx`

### API

`app/api/contact/route.ts` is a Next.js API route. It sends contact form submissions to Telegram via bot API. Requires `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` environment variables.

### Styling

Tailwind CSS via PostCSS (build-time), configured in `tailwind.config.ts`:
- Colors: primary `#000000`, secondary `#333333`, graytext `#666666`
- Font: Inter via `next/font/google`
- Theme: minimalist black & white with grayscale images

### PDF Generation

`utils/generateResumePDF.ts` uses html2canvas + jsPDF to render `components/ResumeTemplate.tsx` off-screen and capture it as a PDF.

### Path Alias

`@/` maps to the project root (configured in `tsconfig.json`).

### Type Definitions

`types.ts` contains shared interfaces: `ExperienceItem`, `SkillItem`, `ProjectItem`, `EducationItem`.

### Icons

Uses `lucide-react` for all icons.
