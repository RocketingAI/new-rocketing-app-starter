# Agent Instructions — Rocketing Starter Template

You are an AI agent customizing this starter template for a specific product. Read this file completely before making any changes.

## How This Template Works

This is a **configuration-first** starter app. Your primary job is to:

1. **Update config files** in `config/` to define the product's identity, features, and entities
2. **Create entity-specific code** following the patterns in the example "Project" entity
3. **Customize marketing pages** with product-specific content
4. **Leave infrastructure untouched** — auth, DB, Stripe, and middleware are pre-wired

## Phase Workflow

Work through phases in order. Update `.agent/manifest.json` phase status as you complete each one.

### Phase 1: Identity
- Update `config/site.config.ts` with the product's name, domain, description, branding
- Update `config/theme.config.ts` if the product has specific brand colors
- Update `config/navigation.config.ts` to match the product's page structure

### Phase 2: Schema
- Create entity YAML files in `config/entities/` for each domain entity
- Follow the format in `config/entities/example-project.yaml`
- Remove the example entity file when done

### Phase 3: Scaffold
For each entity defined in Phase 2:
- Create a Mongoose model in `src/lib/db/models/{entity}.model.ts` (follow `project.model.ts`)
- Create API routes in `src/app/api/v1/{entity}/route.ts` (follow `projects/route.ts`)
- Create pages in `src/app/(app)/{entity}/` (follow `projects/`)
- Create components in `src/components/domain/{entity}/` (follow `project/`)
- Remove the example Project entity files when done

### Phase 4: Pages
- Update dashboard stats and layout for the product's metrics
- Build out any additional app pages needed

### Phase 5: Content
- Update the landing page hero, features, and CTA text
- Update pricing plans in `config/plans.config.ts`
- Update support page content
- Update terms and privacy policy content

### Phase 6: Logic (if needed)
- Add custom business logic, integrations, or workflows

### Phase 7: Polish
- Fine-tune the theme
- Test responsive behavior
- Ensure all pages render correctly

### Phase 8: Deploy
- Ensure `.env` is configured
- Deploy to Vercel

## Registry Manifest

Check `config/registries/manifest.json` for pre-selected registry items. If items are listed there, they were chosen in earlier pipeline phases. Install them according to their instructions.

## Rules

- **NEVER** modify files in `src/components/ui/` — these are base shadcn components
- **NEVER** modify `src/lib/db/client.ts`, `src/lib/stripe/client.ts`, or `middleware.ts`
- **ALWAYS** use the `apiSuccess`/`apiError` helpers for API responses
- **ALWAYS** use Clerk's `auth()` for route protection
- **ALWAYS** use typed props — no `any` types
- **PREFER** server components; add `"use client"` only when needed
- **FOLLOW** naming conventions in CONVENTIONS.md
