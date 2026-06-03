import PolicyLayout from "@/components/PolicyLayout";
import React from "react";

const CookiesPolicyPage: React.FC = () => {
    return (<PolicyLayout title="Cookies Policy"> <p>
        At <strong>AroNutra</strong>, we use cookies and similar technologies to
        enhance your browsing experience, improve our website functionality,
        and better understand how visitors interact with our services. This
        Cookies Policy explains what cookies are, how we use them, and the
        choices available to you. </p>

        <h2>What Are Cookies?</h2>
        <p>
            Cookies are small text files stored on your device when you visit a
            website. They help websites remember your preferences, improve
            performance, and provide a more personalized experience.
        </p>

        <h2>How We Use Cookies</h2>
        <p>
            We use cookies for a variety of purposes, including:
        </p>
        <ul>
            <li>Ensuring the website functions properly.</li>
            <li>Remembering your preferences and settings.</li>
            <li>Keeping items in your shopping cart.</li>
            <li>Analyzing website traffic and user behavior.</li>
            <li>Improving website performance and user experience.</li>
            <li>Providing relevant promotions and content.</li>
        </ul>

        <h2>Types of Cookies We Use</h2>

        <h3>Essential Cookies</h3>
        <p>
            These cookies are necessary for the website to function properly.
            Without them, certain features such as shopping carts, account access,
            and secure checkout may not work.
        </p>

        <h3>Performance & Analytics Cookies</h3>
        <p>
            These cookies help us understand how visitors use our website by
            collecting anonymous information about page visits, traffic sources,
            and user interactions.
        </p>

        <h3>Functional Cookies</h3>
        <p>
            These cookies remember your preferences, such as language settings and
            previous interactions, to provide a more personalized experience.
        </p>

        <h3>Marketing Cookies</h3>
        <p>
            These cookies may be used to deliver relevant advertisements and measure
            the effectiveness of marketing campaigns.
        </p>

        <h2>Third-Party Cookies</h2>
        <p>
            Some cookies may be placed by trusted third-party services that help us
            operate our website, process payments, analyze traffic, or improve our
            services. These third parties have their own privacy and cookie
            policies.
        </p>

        <h2>Managing Cookies</h2>
        <p>
            Most web browsers allow you to control or disable cookies through their
            settings. Please note that disabling certain cookies may affect the
            functionality and performance of our website.
        </p>

        <h2>Your Consent</h2>
        <p>
            By continuing to use our website, you consent to our use of cookies as
            described in this Cookies Policy. You may withdraw your consent at any
            time by adjusting your browser settings.
        </p>

        <h2>Updates to This Policy</h2>
        <p>
            We may update this Cookies Policy from time to time to reflect changes
            in technology, legal requirements, or our business practices. Any
            updates will be posted on this page.
        </p>

        <h2>Contact Us</h2>
        <p>
            If you have any questions about our use of cookies, please contact us
            at{" "}
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

export default CookiesPolicyPage;
