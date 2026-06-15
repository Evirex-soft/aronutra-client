import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Text,
} from "@react-email/components";

interface NewsletterWelcomeProps {
    email: string;
}

export default function NewsletterWelcome({
    email,
}: NewsletterWelcomeProps) {
    return (
        <Html>
            <Head />
            <Preview>Welcome to the AroNutra Wellness Collective</Preview>

            <Body style={main}>
                <Container style={container}>
                    <Text style={brandLabel}>
                        AroNutra Wellness Private Limited
                    </Text>

                    <Heading style={heading}>
                        Welcome to Our Wellness Collective
                    </Heading>

                    <Text style={text}>
                        Thank you for subscribing, <strong>{email}</strong>.
                    </Text>

                    <Text style={text}>
                        You'll be among the first to hear about:
                    </Text>

                    <Text style={text}>
                        • New Honey Collections<br />
                        • Wellness Insights<br />
                        • Exclusive Launches<br />
                        • Seasonal Offers
                    </Text>

                    <Text style={footer}>
                        Thank you for joining the AroNutra journey.
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}

const main = {
    backgroundColor: "#052c22",
    fontFamily: "serif",
};

const container = {
    margin: "0 auto",
    padding: "40px 20px",
    width: "600px",
};

const brandLabel = {
    color: "#d4af37",
    letterSpacing: "3px",
    textTransform: "uppercase" as const,
};

const heading = {
    color: "#FDFCF8",
};

const text = {
    color: "rgba(253,252,248,0.75)",
    lineHeight: "24px",
};

const footer = {
    color: "#d4af37",
    marginTop: "30px",
};