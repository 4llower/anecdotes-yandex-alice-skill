import * as dotenv from 'dotenv'
dotenv.config()

interface IConfig {
  appId: number
  appApiHash: string
  stringSession: string
}

export const config: IConfig = {
  appId: +(process.env.APP_ID || 0),
  appApiHash: process.env.APP_API_HASH || '',
  stringSession: process.env.SESSION_STRING || '',
}
