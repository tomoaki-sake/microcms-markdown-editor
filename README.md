# microCMS Markdown Editor
microCMSの拡張フィールドを利用したmarkdown入稿環境を構築するためのEditorです。
microCMS公式のこちらを参考に構築しています。

[microCMSの拡張フィールドを利用したMarkdownの入稿環境をつくる](https://blog.microcms.io/field-extension-markdown-editor/)

記事内の公式APIパッケージでうまく作動しなかったため、iframeでの通信はマニュアルを元に実装しています。

https://document.microcms.io/manual/field-extension

# 起動方法
`.env`ファイルを以下コマンドでコピーし、自身のAPIオリジンを入力
```sh
cp .env.local.sample .env.local
```

npmで起動
```sh
npm run dev
```

# microCMSとの連携

microCMS上で次の操作を行う
1. API設定>APIスキーマ>フィールドを追加
2. フィールドID, 表示名は好みの値を設定する
3. 種類は「拡張フィールド」とし、拡張フィールドの読み込み先URLを`http://localhost:3000`とする

以上でmicroCMS上で本アプリケーションが読み込まれ、入力したmarkdownがAPIに載る