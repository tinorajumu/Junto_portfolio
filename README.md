# Junto Murai クリエイティブポートフォリオ

配信UI × 3D水槽ファクトリー × 無限の深海水族館をコンセプトにしたインタラクティブ・ポートフォリオサイト。
仕様書: [`planing/portfolio_specification_v1.pdf`](planing/portfolio_specification_v1.pdf)

## 技術スタック

- React + TypeScript + Vite
- Tailwind CSS（UTSUSHIYO風ダーク×ゴールドUI）
- Three.js + @pixiv/three-vrm（3D水槽・FBXボディ・VRMお面）
- GSAP（水流連動インタラクティブ年表）
- Web Speech API（AIコンシェルジュマスコット、音声認識・合成）
- ブラウザ LocalStorage（クリック数・年表エネルギー・感想ログの永続化）

## セットアップ

```bash
npm install
npm run dev       # 開発サーバー
npm run build     # 本番ビルド（dist/）
npm run preview   # ビルド結果のプレビュー
```

## 3Dモデル素材

`public/models/` に以下を配置しています（自作AIVtuberプロジェクトの素材を流用）。

- `body.fbx` — ボディ（骨格・モーション用）
- `mask.vrm` — お面（表情制御用）
- `motion/idle.fbx` / `walk.fbx` / `run.fbx` / `jump.fbx` — モーションクリップ

素材を差し替える場合は同名でこのディレクトリ内のファイルを置き換えてください。

## デプロイ

`main` ブランチへの push で GitHub Actions（`.github/workflows/deploy.yml`）が自動的に
GitHub Pages へビルド・デプロイします。リポジトリの Settings → Pages → Source が
「GitHub Actions」になっていることを確認してください。

`vite.config.ts` の `base` はリポジトリ名に合わせて設定しています。リポジトリ名を変更した場合は
`base: '/<リポジトリ名>/'` も合わせて変更してください。
