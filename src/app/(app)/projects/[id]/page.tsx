"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Project {
  _id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

const statusColors: Record<string, string> = {
  draft: "secondary",
  active: "default",
  completed: "outline",
  archived: "secondary",
};

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`/api/v1/projects/${params.id}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.success) setProject(res.data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [params.id]);
  if (loading) return <p className="text-muted-foreground">Loading...</p>;
  if (!project) return <p className="text-muted-foreground">Project not found.</p>;
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Button variant="ghost" onClick={() => router.push("/projects")}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
      </Button>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{project.title}</CardTitle>
            <Badge variant={statusColors[project.status] as "default" | "secondary" | "outline"}>
              {project.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {project.description && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
              <p className="mt-1">{project.description}</p>
            </div>
          )}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Priority</h3>
              <p className="mt-1 capitalize">{project.priority}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Due Date</h3>
              <p className="mt-1">
                {project.dueDate
                  ? new Date(project.dueDate).toLocaleDateString()
                  : "Not set"}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
              <p className="mt-1">{new Date(project.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Updated</h3>
              <p className="mt-1">{new Date(project.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
