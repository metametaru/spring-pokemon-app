import Nav from "@/src/components/Nav/Nav";
import Card from "@/src/components/Card/Card";
import { getPokemon } from "@/src/utils/pokemon";
import { toPokemon } from "@/src/utils/toPokemon";
import styles from "./home.module.css";

const MAX_DEX = 1010; // 現行の全国図鑑上限を想定

const getTodayDexNumber = () => {
  const now = new Date();
  const mm = now.getMonth() + 1;
  const dd = now.getDate();
  const number = Number(`${mm.toString().padStart(2, "0")}${dd
    .toString()
    .padStart(2, "0")}`);
  // 1〜MAX_DEXに丸める
  return ((number - 1) % MAX_DEX) + 1;
};

export default async function Home() {
  const dexNumber = getTodayDexNumber();

  const POKEAPI_BASE_URL =
    process.env.NEXT_PUBLIC_POKEAPI_BASE_URL || "https://pokeapi.co/api/v2";

  // 日付由来の図鑑番号のポケモンを取得
  const pokemon = await toPokemon(
    await getPokemon(`${POKEAPI_BASE_URL}/pokemon/${dexNumber}`)
  );

  return (
    <div className={styles.page}>
      <Nav current="home" />
      <div className={styles.hero}>
        <div className={styles.title}>今日のポケモン</div>
        <div className={styles.subtitle}>
          {`本日の日付 → 図鑑番号 ${dexNumber}`}
        </div>
        <div className={styles.cardWrapper}>
          <Card pokemon={pokemon} />
        </div>
      </div>
    </div>
  );
}
