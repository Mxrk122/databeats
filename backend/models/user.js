const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String,
  admin: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('User', userSchema)
