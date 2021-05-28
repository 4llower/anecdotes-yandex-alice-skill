import admin from 'firebase-admin'
import { IFirebaseService } from './types'
import { IAnecdoteDto } from '~/types'

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
    return await this.firestore.collection('anecdotes').listDocuments()
  }
}
