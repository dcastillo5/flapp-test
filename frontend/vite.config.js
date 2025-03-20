import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({ autoCodeSplitting: true }), viteReact(), tailwindcss()],
  server: {
    host: true,
    strictPort: true,
    port: 3000,
    allowedHosts: "flapp-test.onrender.com",
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
