const mongoose = require('mongoose')

const rateSchema = new mongoose.Schema({
  user: String,
  username: String,
  vynil: String,
  score: Number,
  comment: String
})

module.exports = mongoose.model('Rate', rateSchema)
