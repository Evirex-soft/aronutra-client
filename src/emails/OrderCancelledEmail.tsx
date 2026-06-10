import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Text,
    Hr,
} from "@react-email/components";
import * as React from "react";

interface OrderCancelledEmailProps {
    orderId: string;
    customerName: string;
    totalAmount: number;
    refundInitiated: boolean;
}

export const OrderCancelledEmail = ({
    orderId,
    customerName,
    totalAmount,
    refundInitiated,
}: OrderCancelledEmailProps) => (
    <Html>
        <Head />
        <Preview>Order Cancellation Confirmation - #{orderId}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={headerSection}>
                    <Text style={brandLabel}>AroNutra Collective</Text>
                </Section>

                <Heading style={h1}>Order Cancelled</Heading>

                <Text style={text}>
                    Dear {customerName},
                </Text>

                <Text style={text}>
                    This email confirms that your order <strong>#{orderId}</strong> has been successfully cancelled as per your request.
                </Text>

                <Section style={infoBox}>
                    <Text style={infoText}>
                        <strong>Amount:</strong> ₹{totalAmount.toLocaleString()}
                    </Text>
                    {refundInitiated ? (
                        <Text style={successText}>
                            <strong>Refund Status:</strong> A full refund has been initiated to your original payment method. It should reflect in your account within 5-7 business days.
                        </Text>
                    ) : (
                        <Text style={infoText}>
                            <strong>Refund Status:</strong> Not applicable (Cash on Delivery).
                        </Text>
                    )}
                </Section>

                <Hr style={hr} />

                <Text style={footerText}>
                    If you didn't request this cancellation or have further questions, please contact our concierge at support@aronutra.com.
                </Text>

                <Text style={signature}>
                    Stay Wellness-Focused,<br />
                    The AroNutra Team
                </Text>
            </Container>
        </Body>
    </Html>
);

export default OrderCancelledEmail;

const main = { backgroundColor: "#052c22", fontFamily: "serif", padding: "40px 0" };
const container = { margin: "0 auto", padding: "40px", width: "600px", backgroundColor: "#052c22", border: "1px solid rgba(212, 175, 55, 0.2)" };
const headerSection = { borderBottom: "1px solid rgba(212, 175, 55, 0.2)", paddingBottom: "20px", marginBottom: "30px" };
const brandLabel = { color: "#d4af37", textTransform: "uppercase" as const, letterSpacing: "4px", fontSize: "10px", fontWeight: "bold", margin: "0" };
const h1 = { color: "#FDFCF8", fontSize: "28px", fontWeight: "light", fontStyle: "italic", margin: "30px 0" };
const text = { color: "rgba(253, 252, 248, 0.8)", fontSize: "14px", lineHeight: "24px" };
const infoBox = { backgroundColor: "rgba(253, 252, 248, 0.03)", padding: "20px", borderRadius: "8px", margin: "20px 0" };
const infoText = { color: "#FDFCF8", fontSize: "13px", margin: "5px 0" };
const successText = { color: "#34d399", fontSize: "13px", margin: "5px 0", lineHeight: "20px" };
const hr = { borderColor: "rgba(212, 175, 55, 0.1)", margin: "30px 0" };
const footerText = { color: "rgba(253, 252, 248, 0.4)", fontSize: "11px", lineHeight: "18px" };
const signature = { color: "#d4af37", fontSize: "12px", fontStyle: "italic", marginTop: "20px" };