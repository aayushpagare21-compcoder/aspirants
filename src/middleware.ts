import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

// Middleware function to handle authentication
export async function authMiddleware(req: NextRequest) {
  const session = await auth();
  if (!session) {
    if (req.nextUrl.pathname !== "/login" && req.nextUrl.pathname !== "/") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}

export { authMiddleware as middleware };
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
