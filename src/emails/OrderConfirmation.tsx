import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Text,
    Section,
    Row,
    Column,
    Hr,
} from "@react-email/components";
import * as React from "react";

interface OrderConfirmationEmailProps {
    order: any;
    userEmail: string;
}

export const OrderConfirmationEmail = ({
    order,
    userEmail,
}: OrderConfirmationEmailProps) => (
    <Html>
        <Head />
        <Preview>Your AroNutra order #{order.orderId} is confirmed</Preview>
        <Body style={main}>
            <Container style={container}>
                {/* Brand Header */}
                <Section style={headerSection}>
                    <Text style={brandLabel}>AroNutra Identity</Text>
                </Section>

                {/* Main Heading */}
                <Heading style={h1}>Order Confirmed</Heading>

                <Text style={text}>
                    Hi {userEmail},<br /><br />
                    Thank you for your purchase. We have received your order and are preparing it for dispatch.
                    Below are the details of your selection from the Collective.
                </Text>

                {/* Order ID Label */}
                <Section style={orderIdSection}>
                    <Text style={orderIdText}>REFERENCE ID: #{order.orderId}</Text>
                </Section>

                {/* Items Table */}
                <Section style={itemSection}>
                    {order.items.map((item: any, index: number) => (
                        <Row key={index} style={itemRow}>
                            <Column style={{ width: "70%" }}>
                                <Text style={itemName}>{item.name} <span style={itemQty}>x {item.quantity}</span></Text>
                            </Column>
                            <Column style={{ width: "30%", textAlign: "right" as const }}>
                                <Text style={itemPrice}>₹{item.sellingPrice * item.quantity}</Text>
                            </Column>
                        </Row>
                    ))}
                </Section>

                <Hr style={divider} />

                {/* Total Section */}
                <Section style={totalSection}>
                    <Row>
                        <Column>
                            <Text style={totalLabel}>TOTAL AMOUNT</Text>
                        </Column>
                        <Column align="right">
                            <Text style={totalAmount}>₹{order.totalAmount}</Text>
                        </Column>
                    </Row>
                </Section>

                {/* Information Grid */}
                <Section style={infoSection}>
                    <Row>
                        <Column style={infoColumn}>
                            <Text style={infoHeading}>Shipping Address</Text>
                            <Text style={infoContent}>
                                {order.shippingAddress.fullName}<br />
                                {order.shippingAddress.streetAddress}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}<br />
                                {order.shippingAddress.phone}
                            </Text>
                        </Column>
                        <Column style={infoColumn}>
                            <Text style={infoHeading}>Payment & Status</Text>
                            <Text style={infoContent}>
                                <strong>Method:</strong> {order.paymentDetails.method.toUpperCase()}<br />
                                <strong>Payment:</strong> {order.paymentDetails.status}<br />
                                <strong>Order:</strong> {order.status}
                            </Text>
                        </Column>
                    </Row>
                </Section>

                <Text style={footerText}>
                    You will receive another notification with tracking details once your package has been shipped.<br />
                    Exclusively for the AroNutra Collective.
                </Text>
            </Container>
        </Body>
    </Html>
);

export default OrderConfirmationEmail;

// --- STYLES (Matching Reset Password Template) ---

const main = {
    backgroundColor: "#052c22",
    fontFamily: 'serif',
};

const container = {
    margin: "0 auto",
    padding: "40px 20px",
    width: "600px",
};

const headerSection = {
    borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
    paddingBottom: "20px",
    marginBottom: "30px",
};

const brandLabel = {
    color: "#d4af37",
    textTransform: "uppercase" as const,
    letterSpacing: "4px",
    fontSize: "10px",
    fontWeight: "bold",
};

const h1 = {
    color: "#FDFCF8",
    fontSize: "32px",
    fontWeight: "light",
    fontStyle: "italic",
    margin: "30px 0",
};

const text = {
    color: "rgba(253, 252, 248, 0.7)",
    fontSize: "14px",
    lineHeight: "24px",
};

const orderIdSection = {
    backgroundColor: "rgba(212, 175, 55, 0.05)",
    padding: "12px",
    borderLeft: "2px solid #d4af37",
    margin: "24px 0",
};

const orderIdText = {
    color: "#d4af37",
    fontSize: "11px",
    letterSpacing: "1px",
    margin: 0,
};

const itemSection = {
    marginTop: "20px",
};

const itemRow = {
    borderBottom: "1px solid rgba(253, 252, 248, 0.05)",
};

const itemName = {
    color: "#FDFCF8",
    fontSize: "14px",
};

const itemQty = {
    color: "rgba(253, 252, 248, 0.4)",
    fontSize: "12px",
    marginLeft: "8px",
};

const itemPrice = {
    color: "#d4af37",
    fontSize: "14px",
    fontWeight: "bold",
};

const divider = {
    borderColor: "rgba(212, 175, 55, 0.2)",
    margin: "20px 0",
};

const totalSection = {
    padding: "10px 0",
};

const totalLabel = {
    color: "#FDFCF8",
    fontSize: "12px",
    letterSpacing: "2px",
    fontWeight: "bold",
};

const totalAmount = {
    color: "#d4af37",
    fontSize: "20px",
    fontWeight: "bold",
};

const infoSection = {
    margin: "30px 0",
};

const infoColumn = {
    paddingRight: "20px",
    verticalAlign: "top",
};

const infoHeading = {
    color: "#d4af37",
    fontSize: "11px",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
    fontWeight: "bold",
    marginBottom: "10px",
};

const infoContent = {
    color: "rgba(253, 252, 248, 0.7)",
    fontSize: "12px",
    lineHeight: "18px",
    margin: 0,
};

const footerText = {
    color: "rgba(253, 252, 248, 0.3)",
    fontSize: "10px",
    lineHeight: "18px",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
    marginTop: "40px",
};