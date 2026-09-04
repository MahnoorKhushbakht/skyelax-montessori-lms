import { NextResponse } from "next/server";

export function middleware(request) {
  const userRole = request.cookies.get("userRole")?.value;
  const pathname = request.nextUrl.pathname;

  const requiredRole = pathname.startsWith("/admin")
    ? "ADMIN"
    : pathname.startsWith("/teacher")
      ? "TEACHER"
      : pathname.startsWith("/parent")
        ? "PARENT"
        : null;

  if (!requiredRole) {
    return NextResponse.next();
  }

  if (!userRole || userRole !== requiredRole) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!request.cookies.get("userId")?.value) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/teacher/:path*", "/parent/:path*"],
};
