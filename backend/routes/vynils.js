const express = require('express')
const router = express.Router()
const Vynil = require('../models/vynil')

router.get('/', async (req, res) => {
  try {
    const vynils = await Vynil.find()
    res.json(vynils)
  } catch (error) {
    res.send({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  const vynil = new Vynil({
    name: req.body.name,
    artist: req.body.artist,
    year: req.body.year
  })
  try {
    const newVynil = await vynil.save()
    res.status(201).json(newVynil)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
