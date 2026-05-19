# Ryvo Landing Page — Build Brief

## Mission

Rebuild the Ryvo landing page (https://ryvo.fr) from scratch. The goal is a production-quality, polished site that looks like it was crafted by a senior design engineer — not vibecoded. Every pixel, every transition, every animation must feel intentional and premium.

---

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + CSS custom properties for theme tokens
- **Animation:** Framer Motion (primary) + GSAP ScrollTrigger (scroll orchestration)
- **3D/Canvas:** Three.js or React Three Fiber for hero 3D elements
- **Icons:** Lucide React
- **Fonts:** Match ryvo.fr — use Inter or Geist for body, a display font for headings
- **API:** OpenAI API (key will be provided) — wire up the demo section

---

## Brand & Visual Identity (from ryvo.fr)

Reverse-engineer all colors, fonts, spacing, and copy from the live site at https://ryvo.fr.

Key visual rules:
- Dark theme primary (deep navy/near-black background)
- Accent colors: electric blue / cyan gradient (extract exact hex values from the site)
- Clean whitespace — breathable layouts, not cramped
- Typography: bold, tight headings with generous line-height in body
- Glassmorphism cards with subtle border glow
- No stock photos — use abstract gradients, geometric shapes, and UI mockup windows

---

## Site Structure

### 1. Navbar
- Sticky, blurred glassmorphism background on scroll
- Logo left, nav links center, CTA button right
- Smooth underline hover effect on links
- Mobile: hamburger with slide-down menu (animated)

### 2. Hero Section
- Full-viewport height
- Headline: large, bold, with animated gradient text (cycling through brand colors)
- Subheadline: concise value proposition copied from ryvo.fr
- Two CTAs: primary (filled) + secondary (outlined ghost)
- **Hero 3D Asset:** A floating pseudo-3D dashboard panel
  - Rendered with React Three Fiber or CSS 3D transforms
  - Perspective tilt on mouse move (parallax depth layers)
  - Layered floating cards with blurred drop shadows
  - Ambient glow pulses behind the dashboard
  - Subtle auto-rotation when not hovered
  - Depth layers: background grid → mid UI panel → foreground metrics cards

### 3. Social Proof Bar
- Logos of tech companies / integrations (or placeholder brand names)
- Infinite horizontal marquee scroll (CSS animation, no JS)
- Faded edges with gradient mask

### 4. Features Section
- 3-column grid on desktop, single column on mobile
- Each card: icon, title, description
- **Staggered reveal:** cards animate in with 80ms delay between each
- On hover: card lifts with scale(1.03), border glow intensifies
- Each feature card contains a mini animated UI mockup:
  - Auto-scrolling terminal log window (green text on dark bg)
  - Moving node graph / pipeline diagram
  - Sleek input → output state transition demo

### 5. How It Works
- Numbered steps with connecting animated line
- Timeline enters from the left as user scrolls
- Each step fades in sequentially

### 6. Live Demo Section
- **Rebuild the full Ryvo demo** from https://ryvo.fr
- Wire it to the OpenAI API (`OPENAI_API_KEY` from env)
- The demo should showcase Ryvo's core capability (reverse-engineer from the site)
- Streaming responses displayed in a styled terminal/chat UI
- Animated cursor blink, typewriter effect for output
- Show token usage or timing metrics in a subtle badge
- Error states must be handled gracefully with a styled error message

### 7. Pricing / Plans (if present on ryvo.fr)
- Copy structure and tiers from the live site
- Animated toggle for monthly/annual billing
- Highlighted "popular" plan with pulsing border

### 8. FAQ
- Accordion with smooth height animation (Framer Motion `AnimatePresence`)

### 9. Footer
- Newsletter input with animated submit state
- Social links with hover animations
- Minimal, matches overall dark theme

---

## Animation Architecture

All animations must be performance-optimized. Use `will-change: transform` sparingly and only on actively animating elements. Prefer CSS transforms over layout-triggering properties.

### Scroll Orchestration
```
GSAP ScrollTrigger setup:
- scrub: 1 (smooth scroll-linked progress)
- Batch reveal animations for repeated elements
- Pin sections for scroll-driven storytelling where appropriate
```

- Elements entering the viewport: `opacity: 0, y: 40` → `opacity: 1, y: 0` over 600ms, ease `power2.out`
- Grid items: staggered 80ms delay per item
- Section headings: split text animation (word by word) using GSAP SplitText or manual spans
- Parallax: hero background moves at 0.3x scroll speed

### Hero 3D Dashboard
```jsx
// Pseudo-3D with CSS perspective or Three.js
// Mouse tracking → rotateX/Y within ±15deg range
// Spring physics via Framer Motion useSpring
// Depth layers:
//   z-0: background grid (CSS, subtle)
//   z-10: main dashboard panel (glass card)
//   z-20: floating metric chips (animated counters)
//   z-30: foreground decorative elements
```

### Feature UI Mockups
Each feature card's mini-mockup must be self-contained and animated:
- **Terminal mockup:** Simulate log lines appearing one by one in a loop with random delays
- **Node graph:** Animate edges being drawn and nodes pulsing
- **I/O mockup:** Show an input field filling → submit → output appearing

### Page-Level Motion Config (Framer Motion)
```jsx
// _app or layout.tsx
<AnimatePresence mode="wait">
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
```

---

## Demo Implementation (OpenAI)

```typescript
// app/api/demo/route.ts
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { prompt } = await req.json();
  
  const stream = openai.beta.chat.completions.stream({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    stream: true,
  });

  return new Response(stream.toReadableStream());
}
```

- Frontend: uses `EventSource` or `fetch` with `ReadableStream` to consume the stream
- Display tokens as they arrive in the styled terminal UI
- Show a pulsing dot indicator while streaming
- "Try it" input pre-populated with example prompts from ryvo.fr's demo

---

## Code Quality Rules

1. **No magic numbers** — all spacing/sizing values go through Tailwind classes or CSS custom properties
2. **No inline styles** except for dynamic values (mouse position, scroll progress)
3. **No `useEffect` for animations** that can be done declaratively with Framer Motion
4. **Component structure:** one component per file, colocate styles
5. **All images:** use `next/image` with proper `width`/`height` or `fill`
6. **Accessibility:** all interactive elements must have focus states, ARIA labels where needed
7. **Performance:** Lighthouse score target ≥ 90 on all metrics
8. **TypeScript strict mode** — no `any`, no `as unknown`
9. **Mobile-first** — design at 375px, enhance upward

---

## Anti-Vibecode Checklist

Before calling anything done, verify:
- [ ] No Comic Sans / system fonts — proper font stack loaded
- [ ] No `transition: all 0.3s` — be specific about which properties
- [ ] No layout shift during animation — reserve space before animating
- [ ] No janky scroll — test at 60fps on a throttled CPU
- [ ] No default browser button styles anywhere
- [ ] No `!important` in CSS
- [ ] No broken responsive layouts between 375px and 1440px
- [ ] No placeholder "Lorem ipsum" text — use real copy from ryvo.fr
- [ ] Every section has a clear visual hierarchy
- [ ] Color contrast passes WCAG AA

---

## Environment Variables

**Never hardcode the API key in any file.** Add it only through Cloudflare's dashboard or a local `.env.local` (which must be in `.gitignore`).

```env
# .env.local (local dev only — never commit this file)
OPENAI_API_KEY=sk-...
```

For production: set `OPENAI_API_KEY` in Cloudflare Pages → Settings → Environment Variables.

---

## Deployment: Cloudflare Pages

The project targets **Cloudflare Pages** with the Edge Runtime.

### Next.js Config for Cloudflare

```typescript
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Required for Cloudflare Pages
  output: "export", // static export — OR use @cloudflare/next-on-pages for full SSR
};

export default nextConfig;
```

**Recommended approach: `@cloudflare/next-on-pages`** — supports API routes (needed for the OpenAI streaming demo) on Cloudflare's Edge Runtime.

```bash
npm install --save-dev @cloudflare/next-on-pages
```

```jsonc
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "pages:build": "npx @cloudflare/next-on-pages",
    "pages:deploy": "wrangler pages deploy .vercel/output/static",
    "lint": "next lint"
  }
}
```

### API Route — Edge Runtime

All API routes must declare Edge Runtime explicitly for Cloudflare compatibility:

```typescript
// app/api/demo/route.ts
export const runtime = "edge"; // ← required for Cloudflare Pages

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const stream = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "user", content: prompt }],
    stream: true,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? "";
        if (text) controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
```

### wrangler.toml

```toml
name = "ryvo"
compatibility_date = "2024-09-23"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".vercel/output/static"
```

### Cloudflare Deploy Steps

```bash
# 1. Install Wrangler globally if not already
npm install -g wrangler

# 2. Login to Cloudflare
wrangler login

# 3. Build for Cloudflare
npm run pages:build

# 4. Deploy (first time creates the project)
wrangler pages deploy .vercel/output/static --project-name=ryvo

# Subsequent deploys: push to GitHub and Cloudflare auto-deploys via Git integration
```

### Cloudflare Git Integration (recommended)

1. Push repo to GitHub
2. Go to Cloudflare Dashboard → Pages → Create a project → Connect to Git
3. Set build command: `npx @cloudflare/next-on-pages`
4. Set output directory: `.vercel/output/static`
5. Add `OPENAI_API_KEY` under Settings → Environment Variables (Production + Preview)

### Important Cloudflare Constraints

- No Node.js built-ins that aren't in the `nodejs_compat` flag — stick to Web APIs
- No `fs`, `path`, `crypto` (use `globalThis.crypto` instead)
- Max bundle size per route: 1 MB (keep API routes lean)
- Streaming responses work natively on the Edge — use `ReadableStream` as shown above
- Three.js / React Three Fiber run only client-side — use `"use client"` and dynamic imports with `ssr: false`

```tsx
// components/HeroDashboard3D.tsx
const HeroDashboard3D = dynamic(() => import("./HeroDashboard3DInner"), {
  ssr: false,
  loading: () => <div className="hero-placeholder" />,
});
```

---

## Dev Commands

```bash
npm run dev          # local dev server
npm run build        # standard Next.js build
npm run pages:build  # Cloudflare-specific build
npm run lint         # ESLint check
wrangler pages dev .vercel/output/static  # preview Cloudflare build locally
```

---

## Deliverables

1. Complete Next.js project with all pages and components
2. Fully animated landing page matching ryvo.fr branding
3. Working live demo wired to OpenAI streaming (Edge Runtime compatible)
4. Responsive across all breakpoints (375px → 1440px)
5. `wrangler.toml` configured and ready to deploy to Cloudflare Pages
6. README with setup instructions, env var documentation, and deploy steps
