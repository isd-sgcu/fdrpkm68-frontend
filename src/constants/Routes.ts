// TODO: Add NON-PROTECTED ROUTES HERE
export const nonProtectRoutes = [
  "/register",
  "/login",
  "/forgot-password",
  "/staff/register",
  "/staff/login",
];

export const nonStartedRoutes = ["/fest"] as const;

export type NonStartedRoute = (typeof nonStartedRoutes)[number];

// NOTE: If you need to change this please also consider update time in backend
export const nonStartedRoutesTimeWhitelist: Record<NonStartedRoute, Date> = {
  "/fest": new Date("2025-07-18T19:00:00+07:00"),
  // "/rpkm": new Date("2025-07-20T19:00:00+07:00"),
};
