import z from "zod";

export const BlogCommentCreateSchema = z.object({
    postId: z.string(),
    parentId: z.string().optional(),

    authorName: z.string(),
    authorEmail: z.email(),
    content: z.string(),
});
