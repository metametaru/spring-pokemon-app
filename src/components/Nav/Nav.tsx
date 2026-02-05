import Link from "next/link";
import styles from "./Nav.module.css";

type Props = {
  current?: "home" | "list" | "favorites" | "search";
};

const Nav = ({ current }: Props) => {
  return (
    <nav className={styles.nav}>
      <Link
        href="/"
        aria-current={current === "home" ? "page" : undefined}
      >
        今日のポケモン
      </Link>
      <Link
        href="/list"
        aria-current={current === "list" ? "page" : undefined}
      >
        ポケモン一覧
      </Link>
      <Link
        href="/search"
        aria-current={current === "search" ? "page" : undefined}
      >
        検索
      </Link>
      <Link
        href="/favorites"
        aria-current={current === "favorites" ? "page" : undefined}
      >
        お気に入り
      </Link>
    </nav>
  );
};

export default Nav;
