import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: fileURLToPath(new URL("./src/index.js", import.meta.url)),
      name: "EventBus",
      fileName: (format) => `vue-signaler.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
});
