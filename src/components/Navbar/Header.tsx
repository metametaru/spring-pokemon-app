"use client";

import dynamic from "next/dynamic";
import styles from "./Header.module.css";

// SSRを無効にしてハイドレーションエラーを防ぐ
const AuthButton = dynamic(() => import("../Auth/AuthButton"), {
  ssr: false,
  loading: () => <div style={{ color: "white", fontSize: "0.875rem" }}>読み込み中...</div>,
});

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>ポケモン図鑑</h1>
      <div className={styles.authArea}>
        <AuthButton />
      </div>
    </header>
  );
};

export default Header;
