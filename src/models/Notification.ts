import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: {
        type: String,
        enum: ["ORDER", "INVENTORY", "REVIEW", "CUSTOMER", "PAYMENT"],
        required: true
    },
    read: { type: Boolean, default: false },
    link: { type: String }, // Optional: Link to order details or product
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);