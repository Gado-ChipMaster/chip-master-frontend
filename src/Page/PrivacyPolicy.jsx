import Navbar from "../components/NavBar";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />

      <main className="w-full min-h-screen bg-white dark:bg-slate-900 transition-colors overflow-x-hidden">
        <div className="w-[90%] md:w-[80%] mx-auto px-4 md:px-6 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Privacy Policy
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Last updated: January 2026
            </p>
          </div>

          <div className="space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed md:max-w-4xl">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                1. Introduction
              </h2>
              <p>
                We value your privacy and are committed to protecting your
                personal information. This Privacy Policy explains how we
                collect, use, and safeguard your data when you use our website
                and services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                2. Information We Collect
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal details such as name, email address, and phone number.</li>
                <li>Account information when you register or place an order.</li>
                <li>Usage data including pages visited and interactions.</li>
                <li>Cookies and similar tracking technologies.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                3. How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and improve our services.</li>
                <li>To process orders and manage user accounts.</li>
                <li>To communicate updates, offers, or support messages.</li>
                <li>To enhance security and prevent fraud.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                4. Cookies
              </h2>
              <p>
                We use cookies to enhance your browsing experience. You can
                choose to disable cookies through your browser settings, but
                some features of the site may not function properly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                5. Data Protection
              </h2>
              <p>
                We implement industry-standard security measures to protect your
                personal data. However, no method of transmission over the
                internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                6. Third-Party Services
              </h2>
              <p>
                We may use third-party tools or services that collect, monitor,
                and analyze data to improve our platform. These services have
                their own privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                7. Your Rights
              </h2>
              <p>
                You have the right to access, update, or request deletion of
                your personal data. If you wish to exercise these rights, please
                contact us.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                8. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated revision date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                9. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please
                contact us through the Contact page.
              </p>
            </section>
          </div>
        </div>
      </main>

    </>
  );
};

export default PrivacyPolicy;
