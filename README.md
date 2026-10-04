# Delivery Pilot v2.7 AI

## v2.7 更新・キャッシュ修正
- v2.6のOCRと二重登録防止を維持
- Service Workerを更新しやすい方式へ変更
- 新版インストール時に `skipWaiting()` を実行
- 有効化時に古いDelivery Pilotキャッシュを自動削除
- `clients.claim()` で新しいService Workerをすぐ適用
- HTMLはネットワーク優先 + `no-store`
- Service Worker登録URLにも v2.7 を付けて更新確認
- オフライン時のみキャッシュへフォールバック

これにより、今後GitHubへ新しい版を上書きした際に古い画面が残りにくくなります。
