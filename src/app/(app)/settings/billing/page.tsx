import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and billing details</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Current Plan
            <Badge variant="secondary">Free</Badge>
          </CardTitle>
          <CardDescription>
            You are currently on the Free plan.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border/40 p-4">
            <div>
              <p className="font-medium">Free Plan</p>
              <p className="text-sm text-muted-foreground">Basic features included</p>
            </div>
            <p className="text-2xl font-bold">$0</p>
          </div>
          <Button asChild>
            <a href="/pricing">Upgrade Plan</a>
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Billing Portal</CardTitle>
          <CardDescription>
            Access the Stripe billing portal to manage payment methods, invoices, and subscriptions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" disabled>
            Open Billing Portal
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            Available after upgrading to a paid plan.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
