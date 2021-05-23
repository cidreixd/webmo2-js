# Webmo2 JavaScript ライブラリ

ライブラリを利用すると数行の JavaScript を記述するだけで Webmo を制御できます。

このライブラリは JavaScript 版（ブラウザ利用）になっております。Node.js 版はこちら。

# インストール

yarn の場合

```
yarn install webmo2-js
```

npm の場合

```
npm install webmo2-js
```

unpkg CDN の場合

```
<script src="https://cdn.jsdelivr.net/gh/cidreixd/webmo2-js/dist/webmo.min.js"></script>
```

# 使い方


```
import webmo from 'webmo2-js'
```
or
```
const webmo = require('webmo2-js')
```

### 使用例

```
import webmo from 'webmo2-js'

webmo.init({ host: 'webmo.local' })

// 180度/秒の速度で回転し、3秒後に停止する
await webmo.motor.rotate({ speed: 180 })
await webmo.wait(3000)
await webmo.motor.stop()
```

# ライブラリ ドキュメント

[ドキュメント](./docs/index.md)
