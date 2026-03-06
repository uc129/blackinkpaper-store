import z from "zod";
import { RichTextDocumentSchema } from "./richtextdocument";

export const BodyContentSchema = z.union([
    z.string(),
    RichTextDocumentSchema
]);