import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String }, // Hashed password
    image: { type: String }, // For Google profile pic
    phone: { type: String },

    // Shipping details
    address: {
        street: { type: String },
        city: { type: String },
        state: { type: String },
        pinCode: { type: String },
        country: { type: String, default: "India" }
    },

    role: { type: String, enum: ["user", "admin"], default: "user" },
    provider: { type: String, default: "credentials" }, // 'google' or 'credentials'
    emailVerified: { type: Date, default: null },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
}, { timestamps: true });

const User = models.User || model("User", UserSchema);
export default User;