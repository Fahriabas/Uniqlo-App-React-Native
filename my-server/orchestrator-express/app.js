const express = require('express')
const cors = require("cors")
const Router = require('./routes')
const app = express()
const port = 4000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(express.json())

app.use(Router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})