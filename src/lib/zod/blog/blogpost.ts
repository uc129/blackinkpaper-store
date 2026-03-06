import z from "zod";
import { ISODateSchema } from "../common/isodate";
import { RichTextDocumentSchema } from "./richtextdocument";
import { BodyContentSchema } from "./content";

export const BlogPostSchema = z.object({
    id: z.string(),
    slug: z.string(),

    title: z.string(),
    subtitle: z.string().optional(),

    authorId: z.string(),
    category: z.string(),
    tags: z.array(z.string()),

    coverImage: z.string().url(),
    imageList: z.array(z.string().url()),
    imageOrder: z.enum(["normal", "reverse", "random"]),

    body: BodyContentSchema,

    publishedAt: ISODateSchema.nullable(),
    publishedBy: z.string().optional(),

    createdAt: ISODateSchema,
    updatedAt: ISODateSchema.optional(),

    isPublished: z.boolean(),
    isFeatured: z.boolean(),

    views: z.number().nonnegative(),
    likes: z.number().nonnegative(),
    commentsCount: z.number().nonnegative(),

    readingTime: z.number().optional(),
});


