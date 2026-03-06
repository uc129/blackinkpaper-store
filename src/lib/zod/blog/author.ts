import z from "zod";

export const BlogAuthorSchema = z.object({
    id: z.string(),
    name: z.string(),
    bio: z.string().optional(),

    avatarUrl: z.url().optional(),
    website: z.url().optional(),

    socialLinks: z.object({
        twitter: z.string().optional(),
        facebook: z.string().optional(),
        linkedin: z.string().optional(),
        instagram: z.string().optional(),
    }).optional(),
});
