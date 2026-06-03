import { getProducts } from "@/lib/getProducts";
import WishlistClientView from "./wishlistClient";


export default async function WishlistPage() {
    const allProducts = await getProducts();

    return (
        <WishlistClientView allProducts={allProducts} />
    );
}   