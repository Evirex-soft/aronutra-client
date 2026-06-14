import mongoose, { Document, Schema, models } from "mongoose";

const OrderItemSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true }, // IMPORTANT
    name: { type: String, required: true },
    slug: { type: String, required: true },
    image: { type: String }, // First image URL
    mrp: { type: Number, required: true },
    sellingPrice: { type: Number, required: true }, // Renamed for consistency
    quantity: { type: Number, required: true },
    selectedVariantId: { type: Schema.Types.ObjectId, required: false },
    selectedWeight: { type: String, required: false }
});

const AppliedCouponSchema = new Schema({
    code: { type: String, required: true },
    amountSaved: { type: Number, required: true },
}, { _id: false });

export interface IOrder extends Document {
    orderId: string;
    userId?: string;
    items: any[];
    totalAmount: number;
    appliedCoupon?: {
        code: string;
        amountSaved: number;
    };
    shippingAddress: {
        fullName: string;
        phone: string;
        email: string;
        streetAddress: string;
        city: string;
        state: string;
        pincode: string;
    };
    paymentDetails: {
        method: "razorpay" | "cod";
        razorpay_payment_id?: string; // Optional for COD
        razorpay_order_id?: string;   // Optional for COD
        razorpay_signature?: string;  // Optional for COD
        status: "Pending" | "Paid" | "Failed";
    };
    status: "Placed" | "Shipped" | "Delivered" | "Cancelled" | "Refund Requested" | "Refunded";
    cancellationReason: string;
    refundReason: string;
    createdAt: Date;
}

const OrderSchema = new Schema<IOrder>({
    orderId: { type: String, required: true, unique: true },
    userId: { type: String },
    items: [OrderItemSchema],
    totalAmount: { type: Number, required: true },
    appliedCoupon: { type: AppliedCouponSchema, required: false },
    shippingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
        streetAddress: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
    },
    paymentDetails: {
        method: { type: String, enum: ["razorpay", "cod"], required: true },
        razorpay_payment_id: { type: String }, // Removed required: true
        razorpay_order_id: { type: String },    // Removed required: true
        razorpay_signature: { type: String },   // Removed required: true
        status: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" }
    },
    status: {
        type: String,
        enum: ["Placed", "Shipped", "Delivered", "Cancelled", "Refund Requested", "Refunded"],
        default: "Placed",
    },
    cancellationReason: { type: String },
    refundReason: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Order = models.Order || mongoose.model<IOrder>("Order", OrderSchema);
export default Order;