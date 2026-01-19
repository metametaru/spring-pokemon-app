# API側で画像を返す方法

バックエンドAPI（Spring Boot）で画像を返す方法は2つあります。

## 方法1: 画像URLを返す（推奨・簡単）

PokeAPIの画像URLをそのまま返す方法です。実装が簡単で、ストレージも不要です。

### バックエンドAPI側の実装

`PokemonView`（または対応するDTO）の`imageUrl`フィールドに、PokeAPIの画像URLを設定します。

**PokeAPIの画像URL形式：**
```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png
```

**Java実装例：**
```java
// PokemonView.java または DTOクラス
public class PokemonView {
    private Integer id;
    private String name;
    private String nameJa;
    // PokeAPIと同じ単位:
    // height: decimeters（例: 4 => 0.4m）
    // weight: hectograms（例: 60 => 6.0kg）
    private Integer height;
    private Integer weight;
    private List<String> types;
    private List<String> abilities;
    private String imageUrl; // このフィールドに画像URLを設定
    
    // imageUrlのゲッター/セッター
    public String getImageUrl() {
        return imageUrl;
    }
    
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}

// Service または Controller で画像URLを設定
public PokemonView toPokemonView(Pokemon pokemon) {
    PokemonView view = new PokemonView();
    view.setId(pokemon.getId());
    view.setName(pokemon.getName());
    view.setNameJa(pokemon.getNameJa());
    view.setHeight(pokemon.getHeight());
    view.setWeight(pokemon.getWeight());
    view.setTypes(pokemon.getTypes());
    view.setAbilities(pokemon.getAbilities());
    
    // 画像URLを設定（PokeAPIの画像URLを使用）
    view.setImageUrl(String.format(
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/%d.png",
        pokemon.getId()
    ));
    
    return view;
}
```

### メリット
- ✅ 実装が簡単
- ✅ ストレージ不要
- ✅ 画像の管理が不要

### デメリット
- ❌ 外部API（PokeAPI）に依存
- ❌ カスタム画像を使用できない

---

## 方法2: 画像ファイルを直接配信する

バックエンドAPIで画像ファイルを保存・配信する方法です。カスタム画像を使用したい場合に適しています。

### バックエンドAPI側の実装

#### 1. 画像ファイルの保存場所を設定

`application.properties`または`application.yml`に設定を追加：

```properties
# application.properties
pokemon.image.directory=./images/pokemon
pokemon.image.url-prefix=/api/images/pokemon
```

#### 2. 画像ファイルを保存するディレクトリを作成

```
src/main/resources/static/images/pokemon/
```

または実行時に作成されるディレクトリ：
```
./images/pokemon/
```

#### 3. 画像配信用のControllerを作成

```java
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/images")
public class ImageController {
    
    private final Path imageDirectory;
    
    public ImageController(@Value("${pokemon.image.directory:./images/pokemon}") String imageDir) {
        this.imageDirectory = Paths.get(imageDir).toAbsolutePath().normalize();
    }
    
    @GetMapping("/pokemon/{id}")
    public ResponseEntity<Resource> getPokemonImage(@PathVariable Integer id) {
        try {
            Path imagePath = imageDirectory.resolve(id + ".png");
            Resource resource = new UrlResource(imagePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_PNG)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + id + ".png\"")
                    .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
```

#### 4. 画像URLを設定

```java
@Value("${pokemon.image.url-prefix:/api/images/pokemon}")
private String imageUrlPrefix;

public PokemonView toPokemonView(Pokemon pokemon) {
    PokemonView view = new PokemonView();
    // ... 他のフィールドの設定
    
    // 画像URLを設定（バックエンドAPIの画像エンドポイント）
    view.setImageUrl(imageUrlPrefix + "/" + pokemon.getId());
    
    return view;
}
```

#### 5. 画像ファイルをダウンロード・保存する（オプション）

初回起動時やデータ取得時に画像をダウンロードして保存する：

```java
@Service
public class PokemonImageService {
    
    @Value("${pokemon.image.directory:./images/pokemon}")
    private String imageDirectory;
    
    public void downloadPokemonImage(Integer id) throws IOException {
        String imageUrl = String.format(
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/%d.png",
            id
        );
        
        Path imagePath = Paths.get(imageDirectory, id + ".png");
        Files.createDirectories(imagePath.getParent());
        
        try (InputStream in = new URL(imageUrl).openStream()) {
            Files.copy(in, imagePath, StandardCopyOption.REPLACE_EXISTING);
        }
    }
}
```

### メリット
- ✅ カスタム画像を使用できる
- ✅ 外部APIへの依存を減らせる
- ✅ 画像の最適化が可能

### デメリット
- ❌ 実装が複雑
- ❌ ストレージが必要
- ❌ 画像の管理が必要

---

## 推奨実装

**まずは方法1（画像URLを返す）から始めることを推奨します。**

理由：
- 実装が簡単で、すぐに動作確認できる
- フロントエンド側は既に`imageUrl`フィールドに対応済み
- 後から方法2に移行することも可能

### 実装手順

1. バックエンドAPIの`PokemonView`（またはDTO）に`imageUrl`フィールドがあることを確認
2. ポケモンデータを返す際に、`imageUrl`にPokeAPIの画像URLを設定
3. フロントエンド側は既に対応済みなので、そのまま動作する

### 画像URLの形式

PokeAPIの公式画像URL：
```
https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png
```

例：
- ピカチュウ（ID: 25）: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png`
- フシギダネ（ID: 1）: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`

---

## フロントエンド側の対応状況

フロントエンド側は既に画像表示に対応済みです：

- ✅ `PokemonView`型に`imageUrl: string`フィールドが定義済み
- ✅ `toPokemonFromView.ts`で`imageUrl`を`image`に変換
- ✅ `Card.tsx`で画像を表示

バックエンドAPIが`imageUrl`を返すだけで、フロントエンド側は自動的に画像が表示されます。
