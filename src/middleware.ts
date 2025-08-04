import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = context.url;

  if (!url.pathname.startsWith("/fest")) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/fest",
      },
    });
  }

  return next();
});
