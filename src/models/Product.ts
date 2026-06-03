import mongoose, { Schema, model, models } from "mongoose";
import { IProduct } from "../../types/product";

const ProductSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sku: { type: String, unique: true, sparse: true },
    brand: { type: String, default: "Aronutra" },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    status: { type: String, enum: ["DRAFT", "ACTIVE", "INACTIVE", "ARCHIVED"], default: "DRAFT" },

    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },

    shortDescription: String,
    longDescription: String,
    images: [{ type: String }], // Array of S3 URLs

    seo: {
        metaTitle: String,
        metaDescription: String,
        focusKeyword: String,
    }
}, { timestamps: true });

export const Product = models.Product || model<IProduct>("Product", ProductSchema);