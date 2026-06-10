import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { resetPasswordSchema } from "@/utils/validations";


export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();
        const { token, password, confirmPassword } = body;

        // Server-side Zod Validation
        const validation = resetPasswordSchema.safeParse({ password, confirmPassword });

        if (!validation.success) {
            // Return the first validation error message found
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        if (!token) {
            return NextResponse.json({ error: "Security token is missing." }, { status: 400 });
        }

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid or expired token." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return NextResponse.json({ message: "Password updated successfully." });
    } catch (error) {
        return NextResponse.json({ error: "Failed to reset password." }, { status: 500 });
    }
}