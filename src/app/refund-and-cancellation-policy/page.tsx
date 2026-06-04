import PolicyLayout from "@/components/PolicyLayout";
import React from "react";

const CancellationRefundPolicyPage: React.FC = () => {
  return (
    <PolicyLayout title="Refund & Cancellation Policy">
      <p>
        Thank you for shopping with <strong>AroNutra</strong>. We are committed
        to providing high-quality natural honey products and ensuring customer
        satisfaction. Please read our Cancellation & Refund Policy carefully
        before placing an order.
      </p>

      <h2>Order Cancellation</h2>

      <h3>Before Shipment</h3>
      <p>
        Orders may be cancelled within <strong>12 hours</strong> of placement or
        before they are shipped, whichever occurs first.
      </p>
      <p>
        If your order has not yet been dispatched, you will receive a{" "}
        <strong>full refund</strong> to your original payment method.
      </p>

      <h3>After Shipment</h3>
      <p>
        Once an order has been shipped, it cannot be cancelled. However, if you
        are eligible under our return policy, you may request a return after
        receiving the product.
      </p>

      <h2>Returns</h2>
      <p>
        Due to the consumable and perishable nature of honey products, we only
        accept returns under the following circumstances:
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>The product received is damaged during transit.</li>
        <li>The wrong product was delivered.</li>
        <li>
          The product is defective or unfit for consumption upon arrival.
        </li>
      </ul>

      <p className="mt-4">
        To initiate a return request, please contact us within{" "}
        <strong>48 hours of delivery</strong> and provide:
      </p>

      <ul className="list-disc pl-6 space-y-2">
        <li>Your order number.</li>
        <li>Clear photographs of the product and packaging.</li>
        <li>A brief description of the issue.</li>
      </ul>

      <p>
        We reserve the right to reject return requests that do not meet the
        above conditions.
      </p>

      <h2>Non-Returnable Items</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Opened or partially consumed honey jars.</li>
        <li>Products damaged due to improper handling by the customer.</li>
        <li>Products returned without original packaging.</li>
        <li>
          Products purchased during clearance or special promotional sales
          (unless damaged or defective).
        </li>
      </ul>

      <h2>Refunds</h2>
      <p>
        Once your return request is reviewed and approved, refunds will be
        processed to the original payment method.
      </p>

      <p>
        Refunds are typically completed within{" "}
        <strong>5–10 business days</strong>, depending on your bank or payment
        provider.
      </p>

      <p>
        Shipping charges are non-refundable unless the return is due to our
        error or a damaged product.
      </p>

      <h2>Replacements</h2>
      <p>
        In cases where the product is damaged, defective, or incorrect, we may
        offer a replacement instead of a refund, depending on product
        availability.
      </p>

      <h2>Failed or Duplicate Payments</h2>
      <p>
        If your payment is deducted but the order is not confirmed, or if a
        duplicate payment occurs, please contact us. After verification, the
        amount will be refunded to the original payment method.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions regarding cancellations, returns, refunds, or
        replacements, please contact us at{" "}
        <a
          href="mailto:support@aronutra.com"
          className="text-blue-600 underline"
        >
          support@aronutra.com
        </a>
        .
      </p>

      <p>
        We aim to respond to all customer queries within 24–48 business hours.
      </p>
    </PolicyLayout>
  );
};

export default CancellationRefundPolicyPage;