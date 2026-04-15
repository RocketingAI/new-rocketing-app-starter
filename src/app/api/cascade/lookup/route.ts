import { NextRequest, NextResponse } from "next/server";
import { lookupCascadeByAppSlug } from "@/lib/cascade/lookup";

// GET /api/cascade/lookup?app=yourdomain-ai
export async function GET(req: NextRequest) {
  const appSlug = req.nextUrl.searchParams.get("app");

  if (!appSlug) {
    return NextResponse.json(
      { error: "Missing ?app= parameter" },
      { status: 400 }
    );
  }

  if (!process.env.PLATFORM_MONGODB_URI) {
    return NextResponse.json(
      { error: "Platform database not configured" },
      { status: 503 }
    );
  }

  const data = await lookupCascadeByAppSlug(appSlug);

  if (!data) {
    return NextResponse.json(
      { error: `No cascade found for "${appSlug}"` },
      { status: 404 }
    );
  }

  return NextResponse.json({ data });
}
