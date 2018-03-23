const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
  firstname: {
    type: String,
    default: '',
    required: true
  },
  lastname: {
    type: String,
    default: '',
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
})

userSchema.plugin(passportLocalMongoose)

var Users = mongoose.model('User', userSchema)

module.exports = Users
