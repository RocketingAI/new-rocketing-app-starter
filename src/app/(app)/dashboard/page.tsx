import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatPanel } from "@/components/chat/chat-panel";
import { siteConfig } from "@/../config/site.config";
import { FolderKanban, BarChart3, Clock, Users } from "lucide-react";

// CUSTOMIZE: Replace stat cards with app-specific metrics
const stats = [
  { title: "Total Projects", value: "0", icon: FolderKanban, change: null },
  { title: "Active", value: "0", icon: BarChart3, change: null },
  { title: "Due Soon", value: "0", icon: Clock, change: null },
  { title: "Team Members", value: "1", icon: Users, change: null },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to {siteConfig.name}</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No activity yet. Create your first project to get started.
            </p>
          </CardContent>
        </Card>
        <div className="h-[400px]">
          <ChatPanel />
        </div>
      </div>
    </div>
  );
}
