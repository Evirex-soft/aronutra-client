// app/privacy-policy/page.tsx
import PolicyLayout from "@/components/PolicyLayout";
import React from "react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <PolicyLayout title="Privacy Policy">
      <p>
        At <strong>AroNutra</strong>, we respect your privacy and are committed
        to protecting the personal information you share with us. This Privacy
        Policy explains how we collect, use, and safeguard your information when
        you visit our website or purchase our raw honey products.
      </p>

      <h2>Information We Collect</h2>
      <p>
        To provide you with the best shopping experience, we may collect the
        following types of information:
      </p>
      <ul className="list-disc pl-6">
        <li><strong>Personal details</strong> – such as your name, email address, phone number, and delivery address when you place an order.</li>
        <li><strong>Payment details</strong> – processed securely through trusted payment gateways (we do not store your full card details).</li>
        <li><strong>Usage data</strong> – such as your IP address, browser type, pages visited, and time spent on our site, to help us improve our services.</li>
        <li><strong>Cookies</strong> – small files stored on your device to remember your preferences and enhance your shopping experience.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>We use the information we collect for purposes such as:</p>
      <ul className="list-disc pl-6">
        <li>Processing and delivering your raw honey orders</li>
        <li>Providing customer support and responding to inquiries</li>
        <li>Improving our website, products, and services</li>
        <li>Sending order updates, promotional offers, and newsletters (you can opt out anytime)</li>
        <li>Detecting and preventing fraudulent or unauthorized activity</li>
      </ul>

      <h2>Cookies & Tracking</h2>
      <p>
        Our website uses cookies to personalize your shopping experience, track
        site performance, and analyze customer behavior. You can choose to
        disable cookies in your browser settings, but some features of our
        website may not function properly without them.
      </p>

      <h2>Data Security</h2>
      <p>
        We take data security seriously and use commercially reasonable measures
        to protect your personal information. However, no method of transmission
        over the internet or electronic storage is 100% secure, so we cannot
        guarantee absolute security.
      </p>

      <h2>Sharing Your Information</h2>
      <p>
        We do not sell or rent your personal data. We may share limited
        information with:
      </p>
      <ul className="list-disc pl-6">
        <li>Trusted service providers (such as payment gateways, delivery partners, and email services) to fulfill your orders</li>
        <li>Authorities or regulators if required by law</li>
      </ul>

      <h2>Your Choices</h2>
      <p>
        You can update or correct your personal details anytime by logging into
        your account. You may also unsubscribe from marketing emails using the
        link provided in our messages.
      </p>

      <h2>Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. Please note that
        we are not responsible for their privacy practices. We encourage you to
        read the privacy policies of those websites before sharing any
        information.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy or how your data is
        handled, please contact us at{" "}
        <a
          href="mailto:support@aronutra.com"
          className="text-blue-600 underline"
        >
          support@aronutra.com
        </a>.
      </p>
    </PolicyLayout>
  );
};

export default PrivacyPolicyPage;
