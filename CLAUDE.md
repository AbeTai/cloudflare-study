# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## このリポジトリの目的

Cloudflare を学ぶための教材（講義スライド＋ハンズオン手順書）を作るリポジトリ。アプリケーションのリポジトリではない。

- 講義 30 分＋ハンズオン。ハンズオンは時間を気にせず、必要なものを全部入れてよい
- 受講者: AI には詳しいが、それ以外の IT 知識（ネットワーク、DNS、CDN、サーバーなど）は初心者
- きっかけ: 最近 Cloudflare が AI の文脈で話題になっているので追いつきたい
- 使われ方: チーム向けに講義するが、スライドは**読むだけで理解できる密度**にする（発表者が補足しなくても伝わるようにする）

## 成果物

1. **講義スライド**: claude.ai の Slides アーティファクトとして作る（ローカルに .pptx は作らない）
   - Cloudflare のサービス概要
   - 発展の歴史。事実を並べるだけでなく、各段階で「**なぜその方向に発展したのか**」を短く説明する
   - 図解や実際の管理画面（ダッシュボード）のスクリーンショットを適宜入れる
2. **ハンズオン手順書**（このリポジトリに Markdown ＋サンプルコードで置く）。UI 操作の手順には必ずスクリーンショットを入れる。次をすべて含める:
   - ダッシュボードの画面操作で Pages / R2 / AI Playground を触る
   - Workers と Workers AI でチャット API を作ってデプロイする
   - Workers でリモート MCP サーバーを作り、AI クライアントから呼び出す

## リポジトリ構成と更新方法

- `slides/deck/project/`：スライドの元ファイル。claude.ai の Slides アーティファクト <https://claude.ai/artifact/Mt1A7EhZdJgL9Le7fiBv2R> に公開済み
  - `deck.json` が目次（`order` がスライドの並び順）。`slides/<id>.html` 1 ファイルが 1 スライド
  - 直したら、Artifact ツールで `url` にこのアーティファクト、`root` に `slides/deck` を指定し、変更したファイルだけを再公開する。スライドの追加・削除・並べ替えのときだけ `deck.json` も送る
  - スライド内の画像はアーティファクトにアップロードした `/_blob/<id>` を参照している。元画像は `slides/img/`
- `handson/README.md`：ハンズオン手順書。スクリーンショットは `handson/img/`（番号は手順書のパート番号に対応）
- `handson/handson-chat-api/`、`handson/handson-mcp-server/`：手順書の完成形のコード（Cloudflare Workers のプロジェクト）
  - 型チェック：各フォルダで `npx tsc --noEmit`
  - ローカル実行：`npx wrangler dev`（MCP サーバーは `npx wrangler dev --port 8788` で起動し、`/mcp` に POST して確かめる）
  - デプロイ：`npx wrangler deploy`（wrangler はユーザーのアカウントでログイン済み）
- ユーザーのアカウントには、ハンズオン用の Worker として `handson-static-site`・`handson-chat-api`・`handson-mcp-server` を公開済み。R2 はユーザーがサブスクリプション登録済みで、バケット `handson-bucket`（`hello-r2.txt` をアップロード済み）がある

## 内容を作るときのルール

- **公式の一次資料を根拠にする**: developers.cloudflare.com、blog.cloudflare.com、Cloudflare の IR 資料（S-1 や決算資料）など。年代、製品名、料金、無料枠は必ずここで確認する
- ネットで話題になっている機能（AI 関連など）は入れる。ただし構成は「話題順」にしない。サービス全体を整理した中に位置づける
- 専門用語は初めて出てくる場所で一言説明する（例: エッジ、CDN、DNS、サーバーレス）
- ハンズオンは **Cloudflare の無料プラン** で最後まで終わる内容にする。有料機能が要る場合は、その旨を明記する
- ハンズオン受講者の Node.js / npm はインストール済みとは限らない。インストール手順から書く
- UI の確認やスクリーンショットには、ユーザーが Chrome でログイン済みの Cloudflare ダッシュボードを参照してよい（Claude in Chrome を使う）。読むだけにして、アカウント設定の変更やリソースの削除はユーザーの許可なしに行わない
- スクリーンショットにはアカウント ID、メールアドレス、トークンなどが写らないようにする
