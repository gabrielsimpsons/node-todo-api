let express = require('express')
let bodyParser = require('body-parser')

var {mongoose} = require('./db/mongoose.js')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')

const APP_PORT = process.env.PORT || 3000

let app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  })
  todo.save().then(doc => {
    res.send(doc)
  }, error => {
    res.status(400).send(error)
  })
})

app.listen(APP_PORT, () => {
  console.log(`Started on: ${APP_PORT }`)
})

module.exports = {app}
