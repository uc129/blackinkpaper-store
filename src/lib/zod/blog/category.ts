import z from "zod";

export const BlogCategorySchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    slug: z.string(),
    icon: z.string().optional(),
});
