export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/wishlist/:path*",
        "/order-confirmation/:path*",
        "/orders/:path*",
        "/profile/:path*",
    ],
};
