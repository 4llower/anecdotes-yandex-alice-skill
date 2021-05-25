import * as dotenv from 'dotenv'
dotenv.config()

import { TelegramParser } from './parser/telegram'
;(async () => {
  const telegramParser = new TelegramParser('myfavoritejumoreski')
  await telegramParser.authenticate()
  const jokes = await telegramParser.loadJokes()
  console.log(jokes)
  await telegramParser.close()
})()
