"use client";

import { useState, useEffect } from "react";
import Nav from "@/src/components/Nav/Nav";
import Card from "@/src/components/Card/Card";
import { Pokemon } from "@/src/types/pokemon";
import styles from "./page.module.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [cacheReady, setCacheReady] = useState(false);
  const [cacheCount, setCacheCount] = useState(0);

  // キャッシュ状態を定期的に確認
  useEffect(() => {
    const checkCacheStatus = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/pokemon/cache-status`);
        if (response.ok) {
          const data = await response.json();
          setCacheReady(data.ready);
          setCacheCount(data.count);
        }
      } catch (error) {
        console.error("キャッシュ状態の確認に失敗:", error);
      }
    };

    // 初回チェック
    checkCacheStatus();

    // キャッシュが準備できるまで5秒ごとにチェック
    const interval = setInterval(() => {
      if (!cacheReady) {
        checkCacheStatus();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [cacheReady]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/pokemon/search?q=${encodeURIComponent(query)}&limit=20`
      );

      if (!response.ok) {
        throw new Error("検索に失敗しました");
      }

      const data = await response.json();

      // バックエンドのPokemonViewをフロントエンドのPokemon型に変換
      const pokemons: Pokemon[] = data.map((p: any) => ({
        id: p.id,
        name: p.nameJa,
        image: p.imageUrl,
        height: p.height,
        weight: p.weight,
        types: p.types.map((t: string) => ({ name: t })),
        abilities: p.abilities.map((name: string) => ({
          name: name,
          isHidden: false,
        })),
      }));

      setResults(pokemons);
    } catch (error) {
      console.error("検索エラー:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Nav current="search" />

      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ポケモン名を入力（例：ピカチュウ）"
          className={styles.searchInput}
          disabled={!cacheReady}
        />
        <button
          type="submit"
          disabled={loading || !cacheReady}
          className={styles.searchButton}
        >
          {!cacheReady
            ? `準備中...（${cacheCount}/1010）`
            : loading
            ? "検索中..."
            : "検索"}
        </button>
      </form>

      {!cacheReady && (
        <div className={styles.cacheStatus}>
          検索データを準備しています。しばらくお待ちください...
        </div>
      )}

      {loading && <div className={styles.message}>検索中...</div>}

      {!loading && searched && results.length === 0 && (
        <div className={styles.message}>該当するポケモンが見つかりませんでした</div>
      )}

      {!loading && results.length > 0 && (
        <>
          <h2 className={styles.resultTitle}>検索結果（{results.length}件）</h2>
          <div className={styles.grid}>
            {results.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
