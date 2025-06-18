import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email must be a valid email."),
    password: z.string(),
});

export const registerSchema = z
    .object({
        firstname: z.string(),
        lastname: z.string().optional(),
        email: z.string().email("Email must be a valid email."),
        password: z.string(),
        password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Password and confirm password don't match",
        path: ["password_confirmation"],
    });

export const contentSchema = z.object({
    title: z.string(),
    type: z.string(),
    file_path: z
        .instanceof(File)
        .refine((file) => file.size <= 5 * 1024 * 1024, {
            message: "File must be less than 5MB",
        })
        .refine(
            (file) =>
                ["application/pdf", "image/png", "image/jpeg"].includes(
                    file.type
                ),
            {
                message: "Only PDF, PNG, or JPEG files are allowed",
            }
        )
        .optional(),
    external_url: z.string().url().optional(),
    description: z.string().optional(),
    deadline: z.date().optional(),
});
