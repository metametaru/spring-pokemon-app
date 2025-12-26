import { AbilityApi } from "../types/abilityApi";
export const getAbility = async (url: string): Promise<AbilityApi> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch ability");
  }
  return res.json();
};

const abilityCache = new Map<string, string>();

export const getJapaneseAbilityName = async (url: string) => {
  if (abilityCache.has(url)) {
    return abilityCache.get(url)!;
  }

  const ability = await getAbility(url);
  const ja =
    ability.names.find((n) => n.language.name === "ja")?.name ?? "不明";
  abilityCache.set(url, ja);
  return ja;
};
