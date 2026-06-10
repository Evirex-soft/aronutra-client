import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Text,
    Section,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
    userEmail: string;
    resetLink: string;
}

export const ResetPasswordEmail = ({
    userEmail,
    resetLink,
}: ResetPasswordEmailProps) => (
    <Html>
        <Head />
        <Preview>Reset your AroNutra Membership Password</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={headerSection}>
                    <Text style={brandLabel}>AroNutra Identity</Text>
                </Section>
                <Heading style={h1}>Password Reset Protocol</Heading>
                <Text style={text}>
                    A request has been made to access your membership account for <strong>{userEmail}</strong>.
                    If you did not initiate this request, please ignore this email.
                </Text>
                <Section style={buttonContainer}>
                    <Link style={button} href={resetLink}>
                        Reset Password
                    </Link>
                </Section>
                <Text style={footerText}>
                    This link will expire in 1 hour for your security.
                    <br />
                    Exclusively for the AroNutra Collective.
                </Text>
            </Container>
        </Body>
    </Html>
);

export default ResetPasswordEmail;

// Styles matching your Luxury Green/Gold Theme
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
}

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

const buttonContainer = {
    padding: "30px 0",
};

const button = {
    backgroundColor: "#d4af37",
    borderRadius: "0px",
    color: "#052c22",
    fontSize: "12px",
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "block",
    padding: "16px",
    letterSpacing: "2px",
    textTransform: "uppercase" as const,
};

const footerText = {
    color: "rgba(253, 252, 248, 0.3)",
    fontSize: "10px",
    lineHeight: "18px",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
};