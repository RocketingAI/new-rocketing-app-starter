import { getSiteConfig } from "@/lib/config/loader";

export default async function DataPolicyPage() {
  const siteConfig = await getSiteConfig();
  return (
    <div className="prose prose-invert mx-auto max-w-3xl">
      <h1>Data Policy</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Data Collection</h2>
      <p>
        {siteConfig.name} collects data necessary to provide the Service, including account
        information, usage data, and content you create within the platform.
      </p>

      <h2>2. Data Storage</h2>
      <p>
        Your data is stored securely on cloud infrastructure with encryption at rest and
        in transit. We use MongoDB Atlas for database storage and industry-standard
        security practices.
      </p>

      <h2>3. Data Retention</h2>
      <p>
        We retain your data for as long as your account is active. Upon account deletion,
        your data will be permanently removed within 30 days, except where retention is
        required by law.
      </p>

      <h2>4. Data Portability</h2>
      <p>
        You have the right to export your data at any time. Contact us at{" "}
        {siteConfig.support.email} to request a data export.
      </p>

      <h2>5. Data Deletion</h2>
      <p>
        You may request deletion of your data at any time by contacting{" "}
        {siteConfig.support.email}. We will process deletion requests within 30 days.
      </p>

      <h2>6. Third-Party Data Sharing</h2>
      <p>
        We share data with third-party services only as necessary to operate the Service:
      </p>
      <ul>
        <li>Authentication provider (Clerk) — account and session data</li>
        <li>Payment processor (Stripe) — billing and subscription data</li>
        <li>AI services (OpenAI) — chat messages for AI processing</li>
        <li>Hosting provider (Vercel) — application logs and analytics</li>
      </ul>

      <h2>7. AI Data Usage</h2>
      <p>
        Messages sent to the AI assistant are processed by OpenAI. We do not use your
        conversations to train AI models. Chat history is stored for your convenience
        and can be deleted upon request.
      </p>

      <h2>8. Contact</h2>
      <p>
        For data-related questions or requests, contact us at {siteConfig.support.email}.
      </p>
    </div>
  );
}
