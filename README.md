# Cloudflare 入門（講義スライド＋ハンズオン）

AI には詳しいけれど、ネットワークやサーバーは初心者という人向けの Cloudflare 入門教材です。講義 30 分とハンズオンで、次の 3 つができるようになることを目指します。

1. Cloudflare が何をしている会社か、一言で説明できる
2. Cloudflare がなぜ AI の文脈で話題なのか、歴史をたどって説明できる
3. AI アプリと MCP サーバーを自分で公開できる

内容は 2026 年 10 月時点の公式情報（developers.cloudflare.com、blog.cloudflare.com、決算資料）にもとづいています。

## 中身

| ファイル | 内容 |
|---|---|
| [Cloudflare 入門.pdf](Cloudflare%20入門.pdf) | 講義スライド（PDF） |
| [Cloudflare 入門.pptx](Cloudflare%20入門.pptx) | 講義スライド（PowerPoint、発表者ノート付き） |
| [handson/README.md](handson/README.md) | ハンズオン手順書（スクリーンショット付き） |
| [handson/handson-chat-api/](handson/handson-chat-api/) | 完成形のコード：Workers AI を使ったチャット API |
| [handson/handson-mcp-server/](handson/handson-mcp-server/) | 完成形のコード：リモート MCP サーバー |
| [handson/static-site/](handson/static-site/)、[handson/r2-sample/](handson/r2-sample/) | ハンズオンで使うサンプルファイル |
| [slides/deck/](slides/deck/) | スライドの元データ（1 スライド 1 HTML） |

## 講義の構成（23 枚）

1. **Cloudflare とは**：利用者とサービスの「間」に立つネットワーク、規模、基本用語（DNS・CDN・エッジ・サーバーレス）、4 つの事業領域、実際の管理画面
2. **発展の歴史**：2004 年のスパム追跡から、Universal SSL、Workers、データ系サービス、Zero Trust、Workers AI、リモート MCP、AI クローラーへの課金、エージェント向けクラウドまで。各段階で「何をしたか」と「なぜそうしたか」をセットで説明する
3. **AI の文脈で押さえる機能**：AI を作る側の機能（Workers AI・AI Gateway・Agents SDK など）、AI から守る・稼ぐ側の機能（AI Crawl Control・Pay per crawl など）、MCP の仕組み、無料枠

## ハンズオンの構成

すべて Cloudflare の無料プランで行えます（R2 だけは、無料枠で使う場合も支払い方法の登録が必要です）。

| パート | 内容 |
|---|---|
| 0 | 準備（Cloudflare アカウント、Node.js） |
| 1 | HTML をドラッグして Web サイトを公開する |
| 2 | R2 にファイルを保存する |
| 3 | AI Playground でいろいろなモデルを試す |
| 4 | Workers と Workers AI でチャット API を作り、公開する |
| 5 | リモート MCP サーバーを作り、AI Playground から呼び出す |
| 6 | 片付け |

## サンプルコードの動かし方

Node.js（LTS 版）が必要です。

```bash
cd handson/handson-chat-api
npm install
npx wrangler login
npx wrangler deploy
```

MCP サーバーも同じ手順で、`handson/handson-mcp-server` で実行します。詳しくは [ハンズオン手順書](handson/README.md) を見てください。

## 注意

- Cloudflare の画面やサービス名は頻繁に変わります。手順書の画面と違う場合は、同じ名前のボタンを探すか、公式ドキュメントを確認してください。
- スクリーンショット中のアカウント名やサブドメインは、ダミーの文字に置き換えています。
- この教材は個人の学習用に作ったもので、Cloudflare 社の公式資料ではありません。
