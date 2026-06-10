import { z } from "zod";

export const signupSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    phone: z.string().min(10, "Phone number must be at least 10 digits long")
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required")
});

export const addressSchema = z.object({
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
    email: z.string().email("Enter a valid email address"),
    streetAddress: z.string().min(5, "Street address is too short"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    pincode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode")
});


export const updatePersonalSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
});

export const updateAddressSchema = z.object({
    street: z.string().min(5, "Street address is too short"),
    city: z.string().min(2, "City name is too short"),
    pinCode: z.string().regex(/^\d{6}$/, "Enter a valid 6-digit pincode")
});

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

// Reset Password Schema
export const resetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
            .regex(/[a-z]/, "Password must contain at least one lowercase letter")
            .regex(/[0-9]/, "Password must contain at least one number"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Error will be attached to confirmPassword field
    });


export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type AddressInput = z.infer<typeof addressSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;