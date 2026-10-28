interface CustomFetchOptions extends RequestInit {
  responseType?: "json" | "blob" | "text";
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function ClientFetching<T>(endpoint: string, options: CustomFetchOptions = {}): Promise<T> {
  if (!BASE_URL) {
    throw new Error("VITE_BASE_URL belum dikonfigurasi");
  }

  const { responseType = "json", headers: inputHeaders, ...fetchOptions } = options;
  const headers = new Headers(inputHeaders);

  if (fetchOptions.body && !(fetchOptions.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const token = localStorage.getItem("token");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(
    new URL(endpoint.replace(/^\/+/, ""), BASE_URL.endsWith("/") ? BASE_URL : `${BASE_URL}/`),
    { ...fetchOptions, headers },
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`HTTP ${response.status}: ${message}`);
  }

  if (responseType === "blob") return (await response.blob()) as T;
  if (responseType === "text") return (await response.text()) as T;
  return (await response.json()) as T;
}
