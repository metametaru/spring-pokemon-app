import Nav from "@/src/components/Nav/Nav";
import Card from "@/src/components/Card/Card";
import { fetchPokemonList } from "@/src/lib/api";
import { toPokemonFromView } from "@/src/utils/toPokemonFromView";
import Link from "next/link";
import styles from "./page.module.css";

export default async function ListPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const LIMIT = 20;
  const { offset: offsetParam } = await searchParams;
  const offset =
    Number(Array.isArray(offsetParam) ? offsetParam[0] : offsetParam) || 0;

  const pokemonViews = await fetchPokemonList(LIMIT, offset);
  const pokemonData = pokemonViews.map(toPokemonFromView);

  return (
    <div className={styles.container}>
      <Nav current="list" />
      <div className={styles.grid}>
        {pokemonData.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className={styles.pagination}>
        {offset === 0 ? (
          <button disabled>前へ</button>
        ) : (
          <Link href={`/list?offset=${Math.max(offset - LIMIT, 0)}`}>
            <button>前へ</button>
          </Link>
        )}
        <Link href={`/list?offset=${offset + LIMIT}`}>
          <button>次へ</button>
        </Link>
      </div>
    </div>
  );
}
