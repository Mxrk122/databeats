const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  information: {
    firstName: String,
    lastName: String,
    origin: String
  },
  password: String,
  favorites: [{
    type: String
  }],
  admin: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('User', userSchema)
