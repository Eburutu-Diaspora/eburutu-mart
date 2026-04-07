

export const metadata = {
  title: "Privacy Policy | EburutuMart",
  description: "How EburutuMart collects, uses, and protects your personal data under UK GDPR.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 text-sm leading-relaxed text-gray-800">
      <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-gray-500 mb-8">Last updated: 7 April 2025</p>

      <Section title="1. Who We Are">
        <p>
          EburutuMart ("<strong>we</strong>", "<strong>us</strong>", "<strong>our</strong>") is a free
          online marketplace connecting buyers and sellers within the African diaspora community.
          EburutuMart is operated as a sole trader / small business based in the United Kingdom.
        </p>
        <p className="mt-2">
          <strong>Data Controller contact:</strong>{" "}
          <a href="mailto:privacy@eburutumart.com" className="text-green-600 underline">
            privacy@eburutumart.com
          </a>
        </p>
        <p className="mt-2">
          We are committed to protecting your personal data in accordance with the{" "}
          <strong>UK General Data Protection Regulation (UK GDPR)</strong> and the{" "}
          <strong>Data Protection Act 2018</strong>.
        </p>
      </Section>

      <Section title="2. What Data We Collect">
        <p>We collect only the data necessary to operate the marketplace:</p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>
            <strong>Account registration:</strong> your name and email address.
          </li>
          <li>
            <strong>Seller profiles:</strong> business/display name, a short bio, and an optional
            profile avatar you upload.
          </li>
          <li>
            <strong>Listings:</strong> product titles, descriptions, prices, category, location
            (city / region only), and listing images you upload.
          </li>
          <li>
            <strong>Communications:</strong> messages sent between buyers and sellers through the
            platform.
          </li>
          <li>
            <strong>Technical data:</strong> server logs (IP address, browser type, pages visited)
            retained automatically by our hosting provider (Hostinger) and basic aggregate traffic
            statistics.
          </li>
        </ul>
        <p className="mt-3 font-semibold">What we do NOT collect:</p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>Payment card details or bank information — EburutuMart does not process payments.</li>
          <li>Government-issued ID numbers (unless voluntarily provided for seller verification).</li>
          <li>Sensitive personal data (race, health, religion, etc.) — please do not submit these.</li>
        </ul>
      </Section>

      <Section title="3. How We Use Your Data">
        <table className="w-full border-collapse text-xs mt-2">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-3 py-2 text-left">Purpose</th>
              <th className="border border-gray-300 px-3 py-2 text-left">Legal Basis (UK GDPR)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Create and manage your account", "Contract (Art. 6(1)(b))"],
              ["Display listings and seller profiles to buyers", "Contract (Art. 6(1)(b))"],
              ["Send transactional emails (email verification, password reset)", "Contract (Art. 6(1)(b))"],
              ["Facilitate buyer–seller messaging", "Contract (Art. 6(1)(b))"],
              ["Prevent fraud and abuse", "Legitimate interests (Art. 6(1)(f))"],
              ["Comply with legal obligations", "Legal obligation (Art. 6(1)(c))"],
              ["Improve the platform using aggregate analytics", "Legitimate interests (Art. 6(1)(f))"],
            ].map(([purpose, basis]) => (
              <tr key={purpose} className="even:bg-gray-50">
                <td className="border border-gray-300 px-3 py-2">{purpose}</td>
                <td className="border border-gray-300 px-3 py-2">{basis}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="4. Cookies &amp; Tracking">
        <p>We use only the following cookies:</p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>
            <strong>Session cookie</strong> — keeps you logged in during your visit (essential,
            deleted when you close your browser or log out).
          </li>
          <li>
            <strong>CSRF token</strong> — protects form submissions from cross-site attacks
            (essential, session-scoped).
          </li>
        </ul>
        <p className="mt-2">
          We do <strong>not</strong> use advertising cookies, Facebook Pixel, Google Analytics, or
          any third-party tracking scripts. Hostinger's hosting infrastructure may record standard
          server access logs; these are used solely for security and performance purposes.
        </p>
      </Section>

      <Section title="5. Third-Party Services">
        <p>We share data with the following trusted processors only to the extent necessary:</p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>
            <strong>Hostinger</strong> — website hosting and server infrastructure (EEA/UK data
            centres available).
          </li>
          <li>
            <strong>Supabase</strong> — cloud database and file storage for user data and uploaded
            images. Supabase is SOC 2 Type II certified.
          </li>
        
        </ul>
        <p className="mt-2">
          We do not sell, rent, or share your personal data with any other third parties for
          marketing purposes.
        </p>
      </Section>

      <Section title="6. Data Retention">
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>
            <strong>Active accounts:</strong> data is retained for as long as your account is open.
          </li>
          <li>
            <strong>Deleted accounts:</strong> personal data is erased within <strong>30 days</strong>{" "}
            of account deletion, except where retention is required by law.
          </li>
          <li>
            <strong>Server logs:</strong> retained for up to <strong>90 days</strong> for security
            purposes.
          </li>
          <li>
            <strong>Email verification tokens:</strong> expire and are deleted within{" "}
            <strong>24 hours</strong> of creation.
          </li>
        </ul>
      </Section>

      <Section title="7. Your Rights Under UK GDPR">
        <p>You have the right to:</p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li><strong>Access</strong> — request a copy of the personal data we hold about you.</li>
          <li><strong>Rectification</strong> — correct inaccurate or incomplete data.</li>
          <li><strong>Erasure</strong> ("right to be forgotten") — ask us to delete your data.</li>
          <li><strong>Restriction</strong> — ask us to limit how we use your data.</li>
          <li><strong>Portability</strong> — receive your data in a machine-readable format.</li>
          <li>
            <strong>Object</strong> — object to processing based on legitimate interests.
          </li>
          <li>
            <strong>Withdraw consent</strong> — where processing is based on consent, you may
            withdraw it at any time without affecting prior processing.
          </li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, email us at{" "}
          <a href="mailto:privacy@eburutumart.com" className="text-green-600 underline">
            privacy@eburutumart.com
          </a>
          . We will respond within <strong>one calendar month</strong> as required by UK GDPR.
        </p>
        <p className="mt-2">
          If you are unhappy with how we handle your data, you have the right to lodge a complaint
          with the{" "}
          <a
            href="https://ico.org.uk/make-a-complaint/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 underline"
          >
            Information Commissioner&apos;s Office (ICO)
          </a>
          , the UK supervisory authority for data protection.
        </p>
      </Section>

      <Section title="8. Data Security">
        <p>
          We take reasonable technical and organisational measures to protect your data, including:
        </p>
        <ul className="list-disc ml-5 mt-2 space-y-1">
          <li>HTTPS encryption for all data in transit.</li>
          <li>Passwords are hashed and never stored in plain text.</li>
          <li>Database access is restricted to authorised application services only.</li>
          <li>File uploads are stored in private Supabase Storage buckets with signed URLs.</li>
        </ul>
        <p className="mt-2">
          No method of transmission over the internet is 100% secure. In the unlikely event of a
          data breach that poses a risk to your rights, we will notify you and the ICO within{" "}
          <strong>72 hours</strong> as required by law.
        </p>
      </Section>

      <Section title="9. Children's Privacy">
        <p>
          EburutuMart is not directed at children under the age of <strong>13</strong>. We do not
          knowingly collect personal data from children. If you believe a child has provided us with
          their data, please contact us immediately and we will delete it.
        </p>
      </Section>

      <Section title="10. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. When we do, we will update the "Last
          updated" date at the top of this page and, for material changes, notify registered users
          by email. Continued use of EburutuMart after changes are posted constitutes acceptance of
          the updated policy.
        </p>
      </Section>

      <Section title="11. Contact Us">
        <p>
          For any privacy-related questions or to exercise your rights, please contact us at:
        </p>
        <p className="mt-2">
          <strong>EburutuMart</strong>
          <br />
          Email:{" "}
          <a href="mailto:privacy@eburutumart.com" className="text-green-600 underline">
            privacy@eburutumart.com
          </a>
        </p>
      </Section>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-semibold mb-3 border-b border-gray-200 pb-1">{title}</h2>
      {children}
    </section>
  );
}
