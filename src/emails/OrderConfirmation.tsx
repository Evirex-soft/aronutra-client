import {
    Html, Body, Container, Text, Heading, Hr, Section, Row, Column, Img
} from "@react-email/components";

export const OrderConfirmationEmail = ({ order, userEmail }: any) => (
    <Html>
        <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', padding: '20px' }}>
            <Container style={{ backgroundColor: '#006400', padding: '20px', borderRadius: '8px' }}>
                <Heading>Order Confirmed!</Heading>
                <Text>Hi {userEmail},</Text>
                <Text>Thank you for your purchase. Your order ID is <strong>#{order.orderId}</strong>.</Text>

                <Hr />

                <Section>
                    {order.items.map((item: any, index: number) => (
                        <Row key={index} style={{ marginBottom: '10px' }}>
                            <Column>
                                <Text style={{ margin: 0 }}>{item.name} x {item.quantity}</Text>
                            </Column>
                            <Column align="right">
                                <Text style={{ margin: 0 }}>₹{item.sellingPrice * item.quantity}</Text>
                            </Column>
                        </Row>
                    ))}
                </Section>

                <Hr />

                <Section>
                    <Row>
                        <Column><Text><strong>Total Amount:</strong></Text></Column>
                        <Column align="right"><Text><strong>₹{order.totalAmount}</strong></Text></Column>
                    </Row>
                </Section>

                <Text><strong>Shipping Address:</strong><br />
                    {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                </Text>

                <Text>We will notify you once your package is shipped.</Text>
            </Container>
        </Body>
    </Html>
);