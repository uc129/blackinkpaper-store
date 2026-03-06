import z from "zod";
import { BlogCommentSchema } from "./comment";


export const BlogCommentListResponseSchema = z.object({
    comments: z.array(BlogCommentSchema),
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
});
