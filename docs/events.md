# イベントリスナー

## Webmo.websocketClient.events on/off

WebSocket接続のイベントリスナー追加と削除
- webmo.initをするとすべてのイベントリスナーがクリアされます
- そのため、イベントリスナーの追加はwebmo.init後にする必要があります

イベントのタイプ
- open
- close
- error

```
webmo.init()

// イベントリスナーの追加はinit後にする

const onOpen = (e) => {
    console.log(e) // e: Event
}
const onClose = (e) => {
    console.log(e) // e: CloseEvent
}
const onError = (e) => {
    console.log(e) // e: Event
}

// イベントリスナーの追加
webmo.socketClient.events.on('open', onOpen)
webmo.socketClient.events.on('close', onClose)
webmo.socketClient.events.on('error', onError)

// イベントリスナーの削除
webmo.socketClient.events.off('open', onOpen)
webmo.socketClient.events.off('close', onClose)
webmo.socketClient.events.off('error', onError)
```

## Webmo.websocketClient.events once

一度イベントが発火したら、イベントリスナーは削除されます
```
// イベントリスナーの追加
webmo.socketClient.events.once('open', onOpen)
webmo.socketClient.events.once('close', onClose)
```