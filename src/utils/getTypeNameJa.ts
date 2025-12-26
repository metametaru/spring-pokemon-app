import { TypeApi } from "../types/typeApi";

const typeCache = new Map<string, string>();

export const getTypeNameJa = async (url: string): Promise<string> => {
  if (typeCache.has(url)) {
    return typeCache.get(url)!;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch type");
  }

  const data: TypeApi = await res.json();
  const ja = data.names.find((n) => n.language.name === "ja")?.name ?? "不明";

  typeCache.set(url, ja);
  return ja;
};
