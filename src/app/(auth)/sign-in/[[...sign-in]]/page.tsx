import { SignIn } from "@clerk/nextjs";
import { getSiteConfig } from "@/lib/config/loader";

export default async function SignInPage() {
  const siteConfig = await getSiteConfig();
  return (
    <div className="flex min-h-screen">
      {/* Left panel — branding */}
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-primary/20 via-background to-background p-12 lg:flex">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              {siteConfig.shortName.charAt(0)}
            </div>
            <span className="text-lg font-semibold text-foreground">
              {siteConfig.name}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <blockquote className="text-2xl font-medium leading-relaxed text-foreground/90">
            &ldquo;{siteConfig.description}&rdquo;
          </blockquote>
          <p className="text-sm text-muted-foreground">
            Powered by AI to help you work smarter.
          </p>
        </div>
        <div className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.legal.companyName}
        </div>
      </div>

      {/* Right panel — Clerk sign-in */}
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <div className="mb-8 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              {siteConfig.shortName.charAt(0)}
            </div>
            <span className="text-lg font-semibold text-foreground">
              {siteConfig.name}
            </span>
          </div>
        </div>
        <SignIn
          afterSignInUrl="/dashboard"
          signUpUrl="/sign-up"
          appearance={{
            elements: {
              rootBox: "w-full max-w-md",
              cardBox: "shadow-none w-full",
              card: "bg-transparent shadow-none border-none w-full",
              headerTitle: "text-foreground",
              headerSubtitle: "text-muted-foreground",
              socialButtonsBlockButton:
                "bg-secondary border-border text-foreground hover:bg-accent",
              socialButtonsBlockButtonText: "text-foreground font-medium",
              dividerLine: "bg-border",
              dividerText: "text-muted-foreground",
              formFieldLabel: "text-foreground",
              formFieldInput:
                "bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:ring-ring focus:border-ring",
              formButtonPrimary:
                "bg-primary text-primary-foreground hover:bg-primary/90 shadow-none",
              footerActionLink: "text-primary hover:text-primary/80",
              footerActionText: "text-muted-foreground",
              identityPreviewEditButton: "text-primary",
              formFieldAction: "text-primary",
              footer: "bg-transparent",
            },
          }}
        />
      </div>
    </div>
  );
}
