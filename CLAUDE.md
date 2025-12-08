# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for M.K. Qoliyan (Mohammad Kazem Qoliyan), a full-stack developer. Despite the directory name "nextjs-app", this is actually a **Vite + React + TypeScript** application, not a Next.js app. The project uses Tailwind CSS via CDN (loaded in index.html) for styling.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Architecture

### Project Structure

The application follows a flat, component-based architecture:

- **Entry point**: `index.tsx` → mounts React app to `#root` div
- **Main component**: `App.tsx` → contains layout with two-column design (scrollable content left, sticky image right)
- **Components**: All UI components are in `/components` directory
- **Data management**: Static data stored in `constants.ts`, type definitions in `types.ts`

### Layout Architecture

The App uses a distinctive two-column responsive layout:

- **Left column** (lg:w-3/5): Scrollable content with all sections (Navbar, Hero, Experience, Skills, Projects, Education, Contact, Footer)
- **Right column** (lg:w-2/5): Sticky profile image that stays fixed on desktop, appears first on mobile
- Mobile: Image appears above content (order-1), content below (order-2)
- Desktop: Content left (order-1), sticky image right (order-2)

### Data Flow

- All content data (experience, skills, projects, education) is centralized in `constants.ts`
- Type-safe interfaces defined in `types.ts` (ExperienceItem, SkillItem, ProjectItem, EducationItem)
- Components import data from constants and render it
- No state management library - uses React's built-in features

### Styling Approach

- **Tailwind CSS** loaded via CDN in `index.html` (not installed as dependency)
- Inline utility classes for all styling
- Custom Tailwind config in `index.html` with extended colors (primary, secondary, graytext)
- Inter font from Google Fonts
- Custom scrollbar styling in `index.html`
- Black and white minimalist theme with grayscale images

### Environment Variables

- `GEMINI_API_KEY` required in `.env.local` (mentioned in README but not currently used in code)
- Vite config exposes it as `process.env.API_KEY` and `process.env.GEMINI_API_KEY`

### Path Alias

- `@/*` is aliased to project root in both `vite.config.ts` and `tsconfig.json`
- Use `@/components/...` instead of `./components/...` for imports

## Key Files

- **constants.ts**: All portfolio data (experience, skills, projects, education)
- **types.ts**: TypeScript interfaces for data structures
- **App.tsx**: Main layout component with two-column responsive design
- **vite.config.ts**: Vite configuration with path aliases and environment variable setup
- **index.html**: Contains Tailwind CDN, custom config, fonts, and custom styles

## Component Responsibilities

Each component in `/components` handles one section:

- **Navbar**: Navigation with smooth scroll to sections
- **Hero**: Introduction, name, title, bio, CTA buttons
- **Experience**: Timeline of work history from EXPERIENCE_DATA
- **Skills**: Grid of technical skills with proficiency levels from SKILLS_DATA
- **Projects**: Portfolio projects from PROJECTS_DATA
- **Education**: Academic background from EDUCATION_DATA
- **Contact**: Contact information and links
- **Footer**: Footer content

## Development Notes

- This is NOT a Next.js app despite the directory name - it's Vite + React
- TypeScript is configured with experimental decorators and path aliases
- Server runs on port 3000 (configured in vite.config.ts)
- No routing library - single page with anchor navigation
- All images loaded from external URLs (no local image assets currently)
- Social links in constants.ts are placeholder "#" values
