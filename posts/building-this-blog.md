---
title: "Building This Blog with Next.js"
date: "2024-11-26"
topic: "code"
type: "project-log"
project: "personal-blog"
excerpt: "How I built a custom blog using Next.js, React, and Markdown"
tags:
  - nextjs
  - react
  - web-development
---

# Building This Blog with Next.js

I wanted a personal blog that felt like *mine* - not a generic template. Here's how I built it from scratch using Next.js.

## Why Next.js?

I chose Next.js because:
- Great for blogs with its file-based routing
- Built-in Markdown support
- Easy to deploy
- I wanted to learn modern React

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS
- **Content:** Markdown files with frontmatter
- **Fonts:** Lora (serif) + Inter (sans-serif)
- **Deployment:** GitHub Pages

## Key Features

### Markdown Blog Posts
Each post is a `.md` file with YAML frontmatter for metadata. Simple and portable.

### Dynamic Routing
Using Next.js `[slug]` routes to generate pages for each post automatically.

### Organized by Topic + Type
Posts are categorized by topic (Sewing, Code, etc.) and type (Tutorial, Essay, etc.).

## What I Learned

Building this taught me:
- Next.js App Router patterns
- Static site generation
- Custom typography with Google Fonts
- Responsive design with Tailwind

The best part? I can write posts in plain Markdown and focus on content, not code.

**Next up:** Adding a search feature and maybe some interactive elements!
