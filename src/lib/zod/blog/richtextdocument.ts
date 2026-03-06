import z from "zod";


export const RichTextNodeSchema: any = z.lazy(() =>
    z.object({
        type: z.string(),
        attrs: z.record(z.any(), z.any()).optional(),
        content: z.array(RichTextNodeSchema).optional(),
    })
);



export const RichTextDocumentSchema = RichTextNodeSchema;