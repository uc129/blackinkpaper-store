"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function FiltersUI({ current }: { current: any }) {
    const router = useRouter();
    const params = useSearchParams();

    const updateParam = (key: string, value: string) => {
        const newParams = new URLSearchParams(params.toString());
        if (value) newParams.set(key, value);
        else newParams.delete(key);

        router.push(`/blog?${newParams.toString()}`);
    };

    return (
        <div className="flex flex-wrap items-center gap-4">
            <select
                value={current.category || ""}
                onChange={(e) => updateParam("category", e.target.value)}
                className="border rounded px-3 py-2"
            >
                <option value="">All Categories</option>
                <option value="design">Design</option>
                <option value="tech">Tech</option>
                <option value="business">Business</option>
            </select>

            <select
                value={current.sort || "newest"}
                onChange={(e) => updateParam("sort", e.target.value)}
                className="border rounded px-3 py-2"
            >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
            </select>

            <select
                value={current.author || ""}
                onChange={(e) => updateParam("author", e.target.value)}
                className="border rounded px-3 py-2"
            >
                <option value="">All Authors</option>
                <option value="john">John Doe</option>
                <option value="utkarsh">Utkarsh</option>
                <option value="guest">Guest Authors</option>
            </select>
        </div>
    );
}
