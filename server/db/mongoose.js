var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:28011/todos')

module.exports = {mongoose}
