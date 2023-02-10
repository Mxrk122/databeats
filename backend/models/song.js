const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
  name: String,
  artist: String,
  album: String
})

module.exports = mongoose.model('Song', songSchema)
