// vite.config.ts
import { TanStackRouterVite } from "file:///D:/ppl/kompas-gramedia/fe/node_modules/.pnpm/@tanstack+router-vite-plugin@1.58.10_vite@5.4.8_@types+node@22.7.2_/node_modules/@tanstack/router-vite-plugin/dist/esm/index.js";
import react from "file:///D:/ppl/kompas-gramedia/fe/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.0_vite@5.4.8_@types+node@22.7.2_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import path from "path";
import { defineConfig } from "file:///D:/ppl/kompas-gramedia/fe/node_modules/.pnpm/vite@5.4.8_@types+node@22.7.2/node_modules/vite/dist/node/index.js";
import eslint from "file:///D:/ppl/kompas-gramedia/fe/node_modules/.pnpm/vite-plugin-eslint@1.8.1_eslint@9.11.1_jiti@1.21.6__vite@5.4.8_@types+node@22.7.2_/node_modules/vite-plugin-eslint/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\ppl\\kompas-gramedia\\fe";
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  plugins: [
    process.env.NODE_ENV !== "test" && TanStackRouterVite({ routeFileIgnorePattern: "__tests__" }),
    react(),
    eslint()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcGxcXFxca29tcGFzLWdyYW1lZGlhXFxcXGZlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxwcGxcXFxca29tcGFzLWdyYW1lZGlhXFxcXGZlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9wcGwva29tcGFzLWdyYW1lZGlhL2ZlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSAnQHRhbnN0YWNrL3JvdXRlci12aXRlLXBsdWdpbidcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IGVzbGludCBmcm9tICd2aXRlLXBsdWdpbi1lc2xpbnQnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdAJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICd0ZXN0JyAmJlxyXG4gICAgVGFuU3RhY2tSb3V0ZXJWaXRlKHsgcm91dGVGaWxlSWdub3JlUGF0dGVybjogJ19fdGVzdHNfXycgfSksXHJcbiAgICByZWFjdCgpLFxyXG4gICAgZXNsaW50KCksXHJcbiAgXSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUSxTQUFTLDBCQUEwQjtBQUN4UyxPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sWUFBWTtBQUpuQixJQUFNLG1DQUFtQztBQU96QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxRQUFRLElBQUksYUFBYSxVQUN6QixtQkFBbUIsRUFBRSx3QkFBd0IsWUFBWSxDQUFDO0FBQUEsSUFDMUQsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLEVBQ1Q7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
