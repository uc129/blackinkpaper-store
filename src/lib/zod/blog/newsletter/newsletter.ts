import z from "zod";
import { ISODateSchema } from "../../common/isodate";

export const BlogNewsletterSubscriberSchema = z.object({
    id: z.string(),
    email: z.string().email(),

    subscribedAt: ISODateSchema,
    isActive: z.boolean(),
});


export const BlogNewsletterSubscriberCreateSchema = z.object({
    email: z.string().email(),
});

export const BlogNewsletterSubscriberUpdateSchema = z.object({
    isActive: z.boolean().optional(),
});

export const BlogNewsletterSubscriberListResponseSchema = z.object({
    subscribers: z.array(BlogNewsletterSubscriberSchema),
    total: z.number(),
    page: z.number(),
    pageSize: z.number(),
});


export const BlogNewsletterStatsSchema = z.object({
    totalSubscribers: z.number(),
    activeSubscribers: z.number(),
    unsubscribed: z.number(),
});
