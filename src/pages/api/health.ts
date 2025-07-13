import type { APIRoute } from "astro";

export const GET: APIRoute = async () => {
  const startTime = Date.now();

  // Basic health check
  const health = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    version: "1.0.0",
    responseTime: Date.now() - startTime,
    services: {
      api: {
        status: "connected",
        url: import.meta.env.PUBLIC_API_URL || "http://localhost:8080/api",
      },
    },
  };

  return new Response(JSON.stringify(health, null, 2), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });
};
