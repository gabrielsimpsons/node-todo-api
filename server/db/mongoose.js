var mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:28011/todos')

module.exports = {mongoose}
