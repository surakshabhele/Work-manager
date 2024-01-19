import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  console.log("middleware executed");
  const logintoken = request.cookies.get("logintoken")?.value;
  console.log(logintoken);
  if (
    request.nextUrl.pathname == "/api/login" ||
    request.nextUrl.pathname == "/api/users"
  ) {
    return;
  }
  const loggedInUserNotAccessPaths =
    request.nextUrl.pathname == "/login" ||
    request.nextUrl.pathname == "/signup";
  if (loggedInUserNotAccessPaths) {
    //   accessing not secured route
    if (logintoken) {
      return NextResponse.redirect(new URL("/profile/user", request.url));
    }
  } else {
    //   accessing secured route
    if (!logintoken) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/add_task",
    "/show_tasks",
    "/profile/:path*",
    "/api/:path*",
  ],
};
