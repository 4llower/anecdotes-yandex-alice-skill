import admin from 'firebase-admin'
import { IAnecdote } from '../../types'

import Firestore = admin.firestore.Firestore
import App = admin.app.App
import DocumentReference = admin.firestore.DocumentReference

export interface IFirebaseService {
  admin: App
  firestore: Firestore
  add: (anecdote: IAnecdote) => Promise<any>
  getAll: () => Promise<DocumentReference[]>
}
