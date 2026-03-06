import z from "zod";

export const BlogCommentUpdateSchema = z.object({
    content: z.string().optional(),
    isApproved: z.boolean().optional(),
});
