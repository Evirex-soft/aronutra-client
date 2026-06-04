import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, password, phone } = await req.json();

        await dbConnect();

        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
        }

        // 2. Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // 3. Create the user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            phone,
            provider: "credentials"
        });

        return NextResponse.json({ message: "User registered successfully", userId: newUser._id }, { status: 201 });
    } catch (error: any) {
        console.error("SIGNUP_ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}