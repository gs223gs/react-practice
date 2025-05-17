import useSWR from "swr";
import { createClient } from "@supabase/supabase-js";
import type { Instrument } from "./interface";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

console.log("supabase", supabase);
console.log(supabase.from("instruments").select())
// const fetcher = (url: string) => fetch(url).then((res) => res.json());
const useInstrument = () => {
  const fetcher = async () => {
    const { data, error } = await supabase.from("instruments").select('*');
    if (error) throw error;
    console.log("fetching");
    console.log("data", data);
    console.log("error", error);
    return data;
  };

  const { data, error, isLoading } = useSWR<Instrument[]>(
    "instruments",
    fetcher
  );
  return { instruments: data, error, isLoading };
};

export default useInstrument;
