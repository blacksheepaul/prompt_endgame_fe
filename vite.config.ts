import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"

function resolveBackendTarget(rawValue?: string): string {
    if (!rawValue) return "http://localhost:10180"
    if (/^\d+$/.test(rawValue)) return `http://localhost:${rawValue}`
    return rawValue
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "")
    const backendTarget = resolveBackendTarget(env.VITE_BACKEND_TARGET)

    return {
        define: {
            __BACKEND_ADDR__: JSON.stringify(backendTarget),
        },
        plugins: [vue(), tailwindcss()],
        server: {
            proxy: {
                "/api": {
                    target: backendTarget,
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ""),
                },
            },
        },
    }
})
