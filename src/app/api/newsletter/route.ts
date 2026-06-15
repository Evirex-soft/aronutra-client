import Newsletter from "@/models/NewsLetter";
import { Resend } from "resend";
import dbConnect from "@/lib/mongoose";
import NewsletterWelcome from "@/emails/NewsLetterWelcome";
import { newsletterSchema } from "@/utils/validations";
import { render } from "@react-email/render";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();

        const validatedData = newsletterSchema.parse(body);

        const exists = await Newsletter.findOne({ email: validatedData.email });

        if (exists) {
            return Response.json({ message: "Already subscribed" }, { status: 400 })
        }

        await Newsletter.create({ email: validatedData.email });

        try {
            const emailHtml = await render(
                NewsletterWelcome({
                    email: validatedData.email,
                })
            );

            await resend.emails.send({
                from: "contact@aronutra.com",
                to: [validatedData.email],
                subject: "Welcome to AroNutra Wellness",
                html: emailHtml,
            });
        } catch (emailError) {
            console.error("Newsletter email failed:", emailError);
        }

        return Response.json({
            success: true,
            message: "Subscribed successfully"
        })
    } catch (error) {
        console.error("NEWSLETTER ERROR:", error);

        return Response.json(
            {
                message:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong",
            },
            { status: 500 }
        );
    }
}