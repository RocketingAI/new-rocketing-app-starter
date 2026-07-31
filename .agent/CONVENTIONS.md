# Code Conventions — Rocketing Starter Template

## Naming

| Thing | Convention | Example |
|-------|-----------|---------|
| Entity schema files | `kebab-case.yaml` | `invoice-item.yaml` |
| Model files | `kebab-case.model.ts` | `invoice-item.model.ts` |
| API route dirs | `kebab-case` | `src/app/api/v1/invoice-items/` |
| Component dirs | `kebab-case` | `src/components/domain/invoice-item/` |
| Component files | `kebab-case.tsx` | `invoice-item-card.tsx` |
| Config files | `kebab-case.config.ts` | `site.config.ts` |
| TypeScript types | PascalCase | `InvoiceItem` |
| Interfaces | PascalCase with I prefix for models | `IInvoiceItem` |
| Zod schemas | camelCase + "Schema" | `invoiceItemSchema` |
| Pages | `page.tsx` (Next.js convention) | `src/app/(app)/projects/page.tsx` |

## File Organization

```
config/           → Configuration (agents modify freely)
src/app/          → Pages and API routes
src/components/   → React components
  ui/             → Base shadcn components (DO NOT MODIFY)
  layout/         → Shell, header, footer, sidebar
  marketing/      → Landing page sections
  chat/           → ChatKit integration
  shared/         → Cross-cutting (logo, theme toggle)
  domain/         → Entity-specific components
src/lib/          → Infrastructure and utilities
  db/             → MongoDB connection and models
  stripe/         → Stripe client and helpers
  auth/           → Clerk auth helpers
  utils/          → Shared utilities
src/types/        → TypeScript type definitions
```

## Code Style

- No empty lines within functions
- Use named exports (except page components which use `export default`)
- Prefer server components; add `"use client"` only when state/effects/browser APIs are needed
- All API responses use `apiSuccess()` / `apiError()` / `apiPaginated()` helpers
- All DB queries go through model files, never raw Mongoose in route handlers
- Tailwind only — no inline styles, no CSS modules
- Use `cn()` utility for conditional class merging

## Component Patterns

### Server Component (default)
```tsx
import { SomeComponent } from "@/components/some-component";

export default function MyPage() {
  return <SomeComponent />;
}
```

### Client Component (when needed)
```tsx
"use client";

import { useState } from "react";

export function InteractiveWidget() {
  const [value, setValue] = useState("");
  return <input value={value} onChange={(e) => setValue(e.target.value)} />;
}
```

### API Route
```tsx
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/client";
import { MyModel } from "@/lib/db/models/my-model.model";
import { apiSuccess, apiError } from "@/lib/utils/api";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return apiError("Unauthorized", 401);
  await connectDB();
  const data = await MyModel.find({ userId }).lean();
  return apiSuccess(data);
}
```

## Import Aliases

- `@/` maps to `src/`
- `@/../config/` for config files (they live outside src/)

## AI Agents

Agent definitions live in **`config/agents.config.ts`**, typed as `AgentsConfig` from
`@/types/config`. They run on `mastra.rocketing.ai`; that file is the source of truth.

To change how an agent behaves — its instructions, model, tools, memory, subagents — edit
that file. Do **not** call the mastra API directly to create or modify an agent: the next
sync would replace it, and the change would exist nowhere in git.

```bash
npm run sync:agents -- --dry-run    # show the plan
npm run sync:agents              # apply
```

CI posts the plan on a PR and applies on merge, so the normal flow is: edit the file, open a
PR, merge.

Three things that will bite:

- **The sync replaces, it does not merge.** A field deleted from an entry is deleted on the
  service. Each entry must be the complete definition.
- **`model` is `provider/model`** — `openai/gpt-4.1-mini`, not `gpt-4.1-mini`.
- **MCP servers take `authSecret` (a secret's *name*), never `authToken`.** An inline token
  would be written to a database in plaintext; both the sync and the service refuse it.

Full guide, including how to call an agent from app code and what memory does:
[`docs/AI_AGENTS.md`](../docs/AI_AGENTS.md).
