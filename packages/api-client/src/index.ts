import type { ApiError, ApiResponse } from "@repo/types"

export interface ApiClientConfig {
  baseUrl: string
  getToken?: () => string | null | Promise<string | null>
}

export class ApiClient {
  private config: ApiClientConfig

  constructor(config: ApiClientConfig) {
    this.config = config
  }

  private async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.config.baseUrl}${path}`
    const headers = new Headers(options.headers)

    if (this.config.getToken) {
      const token = await this.config.getToken()
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
    }

    if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
      headers.set("Content-Type", "application/json")
    }

    const response = await fetch(url, {
      ...options,
      headers,
    })

    if (!response.ok) {
      let apiError: ApiError = { message: response.statusText }
      try {
        const errJson = await response.json()
        if (errJson && typeof errJson === "object") {
          if ("success" in errJson && "code" in errJson) {
            const apiRes = errJson as ApiResponse
            apiError = {
              message:
                apiRes.message ||
                (apiRes.error && typeof apiRes.error === "object"
                  ? apiRes.error.message
                  : String(apiRes.error || "")) ||
                "An error occurred",
              code: String(apiRes.code || ""),
            }
          } else {
            apiError = errJson as ApiError
          }
        }
      } catch (_) {
        // Fallback to response status text
      }
      throw {
        message: apiError.message || "An error occurred",
        status: response.status,
        code: apiError.code,
      } as ApiError
    }

    if (response.status === 204) {
      return {} as T
    }

    const json = await response.json()

    // Check if the response matches our standard FastAPI envelope format
    if (json && typeof json === "object" && "success" in json && "code" in json) {
      const apiResponse = json as ApiResponse<any>
      if (!apiResponse.success) {
        throw {
          message:
            apiResponse.message ||
            (apiResponse.error && typeof apiResponse.error === "object"
              ? apiResponse.error.message
              : String(apiResponse.error || "")) ||
            "An error occurred",
          status: response.status,
          code: String(apiResponse.code || ""),
        } as ApiError
      }
      return apiResponse.data as T
    }

    return json as T
  }

  get<T>(path: string, options?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...options, method: "GET" })
  }

  post<T>(path: string, body?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  put<T>(path: string, body?: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  delete<T>(path: string, options?: RequestInit): Promise<T> {
    return this.request<T>(path, { ...options, method: "DELETE" })
  }
}
