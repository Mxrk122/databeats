const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  firstname: String,
  lastname: String,
  password: String
})

module.exports = mongoose.model('User', userSchema)
