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

    const product = await db.collection("products").findOne({ urlSlug: slug, status: "ACTIVE", });
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const formattedProducts = product.map((p: any) => ({
      id: p._id.toString(),
      slug: p.slug,                   // Changed from urlSlug to slug (as per new model)
      name: p.name,                   // Changed from productName to name
      desc: p.shortDescription || "", // Changed from description to shortDescription
      category: p.category?.name || "Uncategorized",
      price: p.sellingPrice,
      mrp: p.mrp,
      stockQuantity: p.stockQuantity,
      img: p.images?.[0] || "/placeholder.png", // images is now string[], so we take the first index
      isOrganic: p.isOrganic,
      weight: p.weight
    }));

    return NextResponse.json(formattedProducts);
  } catch (error) {
    console.error("Product Slug API GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}
