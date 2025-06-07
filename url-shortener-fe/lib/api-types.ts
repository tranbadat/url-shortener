// Types for API responses
export interface ShortenResponse {
  success: boolean
  shortId?: string
  shortUrl?: string
  error?: string
  expiresAt?: string
}

export interface LookupResponse {
  success: boolean
  originalUrl?: string
  error?: string
  expiresAt?: string
}
