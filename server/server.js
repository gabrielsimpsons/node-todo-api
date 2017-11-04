require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

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

app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res.send({todos})
  }, error => {
    res.status(400).send(error)
  })
})

app.get('/todos/:id', (req, res) => {
  if(!ObjectID.isValid(req.params.id)){
    res.status(400).send({message: 'Is not an valid id'})
  }
  Todo.findById(req.params.id).then(todo => {
    if(!todo){
      res.status(404).send({message: 'Todo not found'})
    }
    res.send({todo})
  }).catch(e => res.status(400).send(e))
})

app.delete('/todos/:id', (req, res) => {
  if(!ObjectID.isValid(req.params.id)){
    res.status(400).send({message: 'Is not an valid id'})
  }
  Todo.findByIdAndRemove(req.params.id).then(todo => {
    if(!todo){
      res.status(404).send({message: 'Todo not found'})
    }
    res.send({todo})
  })
})

app.listen(APP_PORT, () => {
  console.log(`Started on: ${APP_PORT }`)
})

module.exports = {app}
