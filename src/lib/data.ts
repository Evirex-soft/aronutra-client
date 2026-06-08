import clientPromise from "./mongodb";
import { IProduct } from "@/types/product";
import "server-only";


async function getProductsCollection() {
    const client = await clientPromise;
    if (!client) throw new Error("Failed to connect to database");
    const db = client.db("test");
    return db.collection("products");
}

export async function getPackages(): Promise<IProduct[]> {
    try {
        const collection = await getProductsCollection();

        // Filter specifically for PACKAGE
        const products = await collection.find({ productType: "PACKAGE" }).toArray();

        return products.map((doc) => ({
            ...doc,
            _id: doc._id.toString(),
            category: doc.category?.toString(),
        })) as IProduct[];
    } catch (error) {
        console.error("Database Error (getPackages):", error);
        return [];
    }
}



// export async function getAllProducts(): Promise<IProduct[]> {
//     try {
//         const collection = await getProductsCollection();

//         const products = await collection.find({}).toArray();

//         return products.map((doc) => ({
//             ...doc,
//             _id: doc._id.toString(),
//             category: doc.category?.toString(),
//         })) as IProduct[];

//     } catch (error) {
//         console.error("Database Error:", error);
//         return [];
//     }
// }

export async function getSingleProducts(): Promise<IProduct[]> {
    try {
        const collection = await getProductsCollection();

        // Filter specifically for SINGLE
        const products = await collection.find({ productType: "SINGLE" }).toArray();

        return products.map((doc) => ({
            ...doc,
            _id: doc._id.toString(),
            category: doc.category?.toString(),
        })) as IProduct[];
    } catch (error) {
        console.error("Database Error (getSingleProducts):", error);
        return [];
    }
}

export async function findProductBySlug(slug: string): Promise<IProduct | null> {
    try {
        const collection = await getProductsCollection();

        // IMPORTANT: Use 'slug' (matching backend), not 'urlSlug'
        const product = await collection.findOne({ slug: slug });

        if (!product) return null;

        return JSON.parse(
            JSON.stringify(
                product
            )
        ) as unknown as IProduct;

    } catch (error) {
        console.error("Database Error:", error);
        return null;
    }
}