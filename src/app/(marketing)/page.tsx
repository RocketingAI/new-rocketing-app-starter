import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";
import { ComingSoon } from "@/components/marketing/coming-soon";
import { lookupCascadeByAppSlug } from "@/lib/cascade/lookup";

const isComingSoon = process.env.COMING_SOON === "true";

// Landing page — rendered inside the (marketing) layout.
// When COMING_SOON=true, renders the coming soon page instead.
// Supports ?app=yourdomain-ai to load cascade data from the platform DB.

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  if (isComingSoon) {
    const params = await searchParams;
    const appSlug = typeof params.app === "string" ? params.app : null;
    const cascadeData = appSlug ? await lookupCascadeByAppSlug(appSlug) : null;
    return <ComingSoon cascadeData={cascadeData} />;
  }

  return (
    <>
      <Hero />
      <Features />
    </>
  );
}
