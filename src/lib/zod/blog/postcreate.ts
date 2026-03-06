import z from "zod";
import { BodyContentSchema } from "./content";


export const BlogPostCreateSchema = z.object({
    title: z.string(),
    subtitle: z.string().optional(),

    authorId: z.string(),
    category: z.string(),
    tags: z.array(z.string()),

    coverImage: z.url(),
    imageList: z.array(z.url()),
    imageOrder: z.enum(["normal", "reverse", "random"]),

    body: BodyContentSchema,

    isPublished: z.boolean(),
    isFeatured: z.boolean(),
});
