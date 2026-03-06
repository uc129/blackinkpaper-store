import z from "zod";
import { BlogPostSchema } from "./blogpost";

export const BlogPostListResponseSchema = z.object({
    posts: z.array(BlogPostSchema),
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
});


export const BlogUploadResponseSchema = z.object({
    imageUrl: z.string().url(),
    thumbnailUrl: z.string().url().optional(),
});

export const BlogUploadErrorSchema = z.object({
    error: z.string(),
    message: z.string(),
    statusCode: z.number(),
});
