var mongoose = require('mongoose')

var Todo = mongoose.model('todos', {
  text: {
    type: String,
    required: true,
    minlenght: 5,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

module.exports= {Todo}
