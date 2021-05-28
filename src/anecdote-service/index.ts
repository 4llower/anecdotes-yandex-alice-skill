import { IAnecdoteService } from './types'
import { FirebaseService } from '../utils'

export class AnecdoteService implements IAnecdoteService {
  firebaseService
  constructor() {
    this.firebaseService = new FirebaseService()
  }
  async getRandomAnecdote() {
    const anecdotes = await this.firebaseService.getAll()

    return (
      await anecdotes[Math.floor(Math.random() * (anecdotes.length - 1))].get()
    ).data().message
  }
}
