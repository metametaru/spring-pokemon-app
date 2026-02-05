"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { getFavorites } from "@/src/utils/favoriteApi";
import { getPokemon } from "@/src/utils/pokemon";
import { toPokemon } from "@/src/utils/toPokemon";
import { Pokemon } from "@/src/types/pokemon";
import Nav from "@/src/components/Nav/Nav";
import Card from "@/src/components/Card/Card";
import styles from "./page.module.css";

export default function FavoritesPage() {
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const favoriteIds = await getFavorites();

        const POKEAPI_BASE_URL =
          process.env.NEXT_PUBLIC_POKEAPI_BASE_URL || "https://pokeapi.co/api/v2";

        const pokemonPromises = favoriteIds.map(async (id) => {
          const pokemonApi = await getPokemon(`${POKEAPI_BASE_URL}/pokemon/${id}`);
          return toPokemon(pokemonApi);
        });

        const pokemonList = await Promise.all(pokemonPromises);
        setFavorites(pokemonList);
      } catch (error) {
        console.error("お気に入りの取得に失敗:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchFavorites();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <div className={styles.container}>
        <Nav current="favorites" />
        <div className={styles.message}>読み込み中...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.container}>
        <Nav current="favorites" />
        <div className={styles.message}>
          お気に入りを見るにはログインしてください
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className={styles.container}>
        <Nav current="favorites" />
        <div className={styles.message}>
          お気に入りがありません
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Nav current="favorites" />
      <h2 className={styles.title}>お気に入り（{favorites.length}件）</h2>
      <div className={styles.grid}>
        {favorites.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}
