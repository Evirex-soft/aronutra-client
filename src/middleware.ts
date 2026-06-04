export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/wishlist/:path*",
        // "/cart-checkout-address/:path*",
        "/order-confirmation/:path*",
        "/orders/:path*",
        "/profile/:path*",
    ],
};
