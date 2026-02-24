import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/client";
import { Project } from "@/lib/db/models/project.model";
import { apiSuccess, apiError, apiPaginated } from "@/lib/utils/api";

export async function GET(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return apiError("Unauthorized", 401);
  await connectDB();
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1"));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") || "20")));
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Project.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Project.countDocuments({ userId }),
  ]);
  return apiPaginated(data, {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  });
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();
  if (!userId) return apiError("Unauthorized", 401);
  await connectDB();
  const body = await request.json();
  const { title, description, status, priority, dueDate } = body;
  if (!title || typeof title !== "string" || title.trim().length === 0) {
    return apiError("Title is required", 400);
  }
  const project = await Project.create({
    title: title.trim(),
    description: description || null,
    status: status || "draft",
    priority: priority || "medium",
    dueDate: dueDate || null,
    userId,
  });
  return apiSuccess(project, 201);
}
