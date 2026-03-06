"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function Pagination({
    currentPage,
    totalPages,
}: {
    currentPage: number;
    totalPages: number;
}) {
    const router = useRouter();
    const params = useSearchParams();

    const goTo = (page: number) => {
        const newParams = new URLSearchParams(params.toString());
        newParams.set("page", String(page));
        router.push(`/blog?${newParams.toString()}`);
    };

    return (
        <div className="flex justify-center gap-4">
            <button
                disabled={currentPage <= 1}
                className="px-4 py-2 border rounded disabled:opacity-40"
                onClick={() => goTo(currentPage - 1)}
            >
                Prev
            </button>

            <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
            </span>

            <button
                disabled={currentPage >= totalPages}
                className="px-4 py-2 border rounded disabled:opacity-40"
                onClick={() => goTo(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}
