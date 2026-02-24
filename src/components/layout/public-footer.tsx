import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { siteConfig } from "@/../config/site.config";
import { navigationConfig } from "@/../config/navigation.config";

export function PublicFooter() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">{siteConfig.description}</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Product</h3>
            <nav className="flex flex-col space-y-2">
              {navigationConfig.footer.product.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Company</h3>
            <nav className="flex flex-col space-y-2">
              {navigationConfig.footer.company.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">Support</h3>
            <p className="text-sm text-muted-foreground">
              {siteConfig.support.email}
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {siteConfig.legal.companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
