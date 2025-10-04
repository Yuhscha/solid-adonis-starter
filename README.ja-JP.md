# Solid Adonis Starter

モノレポ構成のSolidStart + AdonisJSフルスタックスターターテンプレートです。
Docker Composeベースの開発環境で、すぐに開発を始められます。

## 特徴

- **Frontend**: SolidStart (apps/frontend)
- **Backend**: AdonisJS v6 (apps/backend)
- **Database**: PostgreSQL 17.6
- **Package Manager**: pnpm
- **開発環境**: Docker Compose + DevContainer
- **タスクランナー**: Just
- **コード品質**: Biome + ESLint
- **テスト**: Vitest (frontend) + Japa (backend)
- **CI/CD**: GitHub Actions Dockerベース

## 必要要件

- Docker & Docker Compose
- [Just](https://github.com/casey/just) (コマンドランナー)

## クイックスタート

### 方法1: コマンドラインでのセットアップ
```bash
# 1. リポジトリをクローン
git clone <repository-url>
cd solid-adonis-starter

# 2. 既存のgit履歴を削除して新しいリポジトリとして初期化
rm -rf .git
git init
git add .
git commit -m "Initial commit"

# 3. 初回セットアップ（環境変数 + 依存関係）
just setup

# 4. 開発環境起動
just dev
```

### 方法2: VS Code + GitHub連携
```bash
# 1. リポジトリをクローン
git clone <repository-url>
cd solid-adonis-starter

# 2. 既存のgit履歴を削除
rm -rf .git

# 3. VS Codeで開く
code .

# 4. VS Codeの「GitHubに公開」機能を使用:
#    - コマンドパレットを開く (Ctrl/Cmd + Shift + P)
#    - "Git: Initialize Repository" を実行
#    - "GitHub: Publish to GitHub" を実行
#    - リポジトリ名と公開設定を選択

# 5. 初回セットアップ（環境変数 + 依存関係）
just setup

# 6. 開発環境起動
just dev
```

**アクセス先:**
- Frontend: http://localhost:8081
- Backend API: http://localhost:8080
- Database: localhost:5432

## 開発コマンド

### メインコマンド（推奨）

```bash
# 利用可能なコマンド一覧
just

# 開発環境起動
just dev

# バックグラウンド起動
just dev-detached

# 停止
just dev-down

# ログ確認
just dev-logs           # 全サービス
just dev-logs frontend  # 特定サービス

# データベース操作
just db-migrate         # マイグレーション実行
just db-seed           # シードデータ投入
just db-fresh          # フレッシュマイグレーション（削除＋再作成）

# コンテナ操作
just exec backend bash # backendコンテナに接続
just exec frontend bash # frontendコンテナに接続

# クリーンアップ
just clean             # コンテナ・イメージ・ボリューム削除
just clean-all         # 完全削除 + システムクリーンアップ
```

### Docker Compose（直接実行）

```bash
# 開発環境
docker compose up -d
docker compose logs -f

# 本番環境
docker compose -f compose.prod.yaml up -d

# 停止・削除
docker compose down
docker compose down -v  # ボリュームも削除
```

## プロジェクト構造

```
.
├── apps/
│   ├── frontend/          # SolidStartアプリケーション
│   ├── backend/           # AdonisJS APIサーバー
│   └── shared/            # 共有型定義パッケージ
├── docker/               # 本番用Dockerファイル
├── .github/
│   ├── workflows/        # GitHub Actions CI/CD
│   └── docker/          # CI専用Dockerファイル
├── .devcontainer/        # VS Code DevContainer設定
├── .vscode/              # VS Code設定
├── compose.yaml          # 開発環境
├── compose.prod.yaml     # 本番環境（Dockerfile.prodテスト用）
├── justfile              # タスクランナー設定
├── biome.json            # Biome設定
├── eslint.config.js      # ESLint設定
├── pnpm-workspace.yaml   # pnpmワークスペース設定
└── tsconfig.json         # TypeScript設定
```

## 開発環境詳細

- **Node.js**: v24
- **AdonisJS CLI**: プリインストール済み
- **DevContainer**: VS Code統合開発環境
- **PostgreSQL**: v17.6
- **Just**: タブ補完対応済み

## よく使うワークフロー

### 開発コマンド
| タスク | コマンド |
|--------|----------|
| 初回セットアップ | `just setup` |
| 開発開始 | `just dev` |
| ログ確認 | `just dev-logs [service]` |
| DB操作 | `just db-migrate`, `just db-seed` |
| コンテナ接続 | `just exec backend bash` |
| 環境リセット | `just clean && just dev` |

### コード品質コマンド
| タスク | コマンド |
|--------|----------|
| コード整形 | `just format` |
| リント実行 | `just lint` |
| 型チェック | `just typecheck` |
| テスト実行 | `just test` |
| フロントエンドテスト | `just test-frontend-run` |
| バックエンドテスト | `just test-backend` |
| 本番ビルド | `just build` |

### CIコマンド
| タスク | コマンド |
|--------|----------|
| CIイメージビルド | `just ci-build` |
| 完全CIパイプライン実行 | `just ci-test` |
| CIリントのみ実行 | `just ci-lint` |
| CIフロントエンドテスト | `just ci-test-frontend` |
| CI型チェック | `just ci-typecheck` |
| CIビルド実行 | `just ci-build-all` |
| フォーマット修正 | `just ci-format` |

## トラブルシューティング

### ポートが使用中エラー
```bash
just clean
just dev
```

### データベース接続エラー
```bash
just db-fresh
```

### 依存関係の問題
```bash
just clean-all
just setup
```

### CIテスト失敗
```bash
# フォーマットエラーを修正
just ci-format

# CIイメージを再ビルドしてテスト実行
just ci-build
just ci-test
```

## ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## コントリビューション

プルリクエストやイシューの報告を歓迎します。大きな変更を行う前に、まずイシューを開いて変更内容について議論してください。