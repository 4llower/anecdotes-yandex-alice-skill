import * as express from 'express'
import * as dotenv from 'dotenv'
dotenv.config()

import { TelegramParser } from './parser/telegram'

const app = express()
const port = 9000
const telegramParser = new TelegramParser('myfavoritejumoreski')

app.get('/', (_req, res) => {
  res.send('Hello World!')
})

app.get('/jokes', async (_req, res) => {
  const jokes = await telegramParser.loadJokes()
  res.send(jokes)
})

app.listen(port, async () => {
  console.log('listening on port')
  await telegramParser.authenticate()
})
