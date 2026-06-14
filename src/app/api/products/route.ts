import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: "Database connection not established" }, { status: 503 });
    }
    const db = client.db("test");
    const products = await db.collection("products").find({ status: "ACTIVE" }).toArray();

    const formattedProducts = products.map((p: any) => ({
      id: p._id.toString(),
      slug: p.slug,
      name: p.name,
      desc: p.shortDescription || "",
      category: p.category?.name || "Uncategorized",
      price: p.sellingPrice,
      mrp: p.mrp,
      stockQuantity: p.stockQuantity,
      img: p.images?.[0] || "/placeholder.png",
      isOrganic: p.isOrganic,
      weight: p.weight
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("Products API GET Error:", error);
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}
