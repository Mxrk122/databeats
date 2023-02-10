const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Vynil = require('../models/vynil')
const Song = require('../models/song')

router.get('/', async (req, res) => {
  try {
    const songs = await Song.find()
    res.json(songs)
  } catch (error) {
    res.send({ message: error.message })
  } 
})

router.post('/', async (req, res) => {
  const song = new Song({
    name: req.body.name,
    artist: req.body.artist,
    album: req.body.album
  })

  console.log(song)
  try {
    const newSong = await song.save()
    res.status(201).json(newSong)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.patch('/favorite/:id_user/:id_vynil', async (req, res) => {
  try {
    const user = await User.findById(req.params.id_user)
    const vynil = await Vynil.findById(req.params.id_vynil)

    // diferenciar entre el like y el no like
    // like
    if (!user.favorites.includes(vynil.id)) {
      user.favorites.push(vynil.id);
      const newUser = await user.save();
      const favorites = newUser.favorites
      res.json(favorites)

      //dislike
    } else{
      user.favorites.pull(vynil.id)
      const newUser = await user.save();
      const favorites = newUser.favorites
      res.json(favorites)
    }

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
