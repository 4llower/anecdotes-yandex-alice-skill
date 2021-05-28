import { FirebaseService, TelegramParser } from '../utils'
import { IAnecdote } from '../types'

const telegramParser = new TelegramParser('myfavoritejumoreski')
const firebase = new FirebaseService()

telegramParser
  .authenticate()
  .then(async () => {
    try {
      const currentAnecdotes = await firebase.getAll()
      const anecdotesFromSource = await telegramParser.getAnecdotes()

      const newAnecdotes: IAnecdote[] = []

      for (const newAnecdote of anecdotesFromSource) {
        let needToAdd = true
        for (const currentAnecdote of currentAnecdotes) {
          if (currentAnecdote.message === newAnecdote.message) {
            needToAdd = false
            break
          }
        }
        if (needToAdd) {
          newAnecdotes.push(newAnecdote)
        }
      }

      for (const anecdote of newAnecdotes) {
        try {
          await firebase.add(anecdote)
        } catch (e) {
          console.error(
            `[Anecdote] Anecdote ${anecdote.message} doesn't uploaded:(`
          )
        }
      }

      await telegramParser.close()
    } catch (e) {
      console.error('[Request]', e)
    }
  })
  .catch(() => console.log('[Auth] Invalid credentials'))
