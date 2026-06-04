import PolicyLayout from "@/components/PolicyLayout";
import React from "react";

const ShippingDeliveryPolicyPage: React.FC = () => {
    return (
        <PolicyLayout title="Shipment & Delivery Policy">
            <p>
                Thank you for choosing <strong>AroNutra</strong>. We are committed to
                delivering your orders safely and efficiently. Please read our Shipping
                & Delivery Policy to understand how your order will be processed and
                delivered.
            </p>

            <h2>Order Processing</h2>
            <p>
                All orders are processed within <strong>1–2 business days</strong> after
                payment confirmation.
            </p>
            <p>
                Orders placed on weekends or public holidays will be processed on the
                next working day.
            </p>
            <p>
                Once your order has been dispatched, you will receive a confirmation
                email or message containing shipment details and tracking information,
                where available.
            </p>

            <h2>Shipping Locations</h2>
            <p>
                We currently deliver across most locations within India. Delivery
                availability may vary depending on your location and courier service
                coverage.
            </p>

            <h2>Estimated Delivery Time</h2>
            <p>
                Delivery timelines may vary based on your location and courier partner.
            </p>

            <ul className="list-disc pl-6 space-y-2">
                <li>
                    <strong>Metro Cities:</strong> 2–5 business days
                </li>
                <li>
                    <strong>Other Cities & Towns:</strong> 3–7 business days
                </li>
                <li>
                    <strong>Remote Locations:</strong> 5–10 business days
                </li>
            </ul>

            <p>
                Please note that these are estimated delivery times and may vary due to
                unforeseen circumstances.
            </p>

            <h2>Shipping Charges</h2>
            <p>
                Shipping charges, if applicable, will be displayed during checkout
                before payment is completed.
            </p>
            <p>
                From time to time, we may offer free shipping promotions on eligible
                orders.
            </p>

            <h2>Delivery Delays</h2>
            <p>
                While we strive to deliver orders within the estimated timeframe,
                delays may occur due to:
            </p>

            <ul className="list-disc pl-6 space-y-2">
                <li>Natural disasters or adverse weather conditions.</li>
                <li>Public holidays and peak festive seasons.</li>
                <li>Courier service disruptions.</li>
                <li>Incorrect or incomplete shipping information provided by the customer.</li>
            </ul>

            <p>
                AroNutra shall not be held liable for delays caused by circumstances
                beyond our reasonable control.
            </p>

            <h2>Order Tracking</h2>
            <p>
                Once your order is shipped, tracking details will be shared via email,
                SMS, or WhatsApp (where applicable). Customers can use the tracking
                number provided by the courier partner to monitor shipment status.
            </p>

            <h2>Damaged or Lost Shipments</h2>
            <p>
                If your order arrives damaged, please contact us within{" "}
                <strong>48 hours of delivery</strong> and provide photographs of the
                package and product.
            </p>

            <p>
                If your shipment appears to be lost in transit, please contact us and
                we will coordinate with the courier partner to investigate the issue.
            </p>

            <h2>Incorrect Shipping Information</h2>
            <p>
                Customers are responsible for providing accurate shipping details at the
                time of placing an order.
            </p>
            <p>
                AroNutra will not be responsible for delivery failures or delays caused
                by incorrect addresses, incomplete information, or unavailable
                recipients.
            </p>

            <h2>Contact Us</h2>
            <p>
                If you have any questions regarding shipping, delivery, or tracking of
                your order, please contact us at{" "}
                <a
                    href="mailto:support@aronutra.com"
                    className="text-blue-600 underline"
                >
                    support@aronutra.com
                </a>
                .
            </p>

            <p>
                Our support team will respond to your queries within 24–48 business
                hours.
            </p>
        </PolicyLayout>
    );
};

export default ShippingDeliveryPolicyPage;