import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/login",
    },
});

export const config = {
    matcher: [
        "/wishlist/:path*",
        "/order-confirmation/:path*",
        "/orders/:path*",
        "/profile/:path*",
    ],
};
