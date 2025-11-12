import {z} from "zod";

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
    email: z.string().email("Invalid email address"),
    phone: z.string().min(7, "Phone must be at least 7 characters"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    lastname: z.string().min(2, "Last name must be at least 2 characters"),
    password: z.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string()
});

export type UserInfo = z.infer<typeof userInfoSchema>;
export type SingleUserInfo = z.infer<typeof singleUserInfo>;