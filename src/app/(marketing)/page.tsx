import { Hero } from "@/components/marketing/hero";
import { Features } from "@/components/marketing/features";

// Landing page — rendered inside the (marketing) layout which provides
// PublicHeader and PublicFooter. This is the canonical home page.

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}
