# Portfolio Website - M.K. Qoliyan

A modern, minimalist portfolio website for a full-stack developer built with React, TypeScript, and Vite.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-success)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)
![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)

## 🌟 Features

- **Responsive Design** - Mobile-first, two-column layout with sticky image section
- **JSON Content Management** - Easy-to-edit content files for experiences, skills, and projects
- **PDF Resume Generator** - One-click resume download with auto-generated PDF
- **Contact Form** - Telegram bot integration for instant notifications
- **Interactive UI** - Expandable skills, hover effects, and smooth animations
- **Black & White Theme** - Minimalist design with clean typography

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Content Management

All portfolio content is managed through JSON files in the `/content` directory:

### Update Experiences
Edit `content/experiences.json`:
```json
{
  "id": "1",
  "role": "Your Role",
  "company": "Company Name",
  "type": "Full-time",
  "date": "Jan 2024 - Present",
  "location": "City, Country • Remote",
  "description": ["Achievement 1", "Achievement 2"],
  "skills": ["React", "Node.js"],
  "image": "company-logo.png",
  "order": 1
}
```

### Update Skills
Edit `content/skills.json`:
```json
{ "name": "React.js", "level": "Advanced" }
```

### Update Projects
Edit `content/projects.json`:
```json
{
  "id": "1",
  "title": "Project Name",
  "description": "Project description",
  "link": "https://project-url.com"
}
```

After updating, run:
```bash
npm run generate
```

## 🛠️ Build Commands

```bash
# Development
npm run dev

# Generate content from JSON
npm run generate

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📦 Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (CDN)
- **Icons**: Lucide React
- **PDF Generation**: jsPDF, html2canvas
- **Deployment**: Vercel (recommended)

## 🎨 Customization

### Change Colors
Edit `index.html` Tailwind config:
```javascript
colors: {
  primary: '#000000',
  secondary: '#333333',
}
```

### Update Profile Image
Replace `/public/portraite.jpg` with your image

### Modify Theme
Edit component files in `/components` directory

## 📧 Contact Form Setup

The contact form integrates with Telegram via Vercel serverless functions.

**⚠️ Note:** The contact form only works when deployed to Vercel. It will not work in local development.

### Setup Steps:

1. Create a Telegram bot via [@BotFather](https://t.me/BotFather)
2. Get your Chat ID from [@userinfobot](https://t.me/userinfobot)
3. Deploy to Vercel
4. Add environment variables in Vercel project settings:

```bash
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

5. Redeploy after adding environment variables

## 🚀 Deployment

### Deploy to Vercel

1. Push to GitHub
2. Import project to [Vercel](https://vercel.com)
3. Set environment variables (if using contact form)
4. Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## 📁 Project Structure

```
├── api/                    # Serverless API functions
├── components/             # React components
├── content/               # JSON content files
│   ├── experiences.json
│   ├── skills.json
│   └── projects.json
├── public/                # Static assets
│   ├── images/
│   └── favicon.svg
├── scripts/               # Build scripts
├── utils/                 # Utility functions
└── App.tsx               # Main app component
```

## 📄 License

MIT License - feel free to use this template for your own portfolio

## 🤝 Contributing

This is a personal portfolio template. Feel free to fork and customize for your own use.

## 📬 Contact

- **Website**: [gholian.ir](https://gholian.ir)
- **Email**: kgholian@gmail.com
- **LinkedIn**: [linkedin.com/in/qoliyan](https://linkedin.com/in/qoliyan)
- **Telegram**: [@MKQoliyan](https://t.me/MKQoliyan)

---

Built with ❤️ by M.K. Qoliyan
