import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db/client";
import { Project } from "@/lib/db/models/project.model";
import { apiSuccess, apiError } from "@/lib/utils/api";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth();
  if (!userId) return apiError("Unauthorized", 401);
  await connectDB();
  const { id } = await params;
  const project = await Project.findOne({ _id: id, userId }).lean();
  if (!project) return apiError("Not found", 404);
  return apiSuccess(project);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth();
  if (!userId) return apiError("Unauthorized", 401);
  await connectDB();
  const { id } = await params;
  const body = await request.json();
  const project = await Project.findOneAndUpdate(
    { _id: id, userId },
    { $set: body },
    { new: true },
  ).lean();
  if (!project) return apiError("Not found", 404);
  return apiSuccess(project);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { userId } = await auth();
  if (!userId) return apiError("Unauthorized", 401);
  await connectDB();
  const { id } = await params;
  const project = await Project.findOneAndDelete({ _id: id, userId });
  if (!project) return apiError("Not found", 404);
  return apiSuccess({ deleted: true });
}
