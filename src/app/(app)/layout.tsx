import { AppShell } from "@/components/layout/app-shell";

// Force dynamic rendering for all authenticated pages (Clerk requires runtime)
export const dynamic = "force-dynamic";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
