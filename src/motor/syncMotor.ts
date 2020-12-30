import { HttpClient, WebSocketClient } from '../client/types'
import { SyncMotor } from './types'
import { API } from '../const/api'
import { NOT_INITIALIZED } from '../const/error'

export const createSyncMotor = () => {
  let http: HttpClient | undefined
  let socket: WebSocketClient | undefined
  let isInitialized = false
  const send = async (api: { uri: string; method: string }, data: any) => {
    if(!isInitialized) throw Error(NOT_INITIALIZED)
    const uri = api.uri
    if (socket) {
      return socket.send(uri, api.method, data).catch(async (error) => {
        if (http) return http.send(uri, api.method, data)
        return error
      })
    }
    if (http) return http.send(uri, api.method, data)
  }

  const syncMotor: SyncMotor = {
    setClient: ({ httpClient, socketClient }) => {
      http = httpClient
      socket = socketClient
      isInitialized = true
    },

    stop: async (prop?) => {
      return send(API.stop, prop)
    },

    lock: async (prop?) => {
      return send(API.lock, prop)
    },

    rotate: async (prop) => {
      return send(API.rotate, prop)
    },

    rotateBy: async (prop) => {
      return send(API.rotateBy, prop)
    },

    rotateTo: async (prop) => {
      return send(API.rotateTo, prop)
    },

    getRotation: async () => {
      return send(API.getRotation, null)
    },

    resetRotation: async (prop) => {
      return send(API.resetRotation, prop)
    },
  }

  return syncMotor
}
