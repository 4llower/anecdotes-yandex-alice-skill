import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

export class UserInput {
  async readLine(prompt: string) {
    return await new Promise((resolve) => {
      rl.question(prompt, function (userInput) {
        rl.close()
        resolve(userInput)
      })
    })
  }
}
