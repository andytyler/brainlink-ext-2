import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./public/manifest.json";

export default defineConfig(({ mode }) => {
	return {
		plugins: [svelte(), crx({ manifest })],
		build: {
			emptyOutDir: true,
			outDir: "dist",
			rollupOptions: {
				output: {
					chunkFileNames: "assets/chunk-[hash].js",
				},
				input: {
					background: "background.js",
					content: "content.js",
				},
			},
		},
	};
});
