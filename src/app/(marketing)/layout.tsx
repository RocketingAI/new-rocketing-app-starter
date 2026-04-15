import { PublicHeader } from "@/components/layout/public-header";
import { PublicFooter } from "@/components/layout/public-footer";

export const dynamic = "force-dynamic";

const isComingSoon = process.env.COMING_SOON === "true";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // When COMING_SOON is set, skip header/footer — the page renders
  // the ComingSoon component directly (needs searchParams for ?app= lookup).
  if (isComingSoon) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen">
      <PublicHeader />
      <main className="container mx-auto px-4 py-16">{children}</main>
      <PublicFooter />
    </div>
  );
}
