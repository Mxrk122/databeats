const express = require('express')
const router = express.Router()
const Vynil = require('../models/vynil')
const User = require('../models/user')
const oI = require('mongoose').Types.ObjectId;

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
    img: req.body.img,
    information: {
      genre: req.body.information.genre,
      scale: req.body.information.scale,
      origin: req.body.information.origin,
      language: req.body.information.language
    },

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

// agregacion para devolver favoritos
router.put('/favorites/:id_user', async (req, res) => {
  try {
    const user = await User.findById(req.params.id_user)
    console.log("user", user);
    // realizar la busqueda de los favoritos a aprtir del array
    const favorites = user.favorites.map(id => oI(id))
    console.log("favoritos", favorites);

    Vynil.find({ _id: { "$in": favorites } }, function(err, documents) {
      if (err) {
        res.send({ message: err.message })
      }
      console.log("hola", documents);
      res.json(documents)
    })
  } catch (error) {
    res.send({ message: error.message })
  }
})

module.exports = router
