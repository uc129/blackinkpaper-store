import z from "zod";

export const BlogTagSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string(),
    color: z.string().optional(),
});
