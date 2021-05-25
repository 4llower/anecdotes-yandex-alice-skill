import input from 'input'
import { TelegramClient } from 'telegram'
import { StringSession } from 'telegram/sessions'
import { config } from './config'

const express = require('express')
const app = express()
const port = 9000

app.listen(port, async () => {
  const client = new TelegramClient(
    new StringSession(''),
    config.appId,
    config.appApiHash,
    {
      connectionRetries: 3,
    }
  )

  await client.start({
    phoneNumber: async () => await input.text('number ?'),
    password: async () => await input.text('password?'),
    phoneCode: async () => await input.text('Code ?'),
    onError: (err) => console.log(err),
  })

  console.log('You should now be connected.')
  console.log(client.session.save())
  await client.sendMessage('me', { message: 'Hello!' })
})
