# Online Server (future phase)

初期プロトタイプでは未接続。
将来は Node.js + WebSocket でサーバー権威方式を採用する。

推奨メッセージ:
- `join_match`
- `build_facility`
- `draw_belt`
- `change_recipe`
- `warehouse_mode`
- `shipping_partition`
- `play_unit`
- `play_support`
- `self_destruct`

サーバーは固定tickで `src/core` と同等の決定論的シミュレーションを進め、クライアントへイベントと低頻度スナップショットを配信する。
