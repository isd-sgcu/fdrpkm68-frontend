import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("token");

  return redirect("/login");
};

export const GET: APIRoute = async ({ cookies, redirect }) => {
  cookies.delete("token");

  return redirect("/login");
};
