# Starter App Seed Conventions

This document defines the conventions for creating seed config files in Rocketing starter app templates. These conventions must be followed by all starter apps to ensure compatibility with the cascade pipeline's app config seeding system.

---

## Overview

Seed files are JSON objects that define the **default configuration state** of a starter app. During the cascade pipeline, after the app's repo is cloned and its MongoDB database is provisioned, these seed files are automatically discovered and inserted into the app's database. Agent tasks then customize each config object for the specific product being built.

```
Starter App Repo                    Cascade Pipeline                   App MongoDB
─────────────────                   ────────────────                   ───────────
config/seed/*.seed.json  ──read──►  App Config Seeder  ──insert──►   app-configs collection
                                    (builder module)                   (one document per seed file)
                                         │
                                         ▼
                                    Agent Tasks read and
                                    customize each document
                                         │
                                         ▼
                                    Validation gate checks
                                    all documents pass schema
```

---

## Directory Convention

```
config/
  seed/                              # All seed files live here
    site.seed.json                   # App identity
    theme.seed.json                  # Brand colors and typography
    chatkit.seed.json                # AI assistant configuration
    plans.seed.json                  # Pricing tiers
    features.seed.json               # Feature flags
    navigation.seed.json             # Navigation structure
    entities.seed.json               # Entity schema definitions
    registry-manifest.seed.json      # Registry item references
    SEED_CONVENTIONS.md              # This file
```

**Discovery rule:** The cascade pipeline's seeder globs `config/seed/*.seed.json`. Any file matching this pattern is automatically seeded. No index file or manifest is required.

**Adding a new config:** Create a new `.seed.json` file in this directory. The seeder will pick it up automatically on the next cascade run.

**Removing a config:** Delete the `.seed.json` file. The seeder will not insert a document for it.

---

## Seed File Format

Every seed file must be a valid JSON object with exactly two top-level keys: `_meta` and `data`.

```json
{
  "_meta": {
    "configType": "site",
    "version": "1.0.0",
    "starterTemplate": "rocketing-starter",
    "description": "Human-readable description of this config object",
    "agentTask": "configure-site",
    "cascadeScope": ["trigger", "sector2", "sector17"],
    "dependsOn": [],
    "notes": "Optional additional context"
  },
  "data": {
    "name": "App Name",
    "description": "A brief description"
  }
}
```

### `_meta` Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `configType` | `string` | Yes | Unique identifier for this config. Used as the document key in the database. Must be kebab-case. |
| `version` | `string` | Yes | Semver version of this config schema. Increment when the `data` shape changes. |
| `starterTemplate` | `string` | Yes | The starter template this seed belongs to (e.g., `"rocketing-starter"`). |
| `description` | `string` | Yes | Human-readable description of what this config controls. |
| `agentTask` | `string \| null` | Yes | The ID of the agent task that customizes this config. `null` if no single agent owns it (e.g., configs updated by multiple tasks). |
| `cascadeScope` | `string[]` | No | Which cascade data sections the agent task needs to customize this config. Uses alias names (e.g., `"sector17"` instead of full dot paths). |
| `dependsOn` | `string[]` | No | Other `agentTask` IDs that must complete before this config can be customized. Used for DAG ordering. |
| `notes` | `string` | No | Additional context for agents or developers. |

### `data` Field

The `data` object contains the actual config values. Its shape must match the corresponding TypeScript interface in `src/types/config.ts` (or `src/types/entity.ts` for entity schemas).

The `data` values represent **working defaults** — the app should be functional (compilable, renderable) with these values before any agent customization occurs. Agents replace these defaults with product-specific values.

---

## Config Lifecycle

Each config document in the database goes through these statuses:

```
seeded → customized → validated
                  ↓
               failed (validation error → agent retries)
```

| Status | Meaning |
|---|---|
| `seeded` | Inserted from seed file with default values. Not yet customized. |
| `customized` | An agent task has updated the `data` field with product-specific values. |
| `validated` | The `data` field has passed schema validation. Ready for use. |
| `skipped` | This config was intentionally skipped (e.g., feature not needed). |
| `failed` | Schema validation failed. Agent must retry. |

The cascade configuration phase is **complete** only when all config documents are in `validated` or `skipped` status.

---

## Rules for Creating Seed Files

### Naming

- File name: `{configType}.seed.json` — must match `_meta.configType`
- `configType` must be unique across all seed files in the starter app
- Use kebab-case for `configType`: `site`, `theme`, `chatkit`, `plans`, `features`, `navigation`, `entities`, `registry-manifest`

