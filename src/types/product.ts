import { Types } from "mongoose";

export interface IProduct {
    _id?: string;
    name: string;
    slug: string;
    sku?: string;
    barcode?: string;
    brand: string;
    category: Types.ObjectId; // ID of the category
    productType?: string;
    status: "DRAFT" | "ACTIVE" | "INACTIVE" | "ARCHIVED";

    // Descriptions
    shortDescription?: string;
    longDescription?: string;
    benefits?: string;
    ingredients?: string;
    usageInstructions?: string;
    storageInstructions?: string;
    harvestRegion?: string;

    // Pricing & Inventory
    mrp: number;
    sellingPrice: number;
    costPrice?: number;
    taxPercentage: number;
    stockQuantity: number; // Added this as it's usually needed

    // Attributes
    weight?: number;
    packageType?: string;
    isOrganic: boolean;

    // Media
    images: string[]; // S3 URLs

    // SEO
    seo: {
        metaTitle?: string;
        metaDescription?: string;
        focusKeyword?: string;
    };
    createdAt?: string;
    updatedAt?: string;
}