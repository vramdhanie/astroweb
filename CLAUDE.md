# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website built with Next.js 15 featuring a blog, reading lists, projects, and podcasts. The site uses static site generation (SSG) with MDX-based content management.

## Development Commands

**Package Manager**: Always use `pnpm` (configured in package.json as packageManager)

```bash
# Start development server with Turbopack
pnpm run dev

# Build for production (local builds use Turbopack)
pnpm run build

# Build for CI/deployment (no Turbopack)
pnpm run build:ci

# Run ESLint
pnpm run lint

# Start production server (after build)
pnpm run start
```

## Architecture

### Static Site Generation

This site uses Next.js static export (`output: 'export'` in next.config.ts). All pages are pre-rendered at build time:

- No server-side runtime
- Content is read from filesystem during build via `fs` module
- Output directory is `out/` (used for deployment)
- Images are unoptimized for static export compatibility

### Content System

Content is managed through three sources:

1. **MDX Files** (`src/content/`)
   - Articles: `src/content/articles/*.mdx`
   - Book Years: `src/content/books/*.mdx`
   - Projects: `src/content/projects/*.mdx`
   - Each has frontmatter (gray-matter) with metadata

2. **JSON Data** (`src/data/`)
   - `books.json`: Full book database with reading status and progress

3. **Data Fetching** (`src/lib/`)
   - `articles.ts`: Functions to read article MDX files
   - `books.ts`: Functions to read book years + merge with books.json
   - `projects.ts`: Functions to read project MDX files
   - All use Node.js `fs` module (build-time only)

### App Router Structure

Pages follow Next.js 15 App Router conventions:

```
src/app/
├── page.tsx              # Homepage
├── articles/
│   ├── page.tsx         # Article list
│   └── [slug]/page.tsx  # Individual article (MDX rendered)
├── books/
│   ├── page.tsx         # Years list
│   ├── waiting/page.tsx # Waiting list books
│   └── [year]/page.tsx  # Books for specific year
├── projects/
│   ├── page.tsx         # Projects list
│   └── [slug]/page.tsx  # Individual project
├── podcasts/page.tsx    # Podcast directory
└── uses/page.tsx        # Professional tools
```

### Theme System

Client-side theme management with three modes: light, dark, system

- Context: `src/contexts/ThemeContext.tsx`
- Storage: localStorage persistence
- Implementation: CSS classes on `<html>` element
- CSS Variables: Defined in `app/globals.css` with light/dark variants

## Key Patterns

### Adding New Content

**New Article**:
1. Create `src/content/articles/slug-name.mdx`
2. Add frontmatter: title, _slug, image, date, author, level, tags, abstract
3. Auto-discovered by `getAllArticles()` in lib/articles.ts

**New Book Year**:
1. Create `src/content/books/YYYY.mdx` with year metadata
2. Add books to `src/data/books.json` with yearRead field
3. Year auto-discovered by `getAllBookYears()` in lib/books.ts

**New Project**:
1. Create `src/content/projects/slug-name.mdx`
2. Add frontmatter with project details
3. Auto-discovered by lib/projects.ts

### MDX Rendering

Articles and dynamic content use `next-mdx-remote`:
- MDX is parsed at build time
- Custom components in `src/components/mdx/`
- Rendered with `<MDXRemote>` component

### Image Handling

- Unoptimized images (required for static export)
- Remote patterns configured for books.google.com
- Local images in `public/` directory

## Code Style

ESLint configuration (.eslintrc.cjs) enforces:
- Import sorting (simple-import-sort)
- No relative imports (use @ alias)
- TypeScript strict typing
- React hooks rules
- Tailwind class validation
- File naming: camelCase or PascalCase

## Deployment

Static build output goes to `out/` directory:
```bash
pnpm run build:ci  # Builds without Turbopack for compatibility
```

Deploy the `out/` directory to any static hosting (Vercel, Netlify, GitHub Pages, etc.)

## Important Files

- `next.config.ts`: Static export config, image patterns
- `src/app/globals.css`: Theme CSS variables, Tailwind setup
- `src/data/books.json`: Book database (frequently updated)
- `firebase.json`: Deployment configuration
