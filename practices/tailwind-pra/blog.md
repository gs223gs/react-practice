
環境構築
```text
Docker

```
```bash
npm create vite@latest

npm install tailwindcss @tailwindcss/vite
```

index.cssへ追加
```css
@import "tailwindcss";
```

tsconfig.jsonへ追加

tsconfig.app.jsonへ追加

```bash
npm install -D @types/node
```

vite.config.tsへ追加
```ts
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  //dockerのportとホストを指定
  server: {
    port: 3000,
    host: '0.0.0.0',
  }
})
```

shadcn install
```bash
npx shadcn@latest init
```

react-hook-form
```bash
npm install react-hook-form
```

zod
```bash
npm install zod
npm i @hookform/resolvers

```

useSWR
```bash
npm install swr
```

supabase
```sh
npm install @supabase/supabase-js

```

shadcnコンポーネント
```bash
npx shadcn@latest add form
npx shadcn@latest add input
```



