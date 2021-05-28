interface IConfig {
  appId: number
  appApiHash: string
  botAuthToken: string
  stringSession: string
}

const { parsed: env } = require('dotenv').config()

export const config: IConfig = {
  appId: +env.APP_ID,
  appApiHash: env.APP_API_HASH,
  botAuthToken: env.BOT_AUTH_TOKEN,
  stringSession: env.SESSION_STRING,
}
