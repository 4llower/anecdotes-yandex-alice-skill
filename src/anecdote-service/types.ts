import { IFirebaseService } from '../utils/firebase/types'

export interface IAnecdoteService {
  firebaseService: IFirebaseService
  getRandomAnecdote: () => Promise<string>
}
