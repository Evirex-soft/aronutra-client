import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import Notification from "@/models/Notification";
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
                const user = await User.findOne({ email: credentials?.email });

                // If no user exists at all
                if (!user) throw new Error("No account found with this email");

                // 2. If user exists but registered via Google (no password)
                if (user.provider === "google" || !user.password) {
                    throw new Error("This account is linked with Google. Please sign in using the Google button.");
                }

                const isMatch = await bcrypt.compare(credentials!.password, user.password);
                if (!isMatch) throw new Error("Invalid credentials");

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role, // Pass role to jwt callback
                };
            },
        }),
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async signIn({ user, account }) {
            // Logic for Google Users
            if (account?.provider === "google") {
                try {
                    await dbConnect();
                    const existingUser = await User.findOne({ email: user.email });

                    if (!existingUser) {
                        // Create new user if they don't exist
                        const newUser = await User.create({
                            name: user.name,
                            email: user.email,
                            image: user.image,
                            provider: "google",
                            role: "user",
                        });

                        // Create Admin Notification
                        await Notification.create({
                            title: "New Customer (Google)",
                            message: `${newUser.name} has joined the collective via Google.`,
                            type: "CUSTOMER",
                            link: `/customers/${newUser._id}`,
                        });
                    }
                    return true;
                } catch (error) {
                    console.error("Error saving Google user:", error);
                    return false;
                }
            }
            return true; // Allow credentials sign in
        },

        async jwt({ token, user, trigger, session }) {
            // On initial sign in
            if (user) {
                token.id = user.id;
                token.role = (user as any).role;
            }

            if (!token.role) {
                await dbConnect();
                const dbUser = await User.findOne({ email: token.email });
                if (dbUser) {
                    token.id = dbUser._id.toString();
                    token.role = dbUser.role;
                }
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
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
};