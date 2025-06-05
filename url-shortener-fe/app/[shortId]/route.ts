import { type NextRequest, NextResponse } from "next/server"

// Define types for API responses
interface LookupResponse {
  success: boolean
  originalUrl?: string
  error?: string
}

export async function GET(request: NextRequest, { params }: { params: { shortCode: string } }) {
  if (!params) {
    console.error("[DEBUG] No params provided")
    return
  }
  // Extract the shortId from the request parameters
  // This is the dynamic segment of the URL, e.g., /abc123
  // where abc123 is the shortId
  const { pathname } = request.nextUrl
  const pathSegments = pathname.split("/").filter(Boolean) // Filter out empty segments
  const shortId = pathSegments[pathSegments.length - 1] // Get the last segment as shortId
  // const shortId = params.shortCode

  // Debug log to see what shortId is being processed
  console.log(`[DEBUG] Processing shortId: ${shortId}`)

  // List of paths that should not be treated as shortIds
  const excludedPaths = ["terms"]

  // Check if the current shortId is in the excluded list
  if (excludedPaths.includes(shortId)) {
    console.log(`[DEBUG] Detected '${shortId}' as shortId, but this is a reserved route`)
    // Let Next.js handle this as a route, not a shortId
    return NextResponse.next()
  }

  if (!shortId) {
    console.log("[DEBUG] No shortId provided, redirecting to home")
    return NextResponse.redirect(new URL("/", request.url))
  }

  try {
    console.log(`[DEBUG] Calling API for shortId: ${shortId}`)
    // Call the API to look up the original URL
    const response = await fetch(`http://localhost:8080/v1/short-url/lookup/${shortId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Use next.js cache: 'no-store' to ensure we always get fresh data
      cache: "no-store",
    })

    // Handle HTTP errors
    if (!response.ok) {
      console.error(`[DEBUG] API error: ${response.status} - ${response.statusText}`)
      // Redirect to home page with error parameter
      return NextResponse.redirect(new URL(`/?error=api_error&code=${response.status}`, request.url))
    }

    const data: LookupResponse = await response.json()
    console.log(`[DEBUG] API response:`, data)

    if (!data.success || !data.originalUrl) {
      // If the short URL is not found or expired, redirect to the home page with error
      console.error("[DEBUG] Lookup failed:", data.error || "Unknown error")
      return NextResponse.redirect(new URL("/?error=not_found", request.url))
    }

    // Redirect to the original URL
    console.log(`[DEBUG] Redirecting to: ${data.originalUrl}`)

    return NextResponse.redirect(data.originalUrl)
  } catch (error) {
    console.error("[DEBUG] API error:", error)
    // In case of an error, redirect to the home page with error
    return NextResponse.redirect(new URL("/?error=connection_error", request.url))
  }
}
