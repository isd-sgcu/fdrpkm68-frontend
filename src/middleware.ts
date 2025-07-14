import { defineMiddleware } from "astro:middleware";
import jwt from "jsonwebtoken";

import { nonProtectRoutes } from "@/constants/NonProtectedRoutes";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = context.url;

  console.log(`middleware from ${context.url.pathname}`);

  const isProtectedRoute = !nonProtectRoutes.some((route) => {
    return url.pathname.startsWith(route);
  });
  if (!isProtectedRoute) {
    return next();
  }

  const cookie = context.request.headers.get("cookie") ?? "";
  const token = parseCookie(cookie).token;

  if (token && isValidToken(token)) {
    context.locals.user = jwt.decode(token) as App.Locals["user"];
    return next();
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
    },
  });
});

function parseCookie(cookie: string): Record<string, string> {
  return Object.fromEntries(
    cookie
      .split("; ")
      .map((c) => c.split("="))
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}

function isValidToken(token: string): boolean {
  try {
    jwt.verify(token, import.meta.env.JWT_SECRET || "");
    return true;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
}
