var mongoose = require('mongoose')

var User = mongoose.model('users', {
  email: {
    required: true,
    type: String,
    minlenght: 4,
    trim: true
  }
})

module.exports = {User}
