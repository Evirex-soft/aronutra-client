import PolicyLayout from "@/components/PolicyLayout";
import React from "react";

const RefundPolicyPage: React.FC = () => {
  return (
    <PolicyLayout title="Refund Policy">
      <p>
        Thank you for shopping with <strong>AroNutra</strong>. We value your trust and want to ensure that your experience with our raw honey products is smooth and satisfying. 
      </p>
      <p>
        If for any reason you are not fully satisfied with your purchase, we are here to help.
      </p>

      <h2>Returns</h2>
      <p>
        You have <strong>7 calendar days</strong> from the date you received your order to request a return.
      </p>
      <p>
        To be eligible for a return, your item must be unopened, unused, and in the same condition as when you received it.
      </p>
      <p>The item must also be in its original packaging with proof of purchase.</p>
      <p>
        Please note that due to the perishable nature of raw honey, we cannot accept returns for opened or partially consumed jars.
      </p>

      <h2>Refunds</h2>
      <p>
        Once your return is received and inspected, we will notify you of the approval or rejection of your refund.
      </p>
      <p>
        If approved, your refund will be processed and credited back to your original method of payment within a few business days, depending on your card issuer or payment provider.
      </p>
      <p>
        In cases where a replacement is more suitable (e.g., if the product arrived damaged), we may offer an exchange instead of a refund.
      </p>

      <h2>Shipping</h2>
      <p>
        Customers are responsible for return shipping costs. Shipping charges from your original order are non-refundable.
      </p>
      <p>
        If you receive a refund, the cost of return shipping will be deducted from your refund amount.
      </p>

      <h2>Exceptions</h2>
      <ul className="list-disc pl-6">
        <li>Opened or partially consumed honey jars cannot be returned.</li>
        <li>Products purchased during promotional sales or with discounts may only be eligible for exchange, not refunds.</li>
        <li>Items received as gifts can be exchanged but not refunded to the original payment method.</li>
      </ul>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about our Refund & Return Policy or need help with your order, please reach out to us at{" "}
        <a href="mailto:support@aronutra.com" className="text-blue-600 underline">
          support@aronutra.com
        </a>.
      </p>
    </PolicyLayout>
  );
};

export default RefundPolicyPage;
