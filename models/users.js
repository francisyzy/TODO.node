const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
})

var Users = mongoose.model('User', userSchema)

module.exports = Users
