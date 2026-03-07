const BASE_URL = process.env.NEXT_PUBLIC_API_URL;



async function request<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {

    if (!BASE_URL) {
        return null as T;
    }

    const res = await fetch(`${BASE_URL}${endpoint}`, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
        ...options,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => null);
        throw new Error(error?.message || "API error");
    }

    return res.json();
}

export const apiClient = {
    get: <T>(url: string) => request<T>(url),
    post: <T>(url: string, body: unknown) =>
        request<T>(url, { method: "POST", body: JSON.stringify(body) }),
    put: <T>(url: string, body: unknown) =>
        request<T>(url, { method: "PUT", body: JSON.stringify(body) }),
    patch: <T>(url: string, body: unknown) =>
        request<T>(url, { method: "PATCH", body: JSON.stringify(body) }),
    delete: <T>(url: string) =>
        request<T>(url, { method: "DELETE" }),
};
