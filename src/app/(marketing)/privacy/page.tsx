import { siteConfig } from "@/../config/site.config";

export default function PrivacyPage() {
  return (
    <div className="prose prose-invert mx-auto max-w-3xl">
      <h1>Privacy Policy</h1>
      <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect information you provide directly (name, email, payment info) and information
        collected automatically (usage data, device info, cookies).
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide and maintain the Service</li>
        <li>Process payments and manage subscriptions</li>
        <li>Send important service notifications</li>
        <li>Improve the Service and user experience</li>
        <li>Comply with legal obligations</li>
      </ul>

      <h2>3. Data Sharing</h2>
      <p>
        We do not sell your personal data. We may share data with third-party service providers
        (payment processing, hosting, analytics) who assist in operating the Service.
      </p>

      <h2>4. Data Security</h2>
      <p>
        We implement reasonable security measures to protect your information. However, no method
        of transmission over the Internet is 100% secure.
      </p>

      <h2>5. Your Rights</h2>
      <p>
        You have the right to access, update, or delete your personal information. Contact us
        at {siteConfig.support.email} to exercise these rights.
      </p>

      <h2>6. Cookies</h2>
      <p>
        We use cookies and similar technologies to maintain sessions, remember preferences, and
        understand usage patterns.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. We will notify you of significant changes
        via email or in-app notification.
      </p>

      <h2>8. Contact</h2>
      <p>
        For privacy-related questions, contact us at {siteConfig.support.email}.
      </p>
    </div>
  );
}
