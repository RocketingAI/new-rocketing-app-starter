import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { ThemeInjector } from "@/components/providers/theme-injector";
import { getAllConfigs } from "@/lib/config/loader";
import { ConfigProvider } from "@/lib/config/config-context";
import "./globals.css";

// Force dynamic rendering — ClerkProvider requires runtime env vars
export const dynamic = "force-dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getAllConfigs();
  return {
    title: {
      default: site.name,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    openGraph: {
      title: site.name,
      description: site.description,
      url: site.url,
      siteName: site.name,
      images: [{ url: site.ogImage }],
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const configs = await getAllConfigs();
  return (
    <ClerkProvider
      appearance={{ baseTheme: dark }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <ConfigProvider configs={configs}>
              <ThemeInjector />
              {children}
              <Toaster richColors position="top-right" />
            </ConfigProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
