import { getAllPokemon, getPokemon } from "../utils/pokemon";
import { toPokemon } from "../utils/toPokemon";
import Card from "../components/Card/Card";
import styles from "./page.module.css";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const LIMIT = 20;
  const { offset: offsetParam } = await searchParams;
  const offset =
    Number(Array.isArray(offsetParam) ? offsetParam[0] : offsetParam) || 0;

  const POKEAPI_BASE_URL =
    process.env.NEXT_PUBLIC_POKEAPI_BASE_URL || "https://pokeapi.co/api/v2";

  const res = await getAllPokemon(
    `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`
  );
  const pokemonData = await Promise.all(
    res.results.map(async (p: { url: string }) =>
      toPokemon(await getPokemon(p.url))
    )
  );

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {pokemonData.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className={styles.pagination}>
        {offset === 0 ? (
          <button disabled>前へ</button>
        ) : (
          <Link href={`/?offset=${Math.max(offset - LIMIT, 0)}`}>
            <button>前へ</button>
          </Link>
        )}
        <Link href={`/?offset=${offset + LIMIT}`}>
          <button>次へ</button>
        </Link>
      </div>
    </div>
  );
}
