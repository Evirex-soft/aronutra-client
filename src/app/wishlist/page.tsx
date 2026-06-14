import { getProducts } from "@/lib/getProducts";
import WishlistClientView from "./wishlistClient";


export default async function WishlistPage() {
    const products = await getProducts();

    const allProducts = JSON.parse(
        JSON.stringify(products)
    );

    return (
        <WishlistClientView allProducts={allProducts} />
    );
}   