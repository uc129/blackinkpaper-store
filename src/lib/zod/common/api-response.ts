import z from "zod";

export const ApiResponseSchema = <T extends z.ZodTypeAny>(schema: T) =>
    z.object({
        data: schema,
        success: z.boolean(),
        message: z.string().optional(),
    });

export const ApiErrorSchema = z.object({
    error: z.string(),
    message: z.string(),
    statusCode: z.number(),
});
