interface IConfig {
  appId: number
  appApiHash: string
  botAuthToken: string
  firebase: {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementId: string
  }
}

const { parsed: env } = require('dotenv').config()

export const config: IConfig = {
  appId: +env.APP_ID,
  appApiHash: env.APP_API_HASH,
  botAuthToken: env.BOT_AUTH_TOKEN,
  firebase: {
    apiKey: env.FIREBASE_API_KEY ?? '',
    authDomain: env.FIREBASE_AUTH_DOMAIN ?? '',
    projectId: env.FIREBASE_PROJECT_ID ?? '',
    storageBucket: env.FIREBASE_STORAGE_BUCKET ?? '',
    appId: env.FIREBASE_APP_ID ?? '',
    measurementId: env.FIREBASE_MEASUREMENT_ID ?? '',
    messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID ?? '',
  },
}
