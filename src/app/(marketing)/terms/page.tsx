import { siteConfig } from "@/../config/site.config";

export default function TermsPage() {
  return (
    <div className="prose prose-invert mx-auto max-w-3xl">
      <h1>Terms of Service</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing and using {siteConfig.name} (&quot;the Service&quot;), you agree to be bound
        by these Terms of Service. If you do not agree, please do not use the Service.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        {siteConfig.name} provides {siteConfig.description.toLowerCase()}. The Service is owned
        and operated by {siteConfig.legal.companyName}.
      </p>

      <h2>3. User Accounts</h2>
      <p>
        You must create an account to access certain features. You are responsible for maintaining
        the confidentiality of your account credentials and for all activities under your account.
      </p>

      <h2>4. Acceptable Use</h2>
      <p>
        You agree not to misuse the Service, including but not limited to: violating laws,
        infringing intellectual property, transmitting malware, or interfering with the Service.
      </p>

      <h2>5. Payment Terms</h2>
      <p>
        Paid plans are billed in advance on a monthly or annual basis. Refunds are handled
        according to our refund policy. You may cancel your subscription at any time.
      </p>

      <h2>6. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, {siteConfig.legal.companyName} shall not be
        liable for any indirect, incidental, or consequential damages arising from your use of
        the Service.
      </p>

      <h2>7. Changes to Terms</h2>
      <p>
        We may update these terms from time to time. Continued use of the Service after changes
        constitutes acceptance of the new terms.
      </p>

      <h2>8. Contact</h2>
      <p>
        For questions about these terms, contact us at {siteConfig.support.email}.
      </p>
    </div>
  );
}
