
# ライブラリ ドキュメント

# Webmo.init or Webmo.create

引数
- host `[option:string]`
  - ホストを指定します。WebmoのIPアドレスまたはmDNSを指定します
  - デフォルト `webmo.local`
  - 入力例 `192.168.1.2`, `webmo.local`
- isHttp `[option:boolean]`
  - falseにするとHTTP通信を使わずにWebSocket通信のみにすることができます
  - デフォルト `true`
- isWebSocket `[option:boolean]`
  - falseにするとWebSocket通信を使わずにHTTP通信のみにすることができます
  - デフォルト `true`

```
Webmo.init({ host: 'webmo.local' })
```
```
const webmo = Webmo.create({ host: 'webmo.local' })
```

## initとcreateの違い

### Webmoを1台だけ利用する場合はinitを利用することをおすすめします。

`Webmo.motor`や`Webmo.motor1`という形で利用できます。一度initを済ませていれば別ファイルでinitする必要がありません。

ファイルA
```
import Webmo from 'webmo2-js'
Webmo.init({ host: 'webmo.local' })
```

ファイルB
```
import Webmo from 'webmo2-js'
Webmo.motor.rotate({ speed: 30 }) // ファイルAで先にinit済みであれば、そのまま利用利用できます
```

### 複数のWebmoを利用する場合はcreateを利用することをおすすめします。

別々のWebmoオブジェクトとして作成することができます。
```
const webmoA = Webmo.create({ host: '192.168.1.4'})
const webmoB = Webmo.create({ host: '192.168.1.5'})
webmoA.motor.rotate({ speed: 20 })
webmoB.motor.rotate({ speed: 30 })
```

# モータ制御について
M5Stack版のWebmoでは1台につき、2つのモータを取り付けることができます。

1つのモータだけを制御する場合やそれぞれ独立して制御する場合は使用するモータ（`Webmo.motor1`または`Webmo.motor2`）を使用するとシンプルです。

2つのモータを制御したい場合は、`Webmo.motor`を使用することで、ぴったり同時に２つのモータの速度を変えたり、停止されたりすることができます。

### [rotate](#rotate)
指定した速度で回転します。

### [rotateBy](#rotate_by)
指定する角度（相対値）だけ回転します。

### [rotateTo](#rotate_to)
指定する角度（絶対値）になるまで回転します。

### [stop](#rotate_stop)
回転を停止します。
### [lock](#rotate_lock)
回転を停止させ、シャフトをロックします。

### [getRotation](#get_rotation)
回転位置を取得します。

### [resetRotation](#reset_rotation)
回転位置をリセットします。
### [別々の引数でモータを同時に実行する](#rotate_sync)
引数を配列で渡すと、別々の引数で実行できます。

### [Webmo.wait](#wait)
指定した時間、実行をawaitする。

<a id="rotate"></a>
# rotate
指定した速度（度/秒）で回転し続けます
- `Webmo.motor.rotate`
- `Webmo.motor1.rotate`
- `Webmo.motor2.rotate`

引数
- speed: `number`
  - 指定した速度（度/秒）で回転し続けます。
  - マイナス値で反時計回りになります。

```
Webmo.motor.rotate({ speed: 90 })
```


<a id="rotate_by"></a>
# rotateBy
指定した角度（相対値）だけ回転します。
- `Webmo.motor.rotateBy`
- `Webmo.motor1.rotateBy`
- `Webmo.motor2.rotateBy`

引数
- degree: `number`
  - 指定した角度だけ回転したあと停止します。
  - マイナス値で反時計回りになります。
- speed: `number`
  - 回転速度（度/秒）を指定します。
  - 注意）指定した速度に達する前であっても、停止位置に近づいたら速度を緩めます。

```
// 360度回転して停止する
Webmo.motor.rotateBy({ degree: 360, speed: 90 })
```


<a id="rotate_to"></a>
# rotateTo
指定した角度（絶対値）になるまで回転します。
- `Webmo.motor.rotateTo`
- `Webmo.motor1.rotateTo`
- `Webmo.motor2.rotateTo`

