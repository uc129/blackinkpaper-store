import z from "zod";
import { ISODateSchema } from "../../common/isodate";

export const BlogCommentSchema = z.object({
    id: z.string(),
    postId: z.string(),
    parentId: z.string().optional(),

    authorName: z.string(),
    authorEmail: z.email(),

    content: z.string(),

    createdAt: ISODateSchema,
    isApproved: z.boolean(),
});
