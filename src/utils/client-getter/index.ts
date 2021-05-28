import { createInterface } from 'readline'
import { IGetter } from './types'

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
})

export class ClientGetter implements IGetter {
  async read(prompt: string) {
    return await new Promise((resolve) => {
      rl.question(prompt, function (userInput) {
        rl.close()
        resolve(userInput)
      })
    })
  }
}
