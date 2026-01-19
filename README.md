This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 環境設定

### 必要な環境

- **Node.js**: バージョン18以上（推奨: 20以上）
- **npm** または **yarn** または **pnpm** または **bun**

### セットアップ手順

1. **依存パッケージのインストール**
   ```bash
   npm install
   # または
   yarn install
   # または
   pnpm install
   # または
   bun install
   ```

2. **バックエンドAPIのセットアップ**
   
   このプロジェクトはバックエンドAPI（[pokemon-api](https://github.com/metametaru/pokemon-api)）と連携しています。
   
   **バックエンドAPIの起動方法：**
   ```bash
   # pokemon-apiリポジトリをクローン（まだの場合）
   git clone https://github.com/metametaru/pokemon-api.git
   cd pokemon-api
   
   # Spring Bootアプリケーションを起動
   ./mvnw spring-boot:run
   # または Windowsの場合
   mvnw.cmd spring-boot:run
   ```
   
   バックエンドAPIはデフォルトで `http://localhost:8080` で起動します。

3. **環境変数の設定（オプション）**
   
   プロジェクトルートに `.env.local` ファイルを作成し、必要に応じて以下の環境変数を設定できます：
   ```env
   # バックエンドAPIのベースURL（デフォルト: http://localhost:8080）
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
   ```
   
   > 注意: 環境変数が設定されていない場合、デフォルトで `http://localhost:8080` が使用されます。

4. **開発サーバーの起動**
   
   以下のコマンドで開発サーバーを起動します：

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> **重要**: フロントエンドを正常に動作させるには、バックエンドAPI（`http://localhost:8080`）が起動している必要があります。

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## アーキテクチャ

このプロジェクトは以下のように構成されています：

- **フロントエンド**: Next.js 16 (React 19)
- **バックエンド**: Spring Boot (Java)
- **API連携**: フロントエンドは `http://localhost:8080/api/pokemon` エンドポイントからポケモンデータを取得します

## 画像の設定

バックエンドAPI側で画像を返す方法については、[API_IMAGE_SETUP.md](./API_IMAGE_SETUP.md)を参照してください。

**簡単な方法（推奨）**: バックエンドAPIのレスポンスに`imageUrl`フィールドを含め、PokeAPIの画像URLを設定します：

```java
// 例: PokemonViewのimageUrlに設定
imageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + id + ".png"
```

フロントエンド側は既に対応済みなので、バックエンドAPIが`imageUrl`を返すだけで画像が表示されます。

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
