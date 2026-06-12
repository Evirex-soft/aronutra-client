import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";
import crypto from "crypto";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { forgotPasswordSchema } from "@/utils/validations";
import ResetPasswordEmail from "@/emails/ResetPasswordEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();

        // 1. Server-side Validation
        const validation = forgotPasswordSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: validation.error.issues[0].message },
                { status: 400 }
            );
        }

        const email = body.email.toLowerCase();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "If an account exists, a reset link has been sent." });
        }

        // Generate Token
        const resetPasswordToken = crypto.randomBytes(32).toString("hex");
        const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now

        try {
            // 1. Assign the values
            user.resetPasswordToken = resetPasswordToken;
            user.resetPasswordExpires = resetPasswordExpires;

            // 2. SAVE with validation turned OFF for this specific operation
            await user.save({ validateBeforeSave: false });

        } catch (saveError: any) {
            console.error("MONGOOSE_SAVE_ERROR:", saveError.message);
            return NextResponse.json({ error: "Database update failed" }, { status: 500 });
        }

        const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password/${resetPasswordToken}`;

        const emailHtml = await render(ResetPasswordEmail({
            userEmail: user.email,
            resetLink: resetUrl
        }));


        // Send Email
        try {
            await resend.emails.send({
                from: 'contact@aronutra.com', // Use verified domain in prod
                to: email,
                subject: 'Action Required: Reset Your Password',
                html: emailHtml,
            });
        } catch (emailError) {
            console.error("Email failed to send:", emailError);
        }

        return NextResponse.json({ message: "Reset link sent successfully." });
    } catch (error) {
        return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
    }
}