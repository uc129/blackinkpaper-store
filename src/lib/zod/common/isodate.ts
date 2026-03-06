import { ISODate } from "@/lib/types/isodate";
import z from "zod";


export const ISODateSchema = z.iso.date(); // strict ISO 8601

export const ISODateStringSchema = z.string().refine((dateStr) => {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
}, {
    message: "Invalid ISO 8601 date string",
});

export function parseISODate(dateStr: string): ISODate | null {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date.toISOString();
}
export function formatISODate(date: Date): ISODate {
    return date.toISOString();
}
export function isValidISODate(dateStr: string): boolean {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
}

export function getCurrentISODate(): ISODate {
    return new Date().toISOString();
}