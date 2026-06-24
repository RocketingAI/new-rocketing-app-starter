// ─── PROTECTED: Do not modify ──────────────────────────────────
// Next.js proxy — handles auth routing via Clerk.
// Uses proxy.ts (Node.js runtime) instead of middleware.ts (Edge)
// to avoid Vercel edge function module validation issues with Clerk.
// ────────────────────────────────────────────────────────────────

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/projects(.*)",
  "/settings(.*)",
  "/api/v1/(.*)",
  "/api/chat(.*)",
  "/api/user/(.*)",
]);

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/pricing(.*)",
  "/support(.*)",
  "/terms(.*)",
  "/privacy(.*)",
  "/data-policy(.*)",
  "/api/webhooks/(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req) && isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
