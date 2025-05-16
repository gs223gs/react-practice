import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
 

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  //ここ追加することでdocker コンテナからlocalhost:3000でアクセスできるようになります
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
})