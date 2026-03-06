import z from "zod";
import { ISODateSchema } from "../../common/isodate";

export const BlogAnalyticsSchema = z.object({
    dailyViews: z.array(z.object({
        date: ISODateSchema,
        views: z.number().nonnegative(),
    })),

    topPosts: z.array(z.object({
        postId: z.string(),
        title: z.string(),
        views: z.number().nonnegative(),
    })),

    topAuthors: z.array(z.object({
        authorId: z.string(),
        name: z.string(),
        views: z.number().nonnegative(),
    })),
});
