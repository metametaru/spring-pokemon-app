"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/src/hooks/useAuth";
import { checkIsFavorite, addFavorite, removeFavorite } from "@/src/utils/favoriteApi";
import styles from "./FavoriteButton.module.css";

type Props = {
  pokemonId: number;
};

const FavoriteButton = ({ pokemonId }: Props) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      checkIsFavorite(pokemonId)
        .then(setIsFavorite)
        .catch(console.error);
    }
  }, [user, pokemonId]);

  // ログインしていない場合は表示しない
  if (!user) {
    return null;
  }

  const handleClick = async () => {
    if (loading) return;

    setLoading(true);
    try {
      if (isFavorite) {
        await removeFavorite(pokemonId);
        setIsFavorite(false);
      } else {
        await addFavorite(pokemonId);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("お気に入り操作に失敗:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${styles.button} ${isFavorite ? styles.active : ""}`}
      aria-label={isFavorite ? "お気に入りから削除" : "お気に入りに追加"}
    >
      {isFavorite ? "♥" : "♡"}
    </button>
  );
};

export default FavoriteButton;
