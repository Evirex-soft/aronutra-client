import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),

        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {
                await dbConnect();

                const user = await User.findOne({
                    email: credentials?.email,
                });

                if (!user || !user.password) {
                    throw new Error("Invalid credentials");
                }

                const isMatch = await bcrypt.compare(
                    credentials!.password,
                    user.password
                );

                if (!isMatch) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,

                };
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role;
            }
            return session;
        },

        async signIn({ user, account }) {
            if (account?.provider === "google") {
                await dbConnect();

                const existingUser = await User.findOne({
                    email: user.email,
                });

                if (!existingUser) {
                    await User.create({
                        name: user.name,
                        email: user.email,
                        image: user.image,
                        provider: "google",

                    });
                }
            }
            return true;
        },
    },

    pages: {
        signIn: "/login",
    },

    secret: process.env.NEXTAUTH_SECRET,
};

// Next.js App Router specific export
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };