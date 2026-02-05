"use client";

import { useState, useEffect } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/src/lib/firebase";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("ログインエラー:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("ログアウトエラー:", error);
      throw error;
    }
  };

  // Spring Boot APIに送るトークンを取得
  const getIdToken = async (): Promise<string | null> => {
    if (!user) return null;
    return await user.getIdToken();
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signOut,
    getIdToken,
  };
};
