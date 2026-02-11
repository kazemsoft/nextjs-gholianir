# Portfolio Website - M.K. Qoliyan

A modern, minimalist portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)

## Features

- **Responsive Design** - Mobile-first, two-column layout with sticky image section
- **Next.js App Router** - Server and client components, API routes, optimized images
- **JSON Content Management** - Easy-to-edit content files for experiences, skills, and projects
- **PDF Resume Generator** - One-click resume download with auto-generated PDF
- **Contact Form** - Telegram bot integration for instant notifications
- **Docker Ready** - Dockerfile and docker-compose for self-hosted deployment

## Quick Start

### Prerequisites

- Node.js 18+

### Installation

```bash
git clone https://github.com/kazemsoft/nextjs-gholianir.git
cd nextjs-gholianir
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Content Management

All portfolio content is managed through JSON files in the `/content` directory. After editing, content is auto-generated on `dev` and `build`, or run manually:

```bash
npm run generate
```

- `content/experiences.json` - Work experience entries
- `content/skills.json` - Technical skills
- `content/projects.json` - Project showcase

## Commands

```bash
npm run dev          # Start dev server on port 3000
npm run build        # Production build
npm run start        # Start production server
npm run generate     # Regenerate content from JSON
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS (PostCSS)
- **Icons**: Lucide React
- **PDF Generation**: jsPDF, html2canvas
- **Deployment**: Vercel, Coolify, or any Docker host

## Contact Form Setup

The contact form sends messages via Telegram bot API.

1. Create a Telegram bot via [@BotFather](https://t.me/BotFather)
2. Get your Chat ID from [@userinfobot](https://t.me/userinfobot)
3. Set environment variables:

```bash
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## Deployment

### Deploy to Vercel

1. Push your repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository
3. Add `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` in **Settings > Environment Variables**
4. Click **Deploy**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Deploy to Coolify

1. In Coolify, create a new resource and select **Docker**
2. Connect your GitHub repository
3. Set build pack to **Dockerfile**
4. Add environment variables: `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`
5. Set port to **3000**
6. Click **Deploy**

## Customization

- **Colors**: Edit `tailwind.config.ts` (primary, secondary, graytext)
- **Profile Image**: Replace `public/portraite.jpg`
- **Components**: Edit files in `components/`

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   └── api/contact/        # Contact API route
├── components/             # React components
├── content/                # JSON content files
├── public/                 # Static assets
├── scripts/                # Content generation scripts
├── utils/                  # Utility functions
├── Dockerfile              # Multi-stage Docker build
└── docker-compose.yaml     # Docker Compose config
```

## License

MIT License - feel free to use this template for your own portfolio.

## Contact

- **Website**: [gholian.ir](https://gholian.ir)
- **Email**: kgholian@gmail.com
- **LinkedIn**: [linkedin.com/in/qoliyan](https://linkedin.com/in/qoliyan)
- **Telegram**: [@MKQoliyan](https://t.me/MKQoliyan)

---

Built by M.K. Qoliyan
