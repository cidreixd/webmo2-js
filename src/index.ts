import { createMotor, createSyncMotor, Motor, SyncMotor } from './motor'
import { http, socket } from './client'
import { HttpClient, WebSocketClient } from './client/types'

export const motor1 = createMotor(1)
export const motor2 = createMotor(2)
export const motor = createSyncMotor()
export const httpClient = http()
export const socketClient = socket()

interface InitOptions {
  host?: string
  isHttp?: boolean
  isWebSocket?: boolean
  http?: string
  websocket?: string
}

export const init = (options?: InitOptions) => {
  const isHttp = typeof options?.isHttp !== 'boolean' ? true : options.isHttp
  const isWebSocket =
    typeof options?.isWebSocket !== 'boolean' ? true : options?.isWebSocket

  httpClient.init({ host: options?.host, url: options?.http })
  socketClient.init({ host: options?.host, url: options?.websocket })

  const _httpClient = isHttp ? httpClient : undefined
  const _socketClient = isWebSocket ? socketClient : undefined
  motor1.setClient({ httpClient: _httpClient, socketClient: _socketClient })
  motor2.setClient({ httpClient: _httpClient, socketClient: _socketClient })
  motor.setClient({ httpClient: _httpClient, socketClient: _socketClient })
}

export const create = (options?: InitOptions) => {
  const motor1 = createMotor(1)
  const motor2 = createMotor(2)
  const motor = createSyncMotor()
  const httpClient = http()
  const socketClient = socket()

  const isHttp = typeof options?.isHttp !== 'boolean' ? true : options.isHttp
  const isWebSocket =
    typeof options?.isWebSocket !== 'boolean' ? true : options?.isWebSocket

  httpClient.init({ host: options?.host, url: options?.http })
  socketClient.init({ host: options?.host, url: options?.websocket })

  const _httpClient = isHttp ? httpClient : undefined
  const _socketClient = isWebSocket ? socketClient : undefined
  motor1.setClient({ httpClient: _httpClient, socketClient: _socketClient })
  motor2.setClient({ httpClient: _httpClient, socketClient: _socketClient })
  motor.setClient({ httpClient: _httpClient, socketClient: _socketClient })

  return {
    motor,
    motor1,
    motor2,
    httpClient,
    socketClient,
    wait,
  }
}

export const wait = async (millis: number) => {
  await new Promise((resolve) => setTimeout(resolve, millis))
}

export default {
  init,
  create,
  motor,
  motor1,
  motor2,
  httpClient,
  socketClient,
  wait,
}
