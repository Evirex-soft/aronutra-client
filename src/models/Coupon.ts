import mongoose from "mongoose";

const CouponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true, uppercase: true },
    type: {
        type: String,
        enum: ["PERCENTAGE", "FIXED_AMOUNT", "FREE_SHIPPING", "BUY_X_GET_Y"],
        required: true
    },
    value: { type: Number, default: 0 },
    minOrder: { type: Number, default: 0 },
    maxDiscount: { type: Number },
    usageLimit: { type: Number },
    usageCount: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
    expiresAt: { type: Date },
}, { timestamps: true });

export default mongoose.models.Coupon || mongoose.model("Coupon", CouponSchema);