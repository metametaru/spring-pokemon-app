"use client";

import { useEffect, useState } from "react";
import { getAllPokemon, getPokemon } from "../utils/pokemon";
import { toPokemon } from "../utils/toPokemon";
import { Pokemon } from "../types/pokemon";
import Card from "../components/Card/Card";
import styles from "./page.module.css";

export default function Home() {
  const LIMIT = 20;

  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const res = await getAllPokemon(
        `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`
      );
      const details = await Promise.all(
        res.results.map(async (p: { url: string }) =>
          toPokemon(await getPokemon(p.url))
        )
      );
      setPokemonData(details);
      setLoading(false);
    };
    fetchPokemonData();
  }, [offset]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [offset]);

  return (
    <div className={styles.container}>
      {loading ? (
        <h1>ロード中…</h1>
      ) : (
        <>
          <div className={styles.grid}>
            {pokemonData.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
          <div className={styles.pagination}>
            <button
              onClick={() => setOffset((prev) => Math.max(prev - LIMIT, 0))}
              disabled={offset === 0}
            >
              前へ
            </button>

            <button onClick={() => setOffset((prev) => prev + LIMIT)}>
              次へ
            </button>
          </div>
        </>
      )}
    </div>
  );
}
