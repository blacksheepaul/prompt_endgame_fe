import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"

const backendTarget = process.env.VITE_BACKEND_TARGET ?? "http://localhost:10180"

export default defineConfig({
    define: {
        __BACKEND_ADDR__: JSON.stringify(backendTarget),
    },
    plugins: [vue(), tailwindcss()],
    server: {
        proxy: {
            "/api": {
                //target: "http://localhost:8081",
                target: backendTarget,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
})