### Data Shape

- The `data` shape must match a TypeScript interface defined in `src/types/`
- Every field that the TypeScript type declares as required must be present in `data` (even if the value is a placeholder)
- Nullable fields should use `null`, not omit the key
- Arrays should default to `[]`, not be omitted

### Defaults Must Be Functional

- The default values in `data` must produce a **working app** — one that compiles without TypeScript errors and renders without runtime crashes
- Use generic placeholder text (e.g., `"App Name"`, `"A brief description"`) rather than empty strings for user-visible text
- Use valid but generic values for enums and structured types (e.g., `"casual-professional"` for formality, `"personal-companion"` for archetype)

### One Config Per Concern

- Each seed file should represent a single, cohesive configuration concern
- Don't combine unrelated configs into one file (e.g., don't put theme colors and pricing plans in the same seed file)
- Each seed file should have at most one owning `agentTask`

### Backward Compatibility

- When adding fields to an existing config, increment the `version` patch number (e.g., `1.0.0` → `1.0.1`)
- When changing the `data` shape in a breaking way, increment the minor version (e.g., `1.0.0` → `1.1.0`)
- The seeder is idempotent — it skips configs that already exist in the database. To re-seed, the existing document must be deleted first.

---

## Adding a New Config to a Starter App

1. **Define the TypeScript type** in `src/types/config.ts`:
   ```typescript
   export interface MyNewConfig {
     enabled: boolean;
     setting: string;
   }
   ```

2. **Create the seed file** at `config/seed/my-new-config.seed.json`:
   ```json
   {
     "_meta": {
       "configType": "my-new-config",
       "version": "1.0.0",
       "starterTemplate": "rocketing-starter",
       "description": "Controls the new feature's behavior",
       "agentTask": "configure-my-new-config",
       "cascadeScope": ["sector7"]
     },
     "data": {
       "enabled": false,
       "setting": "default-value"
     }
   }
   ```

3. **Create the TypeScript config file** (if the app reads config from files):
   `config/my-new-config.config.ts`:
   ```typescript
   import type { MyNewConfig } from "@/types/config";

   export const myNewConfig: MyNewConfig = {
     enabled: false,          // CUSTOMIZE
     setting: "default-value" // CUSTOMIZE
   };
   ```

4. **Commit both files.** The seeder will automatically discover the new seed file on the next cascade run.

---

## Creating a New Starter App Template

When creating an entirely new starter app (not just adding configs to the existing one), follow these requirements:

### Required Directory Structure

```
app/
  config/
    seed/                          # Required: seed files for DB seeding
      *.seed.json                  # At minimum: site, theme, features
      SEED_CONVENTIONS.md          # Copy of this file
  src/
    types/
      config.ts                    # TypeScript interfaces for all config shapes
  .agent/
    manifest.json                  # Agent protocol manifest
    INSTRUCTIONS.md                # Agent workflow instructions
    CONVENTIONS.md                 # Code conventions
```

### Required Seed Files

Every starter app must include at minimum:

| Seed File | configType | Why Required |
|---|---|---|
| `site.seed.json` | `site` | App identity — every app needs a name and domain |
| `theme.seed.json` | `theme` | Brand colors — every app needs visual styling |
| `features.seed.json` | `features` | Feature flags — controls what's enabled |

### Optional But Recommended

| Seed File | configType | When to Include |
|---|---|---|
| `chatkit.seed.json` | `chatkit` | If the starter app includes an AI chat assistant |
| `plans.seed.json` | `plans` | If the starter app includes subscription billing |
| `navigation.seed.json` | `navigation` | If the starter app has configurable navigation |
| `entities.seed.json` | `entities` | If the starter app uses entity-driven scaffolding |
| `registry-manifest.seed.json` | `registry-manifest` | If the starter app pulls assets from registry.rocketing.ai |

### Template ID Convention

Set `_meta.starterTemplate` to a unique kebab-case identifier for the starter app. This value must be consistent across all seed files in the template. Examples:
- `"rocketing-starter"` — the default MVP starter
- `"rocketing-marketplace"` — a marketplace-focused starter
- `"rocketing-saas-dashboard"` — a SaaS dashboard starter

### Version Synchronization

All seed files in a starter app should use the same `version` when the starter app is first released. They may diverge as individual configs evolve, but the initial release should be consistent.
