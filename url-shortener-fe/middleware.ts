import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  console.log(`[DEBUG] Middleware: Processing request for path: ${pathname}`)

  // List of paths that should not be treated as shortIds
  const excludedPaths = ["/terms"]

  // Check if the current path is in the excluded list
  if (excludedPaths.includes(pathname)) {
    console.log(`[DEBUG] Middleware: Detected excluded route: ${pathname}`)
    return NextResponse.next()
  }

  // Let the route handler handle other paths
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Skip all internal paths (_next, api)
    "/((?!_next|api|favicon.ico).*)",
  ],
}
