import { defineMiddleware } from "astro:middleware";
import jwt from "jsonwebtoken";

import { nonProtectRoutes } from "@/constants/Routes";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = context.url;

  const cookie = context.request.headers.get("cookie") ?? "";
  const token = parseCookie(cookie).token;

  if (url.pathname === "/") {
    return next();
  }

  if (!token || !isValidToken(token)) {
    if (
      nonProtectRoutes.some((route) => url.pathname.startsWith(route)) &&
      url.pathname !== "/"
    ) {
      return next();
    }
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  }

  const user = jwt.decode(token) as App.Locals["user"];
  context.locals.user = user;

  if (user.role === "STAFF" && !url.pathname.startsWith("/staff")) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/staff/home",
      },
    });
  }
  if (user.role === "FRESHMAN" && url.pathname.startsWith("/staff")) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/firstdate/home",
      },
    });
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
