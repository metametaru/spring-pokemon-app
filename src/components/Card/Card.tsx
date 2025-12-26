import { Pokemon } from "@/src/types/pokemon";
import styles from "./Card.module.css";

type Props = {
  pokemon: Pokemon;
};

const Card = ({ pokemon }: Props) => {
  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={pokemon.image ?? ""}
        alt={pokemon.name}
      />
      <h3 className={styles.name}>{pokemon.name}</h3>

      <div className={styles.types}>
        {pokemon.types.map((type) => (
          <span key={type.name} className={`type ${type.name}`}>
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
            {pokemon.abilities.map((ability) => (
              <li key={ability.name}>
                {ability.name}
                {ability.isHidden && "（隠れ特性）"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
