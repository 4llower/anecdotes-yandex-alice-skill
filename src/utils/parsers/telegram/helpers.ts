export const serializeAnecdoteMessage = (message: string) => {
  return message.replace(/[\n-]/g, '')
}
