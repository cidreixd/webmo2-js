import { WebSocketClient } from '../client/types'
import { uuid } from '../utils'
import mitt, { Emitter } from 'mitt'
import { NOT_INITIALIZED, NOT_OPEN_WEBSOCKET } from '../const/error'

export interface WebmoEvent extends Emitter {
  once: any
}

const emitter: WebmoEvent = {
  ...mitt(),
  once: () => {},
}

emitter.once = (key: string, callback: (data: any) => void) => {
  const func = (data: any) => {
    emitter.off(key, func)
    callback(data)
  }
  emitter.on(key, func)
}

const joinUrl = (url: string) => `ws://${url}:1337`

export const socket = () => {
  let socket: WebSocket | null = null
  let isOpen = false

  const onOpen = (e: Event) => {
    isOpen = true
    emitter.emit('open', e)
  }
  const onMessage = (e: MessageEvent<any>) => {
    const webSocketData = JSON.parse(e.data)
    if (webSocketData.type === 'UDP') {
      delete webSocketData.type
      emitter.emit('UDP', webSocketData)
    } else if (webSocketData.receiveKey) {
      emitter.emit(webSocketData.receiveKey, webSocketData.data)
      emitter.emit('message', webSocketData.data)
    }
  }

  const onClose = (e: CloseEvent) => {
    emitter.emit('close', e)
  }

  const onError = (e: Event) => {
    emitter.emit('error', e)
  }

  const init = ({ host, url }: { host?: string; url?: string }) => {
    emitter.all.clear()

    if (socket) {
      socket.removeEventListener('open', onOpen)
      socket.removeEventListener('message', onMessage)
      socket.removeEventListener('close', onClose)
      socket.removeEventListener('error', onError)
      socket.close()
    }
    socket = new WebSocket(url ? url : joinUrl(host || 'webmo.local'))
    if (!socket) return

    socket.addEventListener('open', onOpen)
    socket.addEventListener('message', onMessage)
    socket.addEventListener('close', onClose)
    socket.addEventListener('error', onError)
  }

  const send = async (uri: string, method: string, data: any) => {
    if (!socket) {
      throw new Error(NOT_INITIALIZED)
    }
    const key = uuid()
    const webSocketData = {
      uri,
      method,
      key,
      data,
    }

    if (socket.readyState != 1) {
      throw new Error(NOT_OPEN_WEBSOCKET)
    }
    socket.send(JSON.stringify(webSocketData))
    return new Promise((resolve) => {
      emitter.once(key, (response: any) => {
        resolve(response)
      })
    })
  }

  const client: WebSocketClient = {
    init,
    send,
    events: emitter,
    isOpen,
  }

  return client
}
