import React from "react";
import "./App.css";
import Card from "./components/Card/Card";
import Navbar from "./components/Navbar/Navbar";
import { usePokemonAPI } from "./hooks/usePokemonAPI";

function App() {
  const { loading, pokemonData, handleNextPage, handlePrevPage } =
    usePokemonAPI();

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
