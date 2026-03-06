import z from "zod";
import { ISODateSchema } from "../common/isodate";

export const BlogPaginationSchema = z.object({
    page: z.number().int().positive(),
    pageSize: z.number().int().positive(),
});

export const BlogPostFiltersSchema = z.object({
    authorId: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),

    isPublished: z.boolean().optional(),
    isFeatured: z.boolean().optional(),

    searchQuery: z.string().optional(),

    dateRange: z.object({
        start: ISODateSchema.optional(),
        end: ISODateSchema.optional(),
    }).optional(),
});

export const BlogSortOptionsSchema = z.object({
    sortBy: z.enum(["publishedAt", "views", "likes", "commentsCount"]),
    sortOrder: z.enum(["asc", "desc"]),
});

export const BlogSearchOptionsSchema = z.object({
    query: z.string(),
    filters: BlogPostFiltersSchema.optional(),
    pagination: BlogPaginationSchema.optional(),
    sortOptions: BlogSortOptionsSchema.optional(),
});
