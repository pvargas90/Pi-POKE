import Card from "../Card/Card";
import style from "./CardsContainer.module.css";
import { useSelector } from "react-redux";

const CardsContainer = () => {
  const pokemons = useSelector((state) => state.pokemons);

  return (
    <div className={style.container}>
      {pokemons.map((pokemon) => {
        return (
          <Card id={pokemon.id} nombre={pokemon.nombre} tipo={pokemon.tipo} />
        );
      })}
    </div>
  );
};

export default CardsContainer;
