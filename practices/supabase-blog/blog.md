環境構築

```text
Docker

```

```bash
npm create vite@latest

npm install tailwindcss @tailwindcss/vite
```

index.css へ追加

```css
@import "tailwindcss";
```

tsconfig.json へ追加

tsconfig.app.json へ追加

```bash
npm install -D @types/node
```

vite.config.ts へ追加

```ts
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

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
    host: "0.0.0.0",
  },
});
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

shadcn コンポーネント

```bash
npx shadcn@latest add form
npx shadcn@latest add input
```
supabase project 作成

supabase で db 作成

```sql
CREATE TABLE todos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  is_done boolean DEFAULT false,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamp DEFAULT now()
);
```

- ポリシーの設定

```sql
CREATE POLICY "Allow authenticated users to select from todos"
ON todos
FOR SELECT
TO authenticated
USING ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert into todos"
ON todos
FOR INSERT
TO authenticated
WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Allow authenticated users to update todos"
ON todos
FOR UPDATE
TO authenticated
USING ((select auth.uid()) IS NOT NULL)
WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete from todos"
ON todos
FOR DELETE
TO authenticated
USING ((select auth.uid()) IS NOT NULL);
```

Sign in / Providers からOAuthをオンにする

githubのOAuthを設定

```text
homepageURLはhttp://127.0.0.1:3000/にして下さい
```

githubからのclient ID とシークレットを設定

これでOAuthの設定完了

OAuthの実装

supabase componentsのインストール
```bash
npx shadcn@latest add https://supabase.com/ui/r/social-auth-react.json
```

.env.local にsupabaseのURLとkeyを設定

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

https://supabase.com/docs/guides/getting-started/quickstarts/reactjs
clientの書き換え
```ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;
```
何故書き換えるのか？
毎回supabaseのclientを作成するとパフォーマンスが悪い
無限にfetchしてしまう

supabaseを作る関数をexportするのではなく，作成したオブジェクトをそのままexportする
これで毎回作成される問題を解決

シングルトンパターンというらしい

loginformの読み込み
```tsx
import './App.css'
import { LoginForm } from './components/login-form'
function App() {

  return (
    <>
      <LoginForm />
    </>
  )
}

export default App

```
スクリーンショット 2025-05-19 21.10.40.png

OAuthに接続できないトラブル

.env.local読み込みOK
github OK
supabase OK

読み込めない
なぜ

react ドキュメントの方にしたらいけた
cursorで調査開始

こっちが完全なsupabaseのコード
こっちを使用
```tsx
import './index.css'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import type { Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (<div>Logged in!</div>)
  }
}
```

dashbordの実装

zod
```tsx
import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(1, "文字数足りませー! 1文字以上にして下さい!")
    .max(20, "長すぎるわ！ 20文字以内にしろ!"),
});

```

cutomhook
```ts

```

form
```ts
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useFormWithValidation from "@/hooks/useFormWithValidation";
import { z } from "zod";
import { formSchema } from "@/lib/validation/todoform";
/*TODO
zod
form
swr

*/
const Dashboard = () => {
  const form = useFormWithValidation();

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
      console.log("Form submitted with data:",data);
  }
  return (
    <div className="flex flex-col justify-center items-center m-10">
      <h1 className="text-4xl">Dashboard</h1>
      <div className="m-10 w-1/2">
        <Form {...form} >
            <form onSubmit={form.handleSubmit(data => handleSubmit(data))}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>タスク入力</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="タスクを入力してください"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>タスクを入力してください</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <Button type="submit" className="justify-center items-center" >追加</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Dashboard;

```

todoの型を定義
```ts

```

supabaseへcrudを行うカスタムフックを作成
fetch
```ts
import useSWR from "swr";
import supabase from "@/lib/supabase/client";

export function useTodos() {

  const fetcher = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  };

  return useSWR("todos", fetcher);
}

}
```

create update delete
```ts
import { useSWRConfig } from "swr";
import supabase from "@/lib/supabase/client";

export function useTodoMutation() {
  const { mutate } = useSWRConfig();

  const createTodo = async (title: string) => {
    const { error } = await supabase.from("todos").insert([{ title }]);

    if (error) throw error;
    mutate("todos");
  };

  const updateTodo = async (id: string, isDone: boolean) => {
    const { error } = await supabase
      .from("todos")
      .update({ is_done: isDone })
      .eq("id", id);

    if (error) throw error;
    mutate("todos");
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) throw error;
    mutate("todos");
  };

  return {
    createTodo,
    updateTodo,
    deleteTodo,
  };
}

```

dashboardの実装
```tsx
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { z } from "zod";

import { formSchema } from "@/lib/validation/todoform";
import useFormWithValidation from "@/hooks/useFormWithValidation";
import { useTodos } from "@/hooks/useTodo";
const Dashboard = () => {
  const form = useFormWithValidation();
  const { data: todos, isLoading } = useTodos();
  console.log(todos)
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data.title);
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center m-10">
        <h1 className="text-4xl">Dashboard</h1>
        <div className="m-10 w-1/2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
              <FormField
                control={form.control}
                name="title" // ここでnameを指定 zodで定義したやつ
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>タスク入力</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="タスクを入力してください"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>タスクを入力してください</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="justify-center items-center">
                追加
              </Button>
            </form>
          </Form>
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {todos?.map((todo) => <div key={todo.id}>{todo.title}</div>)}
        </div>
      )}
    </>
  );
};

export default Dashboard;

```

todo作成を実装
```tsx diff
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { z } from "zod";

import { formSchema } from "@/lib/validation/todoform";
import useFormWithValidation from "@/hooks/useFormWithValidation";
import { useTodos } from "@/hooks/useTodo";
import { useTodoMutation } from "@/hooks/useTodoMutation";
const Dashboard = () => {
  const form = useFormWithValidation();
  const { data: todos, isLoading } = useTodos();
  const { createTodo } = useTodoMutation();
  console.log(todos)
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    createTodo(data.title);
  };
  console.log("dashboard render")
  return (
    <>
      <div className="flex flex-col justify-center items-center m-10">
        <h1 className="text-4xl">Dashboard</h1>
        <div className="m-10 w-1/2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => handleSubmit(data))}>
              <FormField
                control={form.control}
                name="title" // ここでnameを指定 zodで定義したやつ
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>タスク入力</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="タスクを入力してください"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>タスクを入力してください</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="justify-center items-center">
                追加
              </Button>
            </form>
          </Form>
        </div>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {todos?.map((todo) => <div key={todo.id}>{todo.title}</div>)}
        </div>
      )}
    </>
  );
};

export default Dashboard;

```


終わりに
このプロジェクトには欠点があります．

sessionを取得する際にeffectを使用しているためレンダリングが激しいです

そしてroutingもしていないため，過度にレンダリングされます











