const mongoose = require('mongoose')

const vynilSchema = new mongoose.Schema({
  name: String,
  artist: String,
  year: Number,
  img: String,
  information: {
    genre: String,
    scale: {
      type: String,
      default: null
    },
    origin: String,
    language: String
  }
})

module.exports = mongoose.model('Vynil', vynilSchema)
