import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { rateLimit } from "@/lib/rateLimiter";

export async function GET(req: Request) {
    try {
        const ip =
            req.headers.get("x-forwarded-for") ??
            req.headers.get("x-real-ip") ??
            "anonymous";

        const allowed = rateLimit(ip, 30, 60 * 1000);

        if (!allowed) {
            return NextResponse.json(
                { error: "Too many requests" },
                { status: 429 }
            );
        }

        const { searchParams } = new URL(req.url);
        const query = searchParams.get("q");

        // Return empty if no query or query too short
        if (!query || query.length < 2) {
            return NextResponse.json({ products: [] });
        }

        const client = await clientPromise;
        if (!client) {
            return NextResponse.json(
                { error: "Database connection not established" },
                { status: 503 }
            );
        }

        const db = client.db("test");

        // Search logic: Name or Category matches query, and status is ACTIVE
        const products = await db.collection("products")
            .find({
                status: "ACTIVE",
                $or: [
                    {
                        name: {
                            $regex: query,
                            $options: "i",
                        },
                    },
                    {
                        category: {
                            $regex: query,
                            $options: "i",
                        },
                    },
                ],
            })
            .limit(8)
            .toArray();


        // Map fields to match your frontend expectations and consistency
        const formattedProducts = products.map((product) => ({
            _id: product._id.toString(),
            slug: product.slug,
            name: product.name,
            price: product.sellingPrice,
            img: product.images?.[0] || "/placeholder.png",
        }));

        return NextResponse.json({ products: formattedProducts });
    } catch (error) {
        console.error("Search API Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch search results" },
            { status: 500 }
        );
    }
}