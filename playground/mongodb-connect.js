const MongoClient = require('mongodb').MongoClient

MongoClient.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todoApp-db', (error, db) => {
  if (error) {
    return console.log(`Unable to connect to mongodb server: ${error}`)
  }
  console.log('Connected to Mongodb server')

  // db.collection('todo').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (error, result) => {
  //   if(error){
  //     return console.log('Unable to insert todo')
  //   }
  //   console.log(`result-> ${JSON.stringify(result.ops, undefined, 2)}`)
  // })

  // db.collection('users').insertOne({
  //   name: 'Gabriel',
  //   age: 31,
  //   location: 'Bogotá'
  // }, (error, result) => {
  //   if(error){
  //     console.log(`Unable to insert user-> ${error}`)
  //   }
  //   console.log('User insert result->', JSON.stringify(result))
  // })

  db.collection('users').find({
    name: 'Gabriel'
  }).toArray().then(users => {
    console.log(`Users found -> ${JSON.stringify(users, undefined, 2)}`)
  }, error => {
    console.log(`Error searching users-> ${error}`)
  })
  db.close()
});
