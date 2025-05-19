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
