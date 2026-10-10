# Architecture

## 方針
将来のカード追加、モード追加、オンライン化のため「ルール」「データ」「UI」「通信」を分離する。

- `src/data/` : 素材・カード・施設・調整値。カード追加は原則ここだけ。
- `src/core/` : ブラウザ表示に依存しない工場/戦闘シミュレーション。
- `src/ui/` : DOMレンダリング。将来3D部分だけ Babylon.js 等へ置換可能。
- `src/modes/` : 今後 Practice / Casual / Ranked / Friend 等を差し込む場所。
- `src/net/` : Local / WebSocket transport を差し替える場所。

## オンライン化するとき
クライアントを正とせず、サーバー権威方式にする。
クライアントは `BUILD`, `PLACE_UNIT`, `PLAY_CARD`, `CHANGE_RECIPE` 等の意図だけ送り、サーバーが同じ `core` ルールで検証・進行する。
毎フレーム座標を送らず、イベント/時刻と定期スナップショットを同期する。

## データ追加
カードは `src/data/cards.js` に1エントリ追加し、`factory` と `inputs` を設定すればカード工場レシピへ自動出現する。
施設カテゴリを増やす場合は `facilities.js` と、それを処理する `kind` 実装のみ追加する。
