import "./App.css";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { SubmitHandler } from "react-hook-form";
import { useState } from "react";
import useFormWithValidation from "./useFormWithValidation";
import { useFetchPoke } from "./useFetchPoke";

type formInputs = {
  pokeId: string;
};

function App() {
  const [pokeId, setPokeId] = useState<string>("");
  const form = useFormWithValidation();

  const { poke, isError, isLoading } = useFetchPoke(pokeId);

  const onSubmit: SubmitHandler<formInputs> = (data) => {
    setPokeId(data.pokeId);
  };

  if (isError) return <div>エラーが発生しました</div>;

  if (isLoading) return <div>ローディング中...</div>;
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="pokeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ポケモンのID</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ポケモンのIDを入力してください"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  ポケモンのIDを入力してください
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">送信</Button>
        </form>
      </Form>
      {poke ? (
        <div className="outline-solid flex flex-col items-center m-3">
          <div className="flex">
            <p className="text-2xl font-bold m-2">ID:{poke?.id}</p>
            <p className="text-2xl font-bold m-2">{poke?.name}</p>
          </div>

          <img src={poke?.image} alt={poke?.name} />
          <p>タイプ:{poke?.type}</p>
          <div className="flex flex-col">
            <p>高さ:{poke?.height}</p>
            <p>重さ:{poke?.weight}</p>
          </div>
          <p>~特性~</p>
          {poke?.abilities.map((ability, index) => (
            <span key={index}>
              {ability}
              <br />
            </span>
          ))}
        </div>
      ) : (
        <p>検索しよう！</p>
      )}
    </>
  );
}

export default App;
