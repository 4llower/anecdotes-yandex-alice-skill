import * as express from 'express'
import { AnecdoteService } from './anecdote-service'

const app = express()
const port = 9000

const anecdoteService = new AnecdoteService()

app.get('/', async (_req, res) => {
  res.send(await anecdoteService.getRandomAnecdote())
})

app.listen(port, async () => {
  console.log('Listening on port', port)
})
