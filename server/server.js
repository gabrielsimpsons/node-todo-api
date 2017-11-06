require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
const _ = require('lodash')

var {mongoose} = require('./db/mongoose.js')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')
var {authenticate} = require('./middleware/authenticate')

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
  }).catch(error => {
    res.status(400).send({message: 'Impossible to delete', error: error})
  })
})

app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password'])
  let user = new User(body)
  user.save().then(() => {
    return user.generateAuthToken()
    //res.send(user)
  }).then(token => {
    res.header('x-auth', token).send(user)
  }).catch(error => {
    res.status(400).send({message: `Error guardando usuario`, error})
  })
})



app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user)

})

app.listen(APP_PORT, () => {
  console.log(`Started on: ${APP_PORT }`)
})

module.exports = {app}
