import admin from 'firebase-admin'
import { IFirebaseService } from './types'
import { IAnecdote, IAnecdoteDto } from '~/types'

export class FirebaseService implements IFirebaseService {
  firestore
  admin
  constructor() {
    this.admin = admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    })
    this.firestore = admin.firestore()
  }

  async add(anecdote) {
    return this.firestore
      .collection('anecdotes')
      .add({ ...anecdote, date: anecdote.date.toDateString() } as IAnecdoteDto)
  }

  async getAll() {
    const documents = await this.firestore
      .collection('anecdotes')
      .listDocuments()

    const result: IAnecdote[] = []

    for (const document of documents) {
      const snapshot = await document.get()
      const data = snapshot.data()
      result.push({ message: data.message, date: new Date(data.date) })
    }

    return result
  }
}
