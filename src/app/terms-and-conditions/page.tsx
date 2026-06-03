import PolicyLayout from "@/components/PolicyLayout";
import React from "react";

const TermsAndConditionsPage: React.FC = () => {
  return (
    <PolicyLayout title="Terms & Conditions">
      <p>
        Welcome to <strong>AroNutra</strong>. These Terms and Conditions
        ("Terms") outline the rules and regulations for the use of our website
        and services. By accessing or using our website, you agree to comply
        with and be bound by these Terms. If you do not agree with any part of
        these Terms, please do not use our website or services.
      </p>

      <h2>Accounts</h2>
      <p>
        When you create an account with us, you must provide accurate, complete,
        and up-to-date information at all times. Failure to do so may result in
        the suspension or termination of your account.
      </p>
      <p>
        You are responsible for maintaining the confidentiality of your account
        login details and for all activities that occur under your account.
      </p>
      <p>
        Please notify us immediately if you suspect any unauthorized access or
        use of your account.
      </p>

      <h2>Products & Orders</h2>
      <p>
        All products listed on our website are subject to availability. We
        reserve the right to limit the quantities of any products or refuse any
        order at our discretion.
      </p>
      <p>
        Prices for our products are subject to change without prior notice.
        While we strive to provide accurate product descriptions and pricing,
        errors may occur, and we reserve the right to correct them at any time.
      </p>

      <h2>Payments</h2>
      <p>
        By placing an order, you agree to provide valid payment details. We use
        secure payment gateways to process all transactions. AroNutra is not
        responsible for any issues arising from your payment provider.
      </p>

      <h2>Shipping & Delivery</h2>
      <p>
        Delivery timelines provided on our website are estimates and may vary
        depending on your location and external factors. We are not responsible
        for delays caused by courier partners, weather, or other
        circumstances beyond our control.
      </p>

      <h2>Returns & Refunds</h2>
      <p>
        Please refer to our <a href="/refund-policy" className="text-blue-600 underline">Refund Policy</a> page for details on
        returns, refunds, and exchanges.
      </p>

      <h2>Intellectual Property</h2>
      <p>
        All content on this website, including logos, text, images, and
        graphics, is the property of AroNutra and is protected by applicable
        copyright and trademark laws. You may not reproduce, distribute, or use
        our content without prior written permission.
      </p>

      <h2>Links to Third-Party Sites</h2>
      <p>
        Our website may contain links to third-party websites. We are not
        responsible for the content, policies, or practices of any third-party
        sites and encourage you to read their terms and privacy policies.
      </p>

      <h2>Termination</h2>
      <p>
        We may suspend or terminate your account at any time, without prior
        notice, if you breach these Terms or engage in activities harmful to
        AroNutra or other users.
      </p>

      <h2>Governing Law</h2>
      <p>
        These Terms shall be governed by and interpreted in accordance with the
        laws of Kerala, India.
      </p>

      <h2>Changes to These Terms</h2>
      <p>
        We may update or modify these Terms at any time. Any changes will be
        posted on this page. By continuing to use our website after changes are
        made, you agree to be bound by the updated Terms.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at{" "}
        <a href="mailto:support@aronutra.com" className="text-blue-600 underline">
          support@aronutra.com
        </a>.
      </p>
    </PolicyLayout>
  );
};

export default TermsAndConditionsPage;
