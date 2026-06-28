import { NextResponse } from "next/server";

export function middleware(request) {
  const session = request.cookies.get("apsra_session")?.value;
  const isLogin = request.nextUrl.pathname === "/login";

  if (!session && !isLogin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (session && isLogin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/astrologers/:path*", "/users/:path*", "/settings/:path*", "/login"]
};
