# Webmo2 JavaScriptライブラリ

ライブラリを利用すると数行のJavaScriptを記述するだけでWebmoを制御できます。

このライブラリはJavaScript版（ブラウザ利用）になっております。Node.js版はこちら。

# インストール

CDN
- `unpkg`
- 使った方法を説明する

インストール
- `yarn install`

# 使い方

```
import Webmo from 'webmo-sdk'
```

or

```
const Webmo = require('webmo-sdk')
```


使用例
```
webmo.init({ host: 'webmo.local' })
// モータ1が90度/秒の速度で回転し、1秒後に停止する
await Webmo.motor1.rotate({ speed: 90 })
await Webmo.wait(1000)
await webmo.motor1.stop()

// モータ1が180度/秒の速度で回転し、1秒後に停止する
await Webmo.motor2.rotate({ speed: 180 })
await Webmo.wait(1000)
await webmo.motor2.stop()

await Webmo.wait(500)

// モータ1, モータ2が720度回転して停止する
Webmo.motor.rotateBy({ degree: 720, speed: 180 })
```

# ドキュメント

[SDK ドキュメント](./docs/document.md)