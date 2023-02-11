const mongoose = require('mongoose')

const rateSchema = new mongoose.Schema({
  user: String,
  album: String,
  score: Number,
  comment: String
})

module.exports = mongoose.model('Rate', rateSchema)
