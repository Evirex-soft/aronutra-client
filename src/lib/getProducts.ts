import { IProduct } from "@/types/product";
import { getSingleProducts, findProductBySlug } from "./data";


// Fetch products
export async function getProducts(): Promise<IProduct[]> {
    return getSingleProducts();
}

export async function getProductBySlug(slug: string): Promise<IProduct | null> {
    return findProductBySlug(slug);
}
