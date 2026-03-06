import z from "zod";
import { BodyContentSchema } from "./content";



export const BlogPostUpdateSchema = z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),

    category: z.string().optional(),
    tags: z.array(z.string()).optional(),

    coverImage: z.string().url().optional(),
    imageList: z.array(z.url()).optional(),
    imageOrder: z.enum(["normal", "reverse", "random"]).optional(),

    body: BodyContentSchema.optional(),

    isPublished: z.boolean().optional(),
    isFeatured: z.boolean().optional(),
});
