const BASE_URL = import.meta.env.VITE_BASE_URL;
interface CustomFetchOptions extends RequestInit {
  responseType?: "json" | "blob" | "text";
}

export async function ClientFetching<T>(endpoint: string, options: CustomFetchOptions = {}): Promise<T> {
  const { responseType = "json", ...fetchOptions } = options;
  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  };

  if (options.body instanceof FormData) {
    delete (defaultHeaders as Record<string, string>)["Content-Type"];
  }

  const config: RequestInit = {
    method: fetchOptions.method || "GET",
    ...fetchOptions,
    headers: {
      ...defaultHeaders,
      ...fetchOptions.headers,
    },
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  if (!response.ok) {
    if (response.status === 500) console.log("Website sedang down");
    throw new Error("HTTP error! status: " + response.status);
  }

  if (responseType === "blob") return (await response.blob()) as unknown as T;
  if (responseType === "text") return (await response.text()) as unknown as T;
  return response.json() as Promise<T>;
}
