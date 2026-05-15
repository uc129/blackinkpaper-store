import de from "zod/v4/locales/de.cjs";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const ACCESS_TOKEN_KEY = "blackinkpaper_access_token";
const REFRESH_TOKEN_KEY = "blackinkpaper_refresh_token";

if (
  typeof window === "undefined" &&
  BASE_URL?.startsWith("https://localhost") &&
  process.env.NODE_ENV !== "production"
) {
  // process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

export type QueryValue = string | number | boolean | null | undefined;
export type QueryParams = Record<string, QueryValue>;

export class ApiError extends Error {
  status: number;
  details: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

export function getStoredAccessToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredRefreshToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function storeAuthTokens(
  accessToken: string,
  refreshToken?: string | null,
) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearAuthTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function buildQuery(params?: QueryParams) {
  if (!params) return "";
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
}

function unwrapApiResponse<T>(body: unknown): T {
  if (
    body &&
    typeof body === "object" &&
    "data" in body &&
    ("statusCode" in body || "errorCode" in body || "technicalDetails" in body)
  ) {
    return (body as { data: T }).data;
  }

  return body as T;
}

async function request<T>(
  endpoint: string,
  options: RequestInit & { auth?: boolean; query?: QueryParams } = {},
): Promise<T> {
  if (!BASE_URL) {
    throw new ApiError(500, "NEXT_PUBLIC_API_URL is not configured");
  }

  const { auth = false, query, headers, ...requestOptions } = options;
  const url = `${BASE_URL}${endpoint}${buildQuery(query)}`;

  const createFetchOptions = (token?: string | null): RequestInit => ({
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers ? headers : {}),
    },
    ...requestOptions,
  });

  let token = auth ? getStoredAccessToken() : null;
  let res: Response | null = null;
  try {
    debugger;
    res = await fetch(url, createFetchOptions(token));
  } catch (e:any) {
    console.error("Network error:", e);
    throw new ApiError(0, "Network error", e);
  }

  if (auth && res.status === 401) {
    const refreshToken = getStoredRefreshToken();
    if (refreshToken) {
      const refreshRes = await fetch(`${BASE_URL}/api/Accounts/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (refreshRes.ok) {
        const authResponse = unwrapApiResponse<{
          token?: string | null;
          refreshToken?: string | null;
        }>(await refreshRes.json());
        if (authResponse?.token) {
          storeAuthTokens(authResponse.token, authResponse.refreshToken);
          token = authResponse.token;
          res = await fetch(url, createFetchOptions(token));
        }
      } else {
        clearAuthTokens();
      }
    } else {
      clearAuthTokens();
    }
  }

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    const message =
      error?.detail ||
      error?.title ||
      error?.message ||
      `API error (${res.status})`;
    throw new ApiError(res.status, message, error);
  }

  if (res.status === 204) return undefined as T;
  const text = await res.text();
  return text ? unwrapApiResponse<T>(JSON.parse(text)) : (undefined as T);
}

export const apiClient = {
  get: <T>(url: string, options?: { auth?: boolean; query?: QueryParams }) =>
    request<T>(url, { method: "GET", ...options }),
  post: <T>(
    url: string,
    body?: unknown,
    options?: { auth?: boolean; query?: QueryParams },
  ) =>
    request<T>(url, {
      method: "POST",
      body: body === undefined ? undefined : JSON.stringify(body),
      ...options,
    }),
  put: <T>(
    url: string,
    body: unknown,
    options?: { auth?: boolean; query?: QueryParams },
  ) =>
    request<T>(url, { method: "PUT", body: JSON.stringify(body), ...options }),
  patch: <T>(
    url: string,
    body: unknown,
    options?: { auth?: boolean; query?: QueryParams },
  ) =>
    request<T>(url, {
      method: "PATCH",
      body: JSON.stringify(body),
      ...options,
    }),
  delete: <T>(url: string, options?: { auth?: boolean; query?: QueryParams }) =>
    request<T>(url, { method: "DELETE", ...options }),
};
