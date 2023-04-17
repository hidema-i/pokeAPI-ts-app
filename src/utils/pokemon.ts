import axios from "axios";

export interface PokemonTypes {
  type: {
    name: string;
  };
}

export interface PokemonAbility {
  ability: { name: string };
}

// Pokemonの型定義
export interface Pokemon {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
  types: PokemonTypes[];
  weight: number;
  height: number;
  abilities: [PokemonAbility];
}

// すべてのポケモンの情報を取得する関数
export const getAllPokemon = async (pokemon: Pokemon) => {
  try {
    // axiosを使ってポケモンの情報を取得
    const res = await axios.get(pokemon.url);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// 指定したURLからポケモンの情報を取得する関数
export const getPokemon = async (url: string) => {
  try {
    // axiosを使ってポケモンの情報を取得
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw err;
  }
};

// PokeAPIのURL
export const pokeApiURL = "https://pokeapi.co/?ref=public-apis";

// ポケモン会社の歴史のURL
export const pokeHistoryURL =
  "https://corporate.pokemon.co.jp/aboutus/history/";
