import join from 'url-join'
import { HttpClient } from '../client/types'

const joinUrl = (url: string) => `http://${url}/api`

const post = async (url: string, data: any) => {
  return await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error
    })
}

const get = async (url: string) => {
  return await fetch(url, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error
    })
}

export const http = () => {
  let baseUrl = joinUrl('webmo.local')

  const init = ({ host, url }: { host?: string; url?: string }) => {
    baseUrl = url ? url : joinUrl(host || 'webmo.local')
  }

  const send = async (uri: string, method: string, data: any) => {
    if (method === 'POST') {
      return post(join(baseUrl, uri), data)
    } else if (method === 'GET') {
      return get(join(baseUrl, uri))
    }
  }

  const client: HttpClient = {
    init,
    send,
    ping: () => send('ping', 'GET', null),
  }

  return client
}
