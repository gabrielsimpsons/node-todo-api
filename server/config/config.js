var env  = process.env.NODE_ENV || 'development'
console.log(`Starging with environtment -> ${env}`)
if(env === 'development'){
  process.env.PORT = 3000
  process.env.MONGODB_URI = 'mongodb://localhost:28011/todos'
} else if(env == 'test') {
  process.env.PORT= 3001
  process.env.MONGODB_URI = 'mongodb://localhost:28011/todos-test'
}
