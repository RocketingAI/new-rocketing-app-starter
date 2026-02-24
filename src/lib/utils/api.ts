import { NextResponse } from "next/server";
import type { ApiResponse, PaginatedResponse } from "@/types/api";

export function apiSuccess<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(error: string, status = 400): NextResponse<ApiResponse> {
  return NextResponse.json({ success: false, error }, { status });
}

export function apiPaginated<T>(
  data: T[],
  pagination: PaginatedResponse["pagination"],
): NextResponse<PaginatedResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    pagination,
  });
}
