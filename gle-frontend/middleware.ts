import { clerkMiddleware, ClerkMiddlewareOptions } from "@clerk/nextjs/server";


export default clerkMiddleware({
  publicRoutes: [
      '/',
      '/notes/:id',
      '/api/webhook/clerk',
      '/api/uploadThing'
  ],
  ignoredRoutes: [
      '/api/webhook/clerk',
      '/api/uploadThing'
  ]
} as ClerkMiddlewareOptions);
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    '/',
  ],
};