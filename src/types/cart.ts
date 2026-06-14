import { IProduct } from "./product";

export interface CartItem extends IProduct {
    quantity: number;
    selectedVariantId?: string;
    selectedWeight?: string;
}