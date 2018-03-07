const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
  taskName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: false
  },
  category: {
    type: String,
    required: true
  }
})

const listSchema = new Schema({
  listName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tasks: [taskSchema]
}, {
  timestamps: true
})

var Lists = mongoose.model('List', listSchema)

module.exports = Lists
