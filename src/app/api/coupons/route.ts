import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Coupon from "@/models/Coupon";

export async function GET() {
  try {
    await dbConnect();
    const now = new Date();

    // Fetch only active coupons that haven't expired
    const coupons = await Coupon.find({
      active: true,
      $or: [
        { expiresAt: { $exists: false } },
        { expiresAt: null },
        { expiresAt: { $gt: now } }
      ]
    }).sort({ createdAt: -1 });

    return NextResponse.json(coupons);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 });
  }
}