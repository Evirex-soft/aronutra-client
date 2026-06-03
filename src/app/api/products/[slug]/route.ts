import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const client = await clientPromise;
    if (!client) {
      return NextResponse.json({ error: "Database connection not established" }, { status: 503 });
    }
    const db = client.db("test");
    const { slug } = await params;

    const product = await db.collection("products").findOne({ urlSlug: slug });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: product._id.toString(),
      slug: product.urlSlug,
      name: product.productName,
      desc: product.description,
      category: product.category,
      price: product.sellingPrice,
      stockQuantity: product.stockQuantity,
      mrp: product.mrp,
      img: product.productImages?.[0]?.url || "/placeholder.png"
    });
  } catch (error) {
    console.error("Product Slug API GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
