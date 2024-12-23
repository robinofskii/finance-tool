import deno from "@deno/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

import "react";
import "react-dom";

export default defineConfig({
	root: "./client",
	server: {
		port: 4000,
		proxy: {
			"/trpc": {
				target: "http://localhost:8000",
				changeOrigin: true,
			},
		},
	},
	plugins: [react(), deno()],
	optimizeDeps: {
		include: ["react/jsx-runtime"],
	},
});
