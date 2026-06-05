import dbConnect from "@/lib/mongoose";
import User from "@/models/User";

export async function getUserProfile(email: string) {
    try {
        await dbConnect();
        const user = await User.findOne({ email }).lean();
        if (!user) return null;
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        return null;
    }
}