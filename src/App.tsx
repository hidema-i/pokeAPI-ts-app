import React, { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, Pokemon, getPokemon } from "./utils/pokemon";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";

function App() {
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
  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon}></Card>;
              })}
            </div>
            <div className="btn">
              {/* 前のページボタン */}
              <button onClick={handlePrevPage}>Prev</button>
              {/* 次ページ button*/}
              <button onClick={handleNextPage}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
