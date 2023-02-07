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
    year: req.body.year,
    img: req.body.img
  })
  try {
    const newVynil = await vynil.save()
    res.status(201).json(newVynil)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const updatedVynil = await Vynil.findById(req.params.id)
    
    if(req.body.name !== null){
      updatedVynil.name = req.body.name

    } if(req.body.artist !== null){
      updatedVynil.artist = req.body.artist

    } if(req.body.year !== null){
      updatedVynil.year = req.body.year

    } if(req.body.img !== null){
      updatedVynil.img = req.body.img
    }
    
    const newInfo = await updatedVynil.save()
    res.json(newInfo) 
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
