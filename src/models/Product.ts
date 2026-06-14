import mongoose, { Schema, model, models } from "mongoose";
import { IProduct, IVariant } from "@/types/product";


const VariantSchema = new Schema<IVariant>({
    weight: { type: String, required: true },
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
});

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, lowercase: true },
        sku: { type: String, unique: true, sparse: true },
        barcode: { type: String },
        brand: { type: String, default: "Aronutra" },
        category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
        productType: { type: String },
        status: {
            type: String,
            enum: ["DRAFT", "ACTIVE", "INACTIVE", "ARCHIVED"],
            default: "DRAFT",
        },

        // Descriptions
        shortDescription: { type: String },
        longDescription: { type: String },
        benefits: { type: String },
        ingredients: { type: String },
        usageInstructions: { type: String },
        storageInstructions: { type: String },

        // Variants
        variants: [VariantSchema],

        // Pricing & Inventory
        mrp: { type: Number, required: true },
        sellingPrice: { type: Number, required: true },
        costPrice: { type: Number },
        taxPercentage: { type: Number, default: 18 },
        stockQuantity: { type: Number, default: 0 },

        // Attributes
        weight: { type: Number },
        packageType: { type: String },
        harvestRegion: { type: String },
        floralSource: { type: String },
        harvestSeason: { type: String },
        purityPercentage: { type: Number },
        isOrganic: { type: Boolean, default: false },
        certification: { type: String },

        // Media & SEO
        images: [{ type: String }],
        isFeatured: { type: Boolean, default: false },
        seo: {
            metaTitle: { type: String },
            metaDescription: { type: String },
            focusKeyword: { type: String },
        },
    },
    {
        timestamps: true
    }
);


export const Product = models.Product || model<IProduct>("Product", ProductSchema);