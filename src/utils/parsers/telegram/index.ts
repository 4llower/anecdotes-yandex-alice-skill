import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions'
import { IParser } from '../types'
import { config } from '../../../config'
import { isAdvertisement, serializeAnecdoteMessage } from './helpers'

const CONNECTION_RETRIES = 5
const MESSAGES_LIMIT = 20

export class TelegramParser implements IParser {
  apiId = config.appId
  apiHash = config.appApiHash
  sessionString = config.stringSession

  client: TelegramClient
  sourceChannel: string

  constructor(source: string) {
    const stringSession = new StringSession(this.sessionString)
    this.client = new TelegramClient(stringSession, this.apiId, this.apiHash, {
      connectionRetries: CONNECTION_RETRIES,
    })
    this.sourceChannel = source
  }

  async authenticate() {
    await this.client.connect()
  }

  async close() {
    await this.client.disconnect()
  }

  async getAnecdotes() {
    const messages = await this.client.getMessages(this.sourceChannel, {
      limit: MESSAGES_LIMIT,
    })
    return messages
      .filter((response) => response?.message?.length)
      .filter((response) => !isAdvertisement(response.message))
      .map(({ message, date }) => ({
        message: serializeAnecdoteMessage(message),
        date: new Date(date * 1000),
      }))
  }
}
