import z from "zod";

export const BlogSettingsSchema = z.object({
    siteTitle: z.string(),
    siteDescription: z.string(),

    postsPerPage: z.number().int().positive(),

    allowComments: z.boolean(),
    moderateComments: z.boolean(),
});