引数
- degree: `number`
  - 現在の絶対値は[getRotation](#get_rotation)で取得できます。
- speed: `number`
  - 回転速度（度/秒）を指定します。
  - 注意）指定した速度に達する前であっても、停止位置に近づいたら速度を緩めます。

```
Webmo.motor.rotateTo({ degree: 720, speed: 90 })
```
```
// 応用例
await Webmo.motor.resetRotation() // 現在の回転位置を0にします
await Webmo.motor.rotate({ speed: 180 })
await Webmo.wait(2000)
await Webmo.motor.rotateTo({ degree: 0, speed: 90 }) // resetRotation()したときの位置まで戻ります
```


<a id="rotate_stop"></a>
# stop
回転を停止します。
- `Webmo.motor.stop`
- `Webmo.motor1.stop`
- `Webmo.motor2.stop`

引数
- smooth: `[option: number]`
  - `true`: 徐々に速度を緩めながら停止します。
  - `false`: 瞬時に止まります。
  - デフォルト: `true`

```
Webmo.motor.stop({ smooth: false })
```

<a id="rotate_lock"></a>
# lock
回転を停止させ、シャフトをロックします。（力を与えて停止状態を維持します。）
- `Webmo.motor.lock`
- `Webmo.motor1.lock`
- `Webmo.motor2.lock`

引数
- smooth: `[option: number]`
  - `true`: 徐々に速度を緩めながら停止します。
  - `false`: 瞬時に止まります。
  - デフォルト: `true`

```
Webmo.motor.lock({ smooth: false })
```


<a id="get_rotation"></a>
# getRotation
回転位置を取得します。Webmoは電源が消えたとしても回転位置を保持しています。32ビット（-2,147,483,648から2,147,483,647）まで表現できます。
- `Webmo.motor.getRotation`
- `Webmo.motor1.getRotation`
- `Webmo.motor2.getRotation`

引数
- なし

```
const motor1Rotation = await Webmo.motor1.getRotation()
console.log(motor1Rotation) // { degree: 135 }

const rotations = await Webmo.motor.getRotation()
console.log(rotations) // [{ degree: 248 }, { degree: -493 }]
```


<a id="reset_rotation"></a>
# resetRotation
回転位置をリセットします。
- `Webmo.motor.lock`
- `Webmo.motor1.lock`
- `Webmo.motor2.lock`

引数
- offset: `[option: number]`
  - リセット時にオフセットを指定できます。
  - デフォルト: 0

```
// 回転位置を0にします
await Webmo.motor1.resetRotation()
const rotation = await Webmo.motor1.getRotation()
console.log(rotation) // { degree: 0 }

// リセット時にオフセットを設定します
await Webmo.motor1.resetRotation({ offset: 360 })
const rotation = await Webmo.motor.getRotation()
console.log(rotation) // { degree: 360 }

```

<a id="rotate_sync"></a>

# 別々の引数でモータを同時に実行する
引数を配列で渡すと、別々の引数で実行できます。
- rotate
- rotateBy
- rotateTo
- stop
- lock

```
// モータ1は速度90（度/秒）で、モータ2は速度（180度/秒）で同時に回転し始める
Webmo.motor.rotate([{ speed: 90 }, { speed: 180 }])
```
```
// 同時に回転を始めモータ1は180度回転後、モータ2は360度回転後に停止する。（この例では停止も同時になる。）
Webmo.motor.rotateBy([{ degree: 180, speed: 90 }, { degree: 360, speed: 180 }])
```
```
// モータ1は急停止し、モータ2は徐々に速度を緩めながら停止する。
Webmo.motor.stop([{ smooth: false }, { smooth: true }])
```

nullを渡すと、そのモータは何も実行されません、
```
// モータ2だけが回転し始める
Webmo.motor.rotate([null, { speed: 180 }])
```

<a id="wait"></a>

# Webmo.wait
指定した時間、実行をawaitする。

引数
- millis: `number`
  - ミリ秒を指定します。

```
// 1秒後に停止する例
await Webmo.motor.rotate({ speed: 360 })
await Webmo.wait(1000)
await Webmo.motor.stop()
```

内部実装は以下になっています。
```
const wait = async (millis) => {
  await new Promise((resolve) => setTimeout(resolve, millis))
}
```
# その他関数について

[イベントリスナー](./events.md)
- WebSocket接続・切断等のイベント取得

[UDP通信](./UDP.md)
- スマホのセンサ情報を利用したインタラクションを設計する
