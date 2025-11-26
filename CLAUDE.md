# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog built with Next.js 16 (App Router) showcasing multiple interests including sewing, code, gardening, cooking, DIY, and life. The blog uses a file-based Markdown system with hierarchical organization by Topic → Type → Project.

## Development Commands

```bash
npm run dev      # Start development server (usually port 3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

### Blog Post System

**Posts location:** `/posts/*.md`

**Frontmatter structure:**
```yaml
---
title: "Post Title"
date: "YYYY-MM-DD"
topic: "cooking"           # Top-level category (sewing, code, gardening, cooking, diy, life)
type: "project-log"        # Content type (tutorial, project-log, essay, etc.)
project: "project-name"    # Optional: Links related posts
excerpt: "Brief description"
tags:
  - tag1
  - tag2
---
```

**Post management:** `src/lib/posts.js` exports:
- `getAllPosts()` - Returns all posts sorted by date (newest first)
- `getPostBySlug(slug)` - Returns single post data
- `getTopicsWithTypes()` - Returns hierarchical structure for sidebar (Topic → Types → Posts)
- `getPostsByArchive()` - Groups posts by year/month
- `getAllCategories()` - Backwards compatibility helper

**Important:** Post helper functions use Node.js `fs` module and must only be called from Server Components. Client Components receive post data as props.

### Component Architecture

**Server vs Client Components:**
- `src/app/blog/page.js` - Server Component that fetches all posts and passes to TopicSidebar
- `src/components/TopicSidebar.js` - Client Component (`'use client'`) for collapsible navigation
- Individual blog posts use dynamic routing: `src/app/blog/[slug]/page.js`

**Sidebar Navigation:**
Three-level collapsible hierarchy styled like Windows folder tree:
1. Topic (e.g., "Cooking (5)")
2. Type (e.g., "Tutorial (2)", "Project Log (3)")
3. Individual posts

Each level is independently expandable with state managed in the client component.

## Styling

**Framework:** Tailwind CSS v4 (CSS-based configuration, no tailwind.config.js)

**Color System:** Custom CSS variables defined in `src/app/globals.css`:
```css
:root {
  --cream: #fff8f0;
  --warm-white: #fffaf5;
  --soft-brown: #4a3428;
  --warm-brown: #8b6f47;
  --dusty-rose: #d4a5a5;
  --warm-gold: #e8c77e;
  --text-primary: #2d2420;
  --text-secondary: #6b5d54;
  --sky-blue: #75a7e8;
  --sunny-yellow: #ffbd59;
}
```

**Tailwind v4 Integration:** Colors must be registered in `@theme inline` block to be usable in Tailwind classes:
```css
@theme inline {
  --color-sky-blue: var(--sky-blue);
  /* ... etc */
}
```

**Typography:**
- Serif: Lora (body text, headings)
- Sans-serif: Inter (navigation, UI elements)

## Key Files

- `src/app/layout.js` - Root layout with fonts and navbar
- `src/app/globals.css` - CSS variables and Tailwind config
- `src/components/Navbar.js` - Site navigation
- `src/components/TopicSidebar.js` - Collapsible blog sidebar navigation
- `src/lib/posts.js` - Post data management (Server-side only)

## Common Patterns

**Adding new blog posts:**
1. Create `posts/post-slug.md` with proper frontmatter
2. Use dashes in filename (not spaces) for URL-friendly slugs
3. Ensure frontmatter has no leading whitespace before `---`

**When modifying post structure:**
- Update frontmatter schema documentation
- Modify `src/lib/posts.js` helper functions if needed
- Remember: These helpers run server-side only

**Color changes:**
- Add to `:root` in `globals.css`
- Register in `@theme inline` block for Tailwind usage
- Use `var(--color-name)` in components
