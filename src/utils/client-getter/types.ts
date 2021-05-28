export interface IGetter {
  read: (prompt: string) => Promise<unknown>
}
