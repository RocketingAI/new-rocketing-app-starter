import { getSiteConfig } from "@/lib/config/loader";
import type { CascadeAppData } from "@/lib/cascade/lookup";

interface ComingSoonProps {
  cascadeData?: CascadeAppData | null;
}

export async function ComingSoon({ cascadeData }: ComingSoonProps) {
  const siteConfig = await getSiteConfig();
  const name = cascadeData?.appName ?? siteConfig.name;
  const description =
    cascadeData?.headline ??
    cascadeData?.tagline ??
    cascadeData?.description ??
    siteConfig.description;
  const email = cascadeData?.supportEmail ?? siteConfig.support.email;
  const phase = cascadeData?.currentPhase ?? null;
  const status = cascadeData?.status ?? null;

  // If cascade provided brand colors, inject them as inline styles
  const colorStyle = cascadeData?.colors
    ? ({
        "--cs-primary": cascadeData.colors.primary,
        "--cs-bg": cascadeData.colors.background,
        "--cs-text": cascadeData.colors.text,
      } as React.CSSProperties)
    : undefined;

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center"
      style={colorStyle}
    >
      <p className="absolute top-4 left-0 right-0 text-center text-xs text-muted-foreground/50">
        To launch the full site, remove the{" "}
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono">
          COMING_SOON
        </code>{" "}
        env variable and redeploy.
      </p>

      <div className="mx-auto max-w-2xl space-y-8">
        <div className="space-y-4">
          <h1
            className="text-5xl font-bold tracking-tight sm:text-6xl"
            style={cascadeData?.colors ? { color: cascadeData.colors.primary } : undefined}
          >
            {name}
          </h1>
          <p className="text-xl text-muted-foreground">{description}</p>
        </div>

        <div className="inline-block rounded-full border border-border/60 bg-card px-6 py-3">
          <span className="text-sm font-medium text-muted-foreground">
            Coming Soon
          </span>
        </div>

        {phase !== null && (
          <div className="space-y-2">
            <div className="mx-auto flex max-w-xs items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-muted">
                <div
                  className="h-1.5 rounded-full bg-primary transition-all"
                  style={{ width: `${Math.min((phase / 10) * 100, 100)}%` }}
                />
              </div>
              <span className="text-xs tabular-nums text-muted-foreground">
                {phase}/10
              </span>
            </div>
            <p className="text-xs text-muted-foreground/60">
              Build phase {phase} of 10
              {status === "running"
                ? " — in progress"
                : status === "complete"
                  ? " — complete"
                  : status === "blocked"
                    ? " — waiting for input"
                    : ""}
            </p>
          </div>
        )}

        {email && (
          <p className="text-sm text-muted-foreground">
            Get in touch&nbsp;&mdash;&nbsp;
            <a
              href={`mailto:${email}`}
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              {email}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
