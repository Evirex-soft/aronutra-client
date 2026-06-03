import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: "Database connection not established" }, { status: 503 });
    }
    const db = client.db("test");
    const products = await db.collection("products").find({}).toArray();

    return NextResponse.json(
      products.map(p => ({
        id: p._id.toString(),
        urlSlug: p.urlSlug,
        name: p.productName,
        desc: p.description,
        category: p.category,
        price: p.sellingPrice,
        stockQuantity: p.stockQuantity,
        mrp: p.mrp,
        img: p.productImages?.[0]?.url || "/placeholder.png"
      }))
    );
  } catch (error) {
    console.error("Products API GET Error:", error);
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}
