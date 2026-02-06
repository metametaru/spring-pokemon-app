import { Pokemon } from "@/src/types/pokemon";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import styles from "./Card.module.css";

type Props = {
  pokemon: Pokemon;
};

const Card = ({ pokemon }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <FavoriteButton pokemonId={pokemon.id} />
      </div>
      <img
        className={styles.image}
        src={pokemon.image ?? ""}
        alt={pokemon.name}
      />
      <h3 className={styles.name}>{pokemon.name}</h3>

      <div className={styles.types}>
        {pokemon.types.map((type, index) => (
          <span key={`${type.name}-${index}`} className={`type ${type.name}`}>
            {type.name}
          </span>
        ))}
      </div>
      <div className={styles.stats}>
        <div className="cardData">
          <p className="title">重さ：{(pokemon.weight / 10).toFixed(1)} kg</p>
        </div>
        <div className="cardData">
          <p className="title">高さ：{(pokemon.height / 10).toFixed(1)} m</p>
        </div>
        <div className={styles.ability}>
          <p className="title">特性</p>
          <ul>
            {pokemon.abilities.map((ability, index) => (
              <li key={`${ability.name}-${index}`}>
                {ability.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
