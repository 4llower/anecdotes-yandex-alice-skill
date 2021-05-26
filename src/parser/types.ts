export interface Parser {
  authenticate: () => void
  loadJokes: () => void
  close: () => void
}
