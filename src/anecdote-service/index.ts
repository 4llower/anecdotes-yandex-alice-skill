import { IAnecdoteService } from './types'
import { FirebaseService } from '../utils'

export class AnecdoteService implements IAnecdoteService {
  firebaseService
  anecdotes
  constructor() {
    this.firebaseService = new FirebaseService()
  }
  async getRandomAnecdote() {
    if (!this.anecdotes) {
      this.anecdotes = await this.firebaseService.getAll()
    }
    return (
      await this.anecdotes[
        Math.floor(Math.random() * (this.anecdotes.length - 1))
      ].get()
    ).data().message
  }
}
