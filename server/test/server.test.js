const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')

const{app} = require('./../server')
const{Todo} = require('./../models/todo')

const todos = [
  {
    _id: new ObjectID(),
    text: 'todo1'
  },
  {
    _id: new ObjectID(),
    text: 'todo2'
  },
  {
    _id: new ObjectID(),
    text: 'todo3'
  },
  {
    _id: new ObjectID(),
    text: 'todo4'
  }]
beforeEach(done => {
  Todo.remove({}).then(() => {Todo.insertMany(todos)}).then( () => done())
})

describe('POST /todos', () => {
  it('Should create a new todo', done => {
    let text = 'Test todo text'
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect(res => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if(err) {
          return done(err)
        }

        Todo.find({}).then(todos => {
          expect(todos.length).toBe(5)
          expect(todos[4].text).toBe(text)
          done()
        }).catch(e => done(e))
      })
  })

  it('Should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err){
          return done(err)
        }
        Todo.find({}).then(todos => {
          expect(todos.length).toBe(4)
          done()
        }).catch(e => done(e))
      })
  })
})

describe('GET /todos', () => {
  it('Should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(4)
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {

  it('Should get a todo', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect( res => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })

  it('Should return 404 when todo not faund', done => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .expect(res => {
        expect(res.body.message).toBe('Todo not found')
      })
      .end(done)
  })

  it('Should return 400 when todo not faund', done => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}111`)
      .expect(400)
      .expect(res => {
        expect(res.body.message).toBe("Is not an valid id")
      })
      .end(done)
  })
})
