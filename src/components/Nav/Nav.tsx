import Link from "next/link";
import styles from "./Nav.module.css";

type Props = {
  current?: "home" | "list";
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
    </nav>
  );
};

export default Nav;
