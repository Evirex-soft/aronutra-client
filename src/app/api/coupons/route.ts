import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: "Database connection not established" }, { status: 503 });
    }
    const db = client.db("test");
    const couponsCollection = db.collection("coupons");

    const today = new Date();
    const coupons = await couponsCollection.find({
      expiry: { $gte: today },
      isActive: { $ne: false }
    }).toArray();

    return NextResponse.json(
      coupons.map(c => ({
        id: c._id.toString(),
        code: c.code,
        title: c.title,
        description: c.description,
        discount: c.discount,
        discountType: c.discountType || "percentage",
        minimumAmount: c.minimumAmount || 0,
        maxDiscount: c.maxDiscount,
        expiryDate: c.expiry,
        isActive: c.isActive ?? true
      }))
    );
  } catch (error) {
    console.error("Coupon API GET Error:", error);
    return NextResponse.json({ error: "Failed to handle coupons" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: "Database connection not established" }, { status: 503 });
    }
    const db = client.db("test");
    const couponsCollection = db.collection("coupons");

    const body = await req.json();
    const { code, cartTotal: total } = body;

    if (!code || typeof total !== "number") {
      return NextResponse.json({ valid: false, message: "Missing coupon code or total amount." }, { status: 400 });
    }

    const today = new Date();
    const coupon = await couponsCollection.findOne({
      code: code.toUpperCase(),
      expiry: { $gte: today },
      isActive: { $ne: false }
    });
    if (!coupon) {
      return NextResponse.json({ valid: false, message: "Invalid or expired coupon" }, { status: 404 });
    }

    if (total < coupon.minimumAmount) {
      return NextResponse.json({ valid: false, message: `Minimum order amount of ₹${coupon.minimumAmount} is required.` }, { status: 400 });
    }
    const fullCouponData = {
      id: coupon._id.toString(),
      code: coupon.code,
      title: coupon.title || `Discount Coupon`,
      description: coupon.description || `Get ${coupon.discount}% off`,
      discount: coupon.discount,
      discountType: coupon.discountType || "percentage",
      minimumAmount: coupon.minimumAmount || 0,
      maxDiscount: coupon.maxDiscount,
      expiryDate: coupon.expiry,
      isActive: coupon.isActive ?? true
    };

    return NextResponse.json({
      valid: true,
      message: "Coupon applied successfully!",
      coupon: fullCouponData,
    });
  } catch (error) {
    console.error("Coupon API POST Error:", error);
    return NextResponse.json({ error: "Failed to handle coupons" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      Allow: "GET, POST, OPTIONS",
    },
  });
}
