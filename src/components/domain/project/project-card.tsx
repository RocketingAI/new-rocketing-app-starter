"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";

interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    status: string;
    priority: string;
    dueDate: string | null;
  };
}

const statusColors: Record<string, "default" | "secondary" | "outline"> = {
  draft: "secondary",
  active: "default",
  completed: "outline",
  archived: "secondary",
};

const priorityColors: Record<string, string> = {
  low: "text-muted-foreground",
  medium: "text-foreground",
  high: "text-orange-400",
  urgent: "text-red-400",
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project._id}`}>
      <Card className="transition-colors hover:border-primary/50">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">{project.title}</CardTitle>
            <Badge variant={statusColors[project.status] || "secondary"}>
              {project.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm">
            <span className={priorityColors[project.priority] || ""}>
              {project.priority}
            </span>
            {project.dueDate && (
              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(project.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
