const express = require('express')
const router = express.Router()
const Vynil = require('../models/vynil')
const User = require('../models/user')
const oI = require('mongoose').Types.ObjectId;

router.get('/:filter', async (req, res) => {
  try {
    if (req.params.filter === "nothing"){
      const vynils = await Vynil.find()
      res.json(vynils)

    } else if (req.params.filter === "name"){
      Vynil.aggregate([
        { $sort: { name: 1 } }
      ])
      .exec(function (err, vynils) {
        const sortedVynils = vynils
        res.json(sortedVynils)
      })

    } else if (req.params.filter === "artist"){
      Vynil.aggregate([
        { $sort: { artist: 1 } }
      ])
      .exec(function (err, vynils) {
        const sortedVynils = vynils
        res.json(sortedVynils)
      })
    } else if (req.params.filter === "year"){
      Vynil.aggregate([
        { $sort: { year: 1 } }
      ])
      .exec(function (err, vynils) {
        const sortedVynils = vynils
        res.json(sortedVynils)
      })
    }

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

    console.log(req.body)
    
    if(req.body.name !== null && req.body.name !== ''){
      console.log("name:", req.body.name)
      updatedVynil.name = req.body.name

    } if(req.body.artist !== null && req.body.artist !== ''){
      updatedVynil.artist = req.body.artist

    } if(req.body.year !== null && req.body.year !== ''){
      updatedVynil.year = req.body.year

    } if(req.body.img !== null && req.body.img !== ''){
      updatedVynil.img = req.body.img

    } if(req.body.information.genre !== null && req.body.information.genre !== ''){
      updatedVynil.information.genre = req.body.information.genre

    } if(req.body.information.scale !== null && req.body.information.scale !== ''){
      updatedVynil.information.scale = req.body.information.scale

    } if(req.body.information.origin !== null && req.body.information.origin !== ''){
      updatedVynil.information.origin = req.body.information.origin

    } if(req.body.information.language !== null && req.body.information.language !== ''){
      updatedVynil.information.language = req.body.information.language
    }
     
    const newInfo = await updatedVynil.save()
    console.log(newInfo)
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

router.delete('/:id', async (req, res) => {
  try {
    const vynil = await Vynil.findById(req.params.id)
    console.log("vinlo a aborrar: ", vynil.name)

    Vynil.findOneAndRemove({_id: vynil._id}, function(err) {
      if (err) return handleError(err);
      console.log('El vinilo ha sido eliminado con éxito.')
      res.send({ message: "borrado" })
    })

  } catch (error) {
    res.send({ message: error.message })
  }
})

module.exports = router
