import {defineConfig} from "vite";
import * as path from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      name: "web-utils",
      entry: {
        hooks: path.resolve(__dirname, "src/hooks/index.ts"),
        libs: path.resolve(__dirname, "src/libs/index.ts"),
      },
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      output: [
        {
          entryFileNames: "[name].es.js",
          format: "es",
        },
        {
          entryFileNames: "[name].cjs.js",
          format: "cjs",
        },
      ]
    },
    outDir: "dist",
    sourcemap: false,
    emptyOutDir: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      },
      format: {
        comments: false
      }
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
      outDir: "dist",
      exclude: ["src/**/*.test.ts"],
    })
  ],
})
