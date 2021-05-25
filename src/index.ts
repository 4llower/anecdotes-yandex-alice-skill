import express from 'express'

const app = express()
const port = 9000

app.get('/', (_req, res) => {
  res.send('Hello World! !!  ! !')
})

app.listen(port, async () => {
  console.log('listening on port')
})
