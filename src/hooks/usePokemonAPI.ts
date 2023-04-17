import { useEffect, useState } from "react";
import { Pokemon, getAllPokemon, getPokemon } from "../utils/pokemon";

export const usePokemonAPI = () => {
  const initialURL: Pokemon = {
    name: "",
    url: "https://pokeapi.co/api/v2/pokemon",
    sprites: {
      front_default: "",
    },
    types: [{ type: { name: "" } }],
    weight: 0,
    height: 0,
    abilities: [{ ability: { name: "" } }],
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [nextURL, setNextURL] = useState<string>("");
  const [prevURL, setPrevURL] = useState<string>("");

  useEffect(() => {
    const fetchPokemon = async () => {
      // 最初にポケモンの一覧を取得
      let res = await getAllPokemon(initialURL);
      //詳細情報を取得
      loadPokempon(res.results);
      // 次のページと前のページのURLを取得して、stateに格納
      setNextURL(res.next);
      setPrevURL(res.previous);
      // ロードが完了したことを示すstateを更新
      setLoading(false);
    };
    fetchPokemon();
  }, []);

  // 引数で与えられたポケモンのURLから詳細情報を取得して、stateに格納する関数
  const loadPokempon = async (data: Pokemon[]) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon);
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  // 「次のページ」ボタンがクリックされた時の処理
  const handleNextPage = async () => {
    setLoading(true);
    // 次のページのポケモンの一覧を取得して、stateに格納
    let data = await getAllPokemon({ ...initialURL, url: nextURL });
    await loadPokempon(data.results);
    // 次のページと前のページのURLを取得して、stateに格納
    setNextURL(data.next);
    setPrevURL(data.previous);
    // ロードが完了したことを示すstateを更新
    setLoading(false);
  };

  // 「前のページ」ボタンがクリックされた時の処理
  const handlePrevPage = async () => {
    if (!prevURL) return;
    setLoading(true);
    //前のページのデータを取得
    let data = await getAllPokemon({ ...initialURL, url: prevURL });
    // 取得したデータをセット
    loadPokempon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previous);
    // ロードが完了したことを示すstateを更新
    setLoading(false);
  };
  return {
    loading,
    pokemonData,
    nextURL,
    prevURL,
    handleNextPage,
    handlePrevPage,
  };
};
