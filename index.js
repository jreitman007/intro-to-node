var express = require('express')
const app = express()
const PORT = 3000

app.get('/:name', (req, res) => {
    const name = req.param('name')
    res.send(`You are very cool ${name}!`)
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
