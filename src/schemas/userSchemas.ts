import { z } from "zod";

export type UserInfoForm = {
    name?: string;
    lastname?: string;
    email?: string;
    phone?: string;
};

export const singleUserInfo = z.object({
    id: z.string(),
    email: z.string(),
    phone: z.string(),
    name: z.string(),
    lastname: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const userInfoSchema = z.object({
    getUserInfo: singleUserInfo,
});

export const registerSchema = z.object({
    email: z.email("Invalid email address"),
    phone: z.string().regex(/^\+?[0-9]{7,15}$/, "Phone must contain only numbers and be 7–15 digits"),
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .regex(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/, "Name must contain only letters"),
    lastname: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .regex(/^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ\s]+$/, "Last name must contain only letters"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
});

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string(),
    // .min(8, "Password must be at least 8 characters")
    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    // .regex(/[0-9]/, "Password must contain at least one number"),
});

export const forgotPassSchema = z.object({
    email: z.email("Invalid email address"),
});

export type UserInfo = z.infer<typeof userInfoSchema>;
export type SingleUserInfo = z.infer<typeof singleUserInfo>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type ForgotPassFormData = z.infer<typeof forgotPassSchema>;
