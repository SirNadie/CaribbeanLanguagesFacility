# Caribbean Language Facility

This project is built with **Next.js 16**, **React 19**, and **Tailwind CSS**.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19 + Tailwind CSS 3.4
- **Animations:** Framer Motion
- **Language:** TypeScript
- **Internationalization:** Custom i18n context (ES/EN)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with fonts and providers
│   ├── page.tsx            # Main landing page
│   ├── globals.css         # Global styles and animations
│   ├── inscripciones/      # Registration page
│   ├── programas/          # Programs page
│   ├── privacy/            # Privacy policy
│   └── terms/              # Terms of service
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Footer.tsx          # Footer
│   ├── ContactForm.tsx     # Contact form (Make.com webhook)
│   ├── ContactModal.tsx    # Modal wrapper for contact form
│   └── sections/           # Landing page sections
├── context/
│   └── LanguageContext.tsx # i18n provider (ES/EN)
├── i18n/
│   └── translations.ts     # Translation strings
├── lib/
│   └── animations.ts       # Framer Motion variants
└── consts.ts               # Site constants (URLs, contact info)
```

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Start Production Server**:
   ```bash
   npm start
   ```

## Features

- 🌐 Bilingual support (Spanish/English)
- 📱 Fully responsive design
- ⚡ Optimized images with Next.js Image
- 🎨 Custom animations with Framer Motion
- 📝 Contact form with Make.com integration
- 🔍 SEO optimized with structured data (JSON-LD)
