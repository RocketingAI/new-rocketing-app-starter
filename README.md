# Rocketing Starter App (MVP)

A configuration-first Next.js starter template designed to be cloned and customized by AI agents as part of the Rocketing "domain to deployment" pipeline.

## Quick Start

```bash
# 1. Clone from GitHub template
gh repo create my-app --template rocketing/starter-app

# 2. Install dependencies
pnpm install

# 3. Configure environment
cp .env.example .env.local
# Edit .env.local with your API keys

# 4. Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Architecture

```
.agent/         -> Agent protocol (manifest, instructions, conventions)
config/         -> Configuration layer (site, theme, nav, plans, entities)
src/app/        -> Pages and API routes (Next.js App Router)
src/components/ -> React components (ui, layout, marketing, domain, chat)
src/lib/        -> Infrastructure (db, auth, stripe, utils)
src/types/      -> TypeScript type definitions
```

### Layers

| Layer | Purpose | Who Modifies |
|-------|---------|-------------|
| **Agent Protocol** (`.agent/`) | Machine-readable app definition | Pipeline only |
| **Configuration** (`config/`) | App identity, features, entities | Agents (primary) |
| **Infrastructure** (`src/lib/`) | Auth, DB, payments wiring | Never (protected) |
| **Scaffold** (`src/app/`, `src/components/domain/`) | Pages, routes, domain components | Agents (from patterns) |
| **UI Base** (`src/components/ui/`) | shadcn components | Never (protected) |

## Stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS** + **shadcn/ui** (Radix primitives)
- **Clerk** (authentication)
- **Stripe** (payments/subscriptions)
- **MongoDB** (Mongoose ODM)
- **ChatKit** (AI assistant placeholder)

## For AI Agents

Start by reading `.agent/INSTRUCTIONS.md`. It contains the full workflow for customizing this template.

Key files:
- `.agent/manifest.json` — Machine-readable app definition and phase tracking
- `.agent/INSTRUCTIONS.md` — Step-by-step customization guide
- `.agent/CONVENTIONS.md` — Naming and code style rules
- `config/registries/manifest.json` — Pre-selected registry items to install

## Environment Variables

See `.env.example` for all required and optional variables.
