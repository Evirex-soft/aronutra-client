import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();
        const body = await req.json();

        const { type, ...data } = body;

        let updateQuery = {};

        if (type === "personal") {
            // Update name and phone
            updateQuery = {
                $set: {
                    name: data.name,
                    phone: data.phone
                }
            };
        } else if (type === "address") {
            updateQuery = {
                $set: {
                    "address.street": data.street,
                    "address.city": data.city,
                    "address.pinCode": data.pinCode,
                }
            };
        }

        const updatedUser = await User.findOneAndUpdate(
            { email: session.user.email },
            updateQuery,
            { new: true }
        );

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser
        });

    } catch (error: any) {
        console.error("UPDATE_USER_ERROR:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}