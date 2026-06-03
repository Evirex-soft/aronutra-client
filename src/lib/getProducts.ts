import { IProduct } from "@/types/product";
import { getAllProducts, findProductBySlug } from "./data";


// Fetch products
export async function getProducts(): Promise<IProduct[]> {
    return getAllProducts();
}

export async function getProductBySlug(slug: string): Promise<IProduct | null> {
    return findProductBySlug(slug);
}
