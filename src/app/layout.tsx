import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { WishlistProvider } from "./contexts/WishlistContext";
import { CartProvider } from "./contexts/CartContext";
import SmoothScroll from "@/components/SmoothScroll";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AroNutra",
  description: "AroNutra - India's Finest Premium Raw Honey & Wellness",
  icons: {
    icon: [
      { url: "/images/fav-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/images/fav-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/fav-48x48.ico", sizes: "48x48", type: "image/png" },
      { url: "/images/fav-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/fav-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: "/images/apple-touch-icon.png",
  },
  manifest: "/images/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.variable} antialiased`}
      >
        <SmoothScroll />
        <WishlistProvider>
          <CartProvider>
            <NavBar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </WishlistProvider>

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </body>
    </html>
  );
}
