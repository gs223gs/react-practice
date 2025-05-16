import useSWR from "swr";

export type Poke = {
  id: number;
  name: string;
  image: string;
  type: string[];
  height: number;
  weight: number;
  abilities: string[];
};

// PokeAPIのレスポンス型を定義
type PokeAPIResponse = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
};

export const useFetchPoke = (id: string) => {

  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    id === "" ? null : `https://pokeapi.co/api/v2/pokemon/${id}`,
    fetcher
  );

  const mapToPoke = (data: PokeAPIResponse): Poke => ({
    id: data.id,
    name: data.name,
    image: data.sprites?.front_default ?? "",
    type: data.types?.map((t) => t.type.name) ?? [],
    height: data.height,
    weight: data.weight,
    abilities: data.abilities?.map((a) => a.ability.name) ?? [],
  });

  return {
    poke: data ? mapToPoke(data) : null,
    isError: error,
    isLoading
  };

};

