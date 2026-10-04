# Delivery Pilot v2.8 AI

## v2.8 更新・キャッシュ修正
- v2.6のOCRと二重登録防止を維持
- Service Workerを更新しやすい方式へ変更
- 新版インストール時に `skipWaiting()` を実行
- 有効化時に古いDelivery Pilotキャッシュを自動削除
- `clients.claim()` で新しいService Workerをすぐ適用
- HTMLはネットワーク優先 + `no-store`
- Service Worker登録URLにも v2.8 を付けて更新確認
- オフライン時のみキャッシュへフォールバック

これにより、今後GitHubへ新しい版を上書きした際に古い画面が残りにくくなります。


## v2.8 修正内容
- v2.7に残っていたJavaScriptの重複コードを削除（画面機能が止まる原因を修正）
- Service Workerの二重登録を1本化し、v2.8キャッシュへ更新
- iPhone/PWAでもスクショ選択を開きやすいボタン方式へ変更
- 同じスクショを続けて選び直しても反応するようファイル入力を毎回リセット
- OCR・二重登録防止・既存データ保存キーは維持
