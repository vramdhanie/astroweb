# Vincent Ramdhanie - Personal Website

[![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)](https://github.com/yourusername/astroweb)
[![Deployment](https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

A modern, responsive personal website built with Next.js 15, featuring a comprehensive blog, reading lists, and professional portfolio. This project demonstrates modern web development practices with static site generation, theme switching, and MDX content management.

## ✨ Features

- **🎨 Theme System**: Light, dark, and system theme support with local storage persistence
- **📝 MDX Blog**: Auto-discovering article system with rich content support
- **📚 Reading Lists**: Yearly book collections with dynamic data integration
- **🎧 Podcast Directory**: Curated podcast recommendations with ratings
- **🛠️ Uses Page**: Professional tools and environment showcase
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS
- **⚡ Performance**: Static site generation for optimal loading speeds
- **🔍 SEO Optimized**: Comprehensive metadata and Open Graph support
- **📱 PWA Ready**: Web app manifest and favicon support

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom CSS variables
- **Content**: [MDX](https://mdxjs.com/) with `next-mdx-remote`
- **Build Tool**: [Turbopack](https://turbo.build/pack) for faster builds
- **Package Manager**: [pnpm](https://pnpm.io/) for efficient dependency management
- **Deployment**: [Vercel](https://vercel.com/) platform

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── articles/          # Blog articles with MDX
│   ├── books/            # Reading lists by year
│   ├── podcasts/         # Podcast recommendations
│   └── uses/             # Professional tools showcase
├── components/            # Reusable React components
├── content/               # MDX content files
│   ├── articles/         # Blog post MDX files
│   └── books/            # Year-based reading list MDX files
├── contexts/              # React context providers
├── lib/                   # Utility functions and data fetching
└── types/                 # TypeScript type definitions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/vramdhanie/astroweb.git
   cd astroweb
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run start        # Start production server
pnpm run lint         # Run ESLint
pnpm run type-check   # Run TypeScript type checking
```

## 📝 Content Management

### Adding New Articles

1. Create a new `.mdx` file in `src/content/articles/`
2. Add frontmatter with title, date, tags, and description
3. Write your content using MDX syntax
4. The article will be automatically discovered and listed

### Adding New Reading Years

1. Create a new `.mdx` file in `src/content/books/`
2. Add frontmatter with year, slug, cover image, and description
3. Update your `books.json` data file with the new year's books
4. The year will appear in the books landing page

### Theme Customization

The theme system uses CSS custom properties defined in `globals.css`. Colors automatically adapt to light/dark modes:

```css
:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --primary: #3b82f6;
  /* ... more variables */
}
```

### Any Platforms

The project builds to static files and can be deployed to any static hosting service:

```bash
pnpm run build
# Deploy the 'out' directory
```

## 📱 Progressive Web App

This site includes PWA features:
- Web app manifest (`site.webmanifest`)
- Multiple favicon sizes for different devices
- Theme color configuration
- Standalone display mode support

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Next.js Configuration

The project uses Turbopack for faster builds and includes optimized image handling:

```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    turbo: {
      root: process.cwd(),
    },
  },
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**MIT License**

Copyright (c) 2024 Vincent Ramdhanie

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)
- Fonts optimized with [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

---

**Vincent Ramdhanie** - Senior Software Engineer  
🌐 [Website](https://vincentramdhanie.com) | 💼 [LinkedIn](https://linkedin.com/in/vincentramdhanie) | 🐙 [GitHub](https://github.com/vincentramdhanie)
