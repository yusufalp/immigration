import { NextResponse } from "next/server";

export function authenticate(req) {
  const token = req.cookies.get("authToken");
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/leads",
};
