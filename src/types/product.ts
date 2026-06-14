import { Types } from "mongoose";

export interface IVariant {
    weight: string; // e.g., "250g", "500g"
    mrp: number;
    sellingPrice: number;
    stockQuantity: number;
}

export interface IProduct {
    _id?: string;
    name: string;
    slug: string;
    sku?: string;
    barcode?: string;
    brand: string;
    category: Types.ObjectId;
    productType?: string;
    status: "DRAFT" | "ACTIVE" | "INACTIVE" | "ARCHIVED";

    // Descriptions
    shortDescription?: string;
    longDescription?: string;
    benefits?: string;
    ingredients?: string;
    usageInstructions?: string;
    storageInstructions?: string;

    // Variants (Optional - for products with different sizes)
    variants: IVariant[];

    // Pricing & Inventory (Top-level/Default)
    mrp: number;
    sellingPrice: number;
    costPrice?: number;
    taxPercentage: number;
    stockQuantity: number;

    // Attributes
    weight?: number; // Numeric weight in grams for shipping
    packageType?: string;
    harvestRegion?: string;
    floralSource?: string;
    harvestSeason?: string;
    purityPercentage?: number;
    isOrganic: boolean;
    certification?: string;

    // Media
    images: string[];

    // SEO
    seo: {
        metaTitle?: string;
        metaDescription?: string;
        focusKeyword?: string;
    };

    isFeatured: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}