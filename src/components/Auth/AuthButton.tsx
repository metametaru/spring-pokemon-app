"use client";

import { useAuth } from "@/src/hooks/useAuth";
import styles from "./AuthButton.module.css";

const AuthButton = () => {
  const { user, loading, signInWithGoogle, signOut } = useAuth();

  if (loading) {
    return <div className={styles.loading}>読み込み中...</div>;
  }

  if (user) {
    return (
      <div className={styles.userInfo}>
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt="プロフィール"
            className={styles.avatar}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {user.displayName?.charAt(0) || "?"}
          </div>
        )}
        <span className={styles.userName}>{user.displayName}</span>
        <button onClick={signOut} className={styles.button}>
          ログアウト
        </button>
      </div>
    );
  }

  return (
    <button onClick={signInWithGoogle} className={styles.button}>
      Googleでログイン
    </button>
  );
};

export default AuthButton;
