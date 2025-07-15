import { defineMiddleware } from "astro:middleware";
import jwt from "jsonwebtoken";

import { nonProtectRoutes } from "@/constants/NonProtectedRoutes";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = context.url;
  const isProtectedRoute =
    !nonProtectRoutes.some((route) => {
      return url.pathname.startsWith(route);
    }) && url.pathname !== "/";

  const cookie = context.request.headers.get("cookie") ?? "";
  const token = parseCookie(cookie).token;

  console.log("Token from cookie:", token);
  console.log("Is protected route:", isProtectedRoute);

  if (!isProtectedRoute) {
    if (token && isValidToken(token)) {
      context.locals.user = jwt.decode(token) as App.Locals["user"];
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/firstdate/home",
        },
      });
    }
    return next();
  }

  console.log("Protected route accessed:", url.pathname);

  if (token && isValidToken(token)) {
    context.locals.user = jwt.decode(token) as App.Locals["user"];
    return next();
  }

  return next();
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
    jwt.verify(token, import.meta.env.JWT_SECRET || "secret");
    return true;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
}
