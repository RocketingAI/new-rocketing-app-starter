"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSiteConfig } from "@/lib/config/config-context";
import { toast } from "sonner";

export default function SupportPage() {
  const siteConfig = useSiteConfig();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Wire to API endpoint
    await new Promise((r) => setTimeout(r, 1000));
    toast.success("Support request submitted. We'll get back to you soon.");
    (e.target as HTMLFormElement).reset();
    setIsSubmitting(false);
  };
  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Support</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Have a question or need help? Reach out and we&apos;ll get back to you.
        </p>
      </div>
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            Fill out the form below or email us at {siteConfig.support.email}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <Input id="name" name="name" placeholder="Your name" required />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">Subject</label>
              <Input id="subject" name="subject" placeholder="How can we help?" required />
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <Textarea id="message" name="message" placeholder="Describe your issue or question..." rows={5} required />
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
