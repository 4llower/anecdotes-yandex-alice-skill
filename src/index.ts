const express = require('express')
const app = express()
const port = 9000

app.get('/', (req, res) => {
    res.send('Alice skill')
})

app.listen(port, () => {
    console.log(`Alice Skill handler listening at http://localhost:${port}`)
})
