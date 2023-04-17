import React from "react";
import { Pokemon } from "../../utils/pokemon";
import "./Card.css";
interface CardProps {
  pokemon: Pokemon;
}

const Card = ({ pokemon }: CardProps) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default} alt="" />
      </div>
      <h3>{pokemon.name}</h3>
      <div className="cardTypes">
        <div>Type</div>
        {pokemon.types.map((type, i) => {
          return (
            <div key={i}>
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <p className="title">Weight : {pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">Height : {pokemon.height}</p>
        </div>
        <div className="cardData">
          <p className="title">Ability : {pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
