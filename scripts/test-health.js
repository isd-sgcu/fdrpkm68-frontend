#!/usr/bin/env node
/**
 * Simple health check script for local testing
 */
import { spawn } from "child_process";
import http from "http";

// Start the server
console.log("Starting server...");
const server = spawn("node", ["./dist/server/entry.mjs"], {
  stdio: "inherit",
  env: {
    ...process.env,
    HOST: "0.0.0.0",
    PORT: "4321",
    NODE_ENV: "production",
  },
});

// Wait for server to start
setTimeout(() => {
  console.log("Testing health endpoint...");

  http
    .get("http://localhost:4321/api/health", (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          const health = JSON.parse(data);
          console.log("Health check response:", health);
          console.log("✅ Server is healthy!");
        } catch {
          console.log("❌ Invalid health response:", data);
        }
        server.kill();
      });
    })
    .on("error", (err) => {
      console.log("❌ Health check failed:", err.message);
      server.kill();
    });
}, 2000);

// Clean up on exit
process.on("SIGINT", () => {
  server.kill();
  process.exit(0);
});
