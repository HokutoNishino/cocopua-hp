# Logo Usage

このフォルダに店舗ロゴを配置して利用します。

## 推奨ファイル名

- `cocopua-logo.jpg`

## 推奨仕様

- 形式: JPG または PNG
- 横幅: 1200px 以上
- 背景: 透明PNGまたは白背景

## Reactでの利用例

```tsx
import logoUrl from "../../assets/brand/cocopua-logo.jpg";

export function BrandLogo() {
  return <img src={logoUrl} alt="Cocopua ロゴ" width={220} height={140} />;
}
```

## 運用メモ

- サイトヘッダー、フッター、ファビコン作成元として同一ロゴを使う。
- 余白が極端に大きい場合は、表示前にトリミングした派生画像も作成する。
