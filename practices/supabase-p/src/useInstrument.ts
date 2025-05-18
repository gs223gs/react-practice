import useSWR from "swr";
import type { Instrument } from "./interface";
import supabase from "./supabase";

const useInstrument = () => {
  const fetcher = async () => {
  const { data, error } = await supabase.from("instruments").select("*");
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
