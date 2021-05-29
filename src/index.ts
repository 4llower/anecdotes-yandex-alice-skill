import * as express from 'express'
import { AnecdoteService } from './anecdote-service'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { createServer } from 'https'
import { includes, lowerCase, sample } from 'lodash'
import { json } from 'body-parser'

const jsonParser = json()
const app = express()
const anecdoteService = new AnecdoteService()

app.all('/', jsonParser, async (req, res) => {
  let statusCode = 200

  if (req.method !== 'POST') {
    statusCode = 400
    res.status(statusCode).send('Bad Request')
    return
  }

  const { meta, request, session, version } = req.body

  let isEndSession = false

  const userUtterance = lowerCase(request.original_utterance)

  let message = ' '

  if (userUtterance === 'ping') {
    message = 'ОК'
    isEndSession = true
    res.status(statusCode).send({
      version,
      session,
      response: {
        text: message,
        end_session: isEndSession,
      },
    })
    return
  }

  const hasScreen = typeof meta.interfaces.screen !== 'undefined'

  let userWords: any[] = []

  if (request.nlu.tokens.length > 0) {
    const tokensArr = request.nlu.tokens
    for (let i = 0; i < tokensArr.length; i++) {
      userWords.push(tokensArr[i])
    }
  }

  let buttonSlot: any[] = []

  const playButton = { title: 'Продолжай', hide: true }

  const helpButton = { title: 'Справка', hide: true }

  const wish = ['Хотите', 'Желаете', 'Не против'],
    know = ['узнать', 'оценить', 'услышать', 'послушать'],
    thought = [
      'ещё один анекдот',
      'следующий анекдот',
      'ещё один анекдот',
      'следующий анекдот',
      'ещё один постироничный анекдот',
      'анекдот от ещё одного умного человека',
    ]

  const prompt = `${sample(wish)} ${sample(know)} ${sample(thought)}?`

  const hello = 'Добро пожаловать в мир постиронии. Хотите анекдот?'
  const help =
    'Я умею рассказывать анекдоты. Чтобы слушать - отвечайте положительно на мои вопросы. Чтобы закрыть - скажите: "Нет", "Выйти" "Закрыть"'
  const bye = 'Захотите еще анекдоты, вы знаете где меня найти.'
  const unknown =
    'Вас не разберешь. Вы можете либо продолжить, получить справку, или завершить сессию.'

  let intent

  const playWords = [
    'продолжай',
    'продолжить',
    'продолжать',
    'хочу',
    'желаю',
    'не против',
    'да',
    'слушать',
    'слушаю',
    'говори',
    'скажи',
    'ещё',
    'некст',
    'next',
  ]

  for (let item of playWords) {
    if (includes(userUtterance, item)) {
      intent = 'play'
      break
    }
  }

  const helpWords = ['справка', 'помощь', 'что ты умеешь']

  for (let item of helpWords) {
    if (includes(userUtterance, item)) {
      intent = 'help'
      break
    }
  }

  const exitWords = [
    'нет',
    'выйти',
    'закрыть',
    'завершить',
    'хватит',
    'достаточно',
  ]

  for (let item of exitWords) {
    if (includes(userUtterance, item)) {
      intent = 'exit'
      break
    }
  }

  if (!userUtterance) {
    message = hello
    if (hasScreen) {
      buttonSlot.push(helpButton)
      buttonSlot.push(playButton)
    }
  } else {
    switch (intent) {
      case 'play': {
        message = await anecdoteService.getRandomAnecdote()
        break
      }
      case 'help': {
        message = `${help} ${prompt}`
        break
      }
      case 'exit': {
        message = bye
        buttonSlot = []
        isEndSession = true
        break
      }
      default: {
        message = unknown
        if (hasScreen) {
          buttonSlot.push(helpButton)
          buttonSlot.push(playButton)
        }
      }
    }
  }

  res.status(statusCode).send({
    version,
    session,
    response: {
      text: message,
      buttons: buttonSlot,
      end_session: isEndSession,
    },
  })
})

const port = 9000

const options = {
  key: readFileSync(resolve(__dirname, '..', './ssl/privatekey.pem')),
  cert: readFileSync(resolve(__dirname, '..', './ssl/certificate.pem')),
  requestCert: true,
  rejectUnauthorized: false,
}

const server = createServer(options, app)

server.listen(port, () => {
  console.log('Listening on port', port)
})
