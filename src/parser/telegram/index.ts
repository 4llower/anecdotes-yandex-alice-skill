import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions'
import { Parser } from '../parser'

const CONNECTION_RETRIES = 5
const MESSAGES_LIMIT = 100

export class TelegramParser extends Parser {
  apiId = +(process.env.APP_ID || 0)
  apiHash = process.env.APP_API_HASH || ''
  sessionString = process.env.SESSION_STRING

  client: TelegramClient
  sourceChannel: string

  constructor(source: string) {
    super()
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

  async loadJokes() {
    const messages = await this.client.getMessages(this.sourceChannel, {
      limit: MESSAGES_LIMIT,
    })
    return messages
      .map((message) => message.message)
      .filter((message) => message?.length)
  }
}
