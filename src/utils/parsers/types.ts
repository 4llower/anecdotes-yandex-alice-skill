import { IAnecdote } from '../../types'

export interface IParser {
  authenticate: () => void
  getAnecdotes: () => Promise<IAnecdote[]>
  close: () => void
}
