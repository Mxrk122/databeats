const mongoose = require('mongoose')

const vynilSchema = new mongoose.Schema({
  name: String,
  artist: String,
  year: Number,
  img: String
})

module.exports = mongoose.model('Vynil', vynilSchema)
