const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Vynil = require('../models/vynil')

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.send({ message: error.message })
  }
})

router.get('/liked', async (req, res) => {
  try {
    const users = await User.find()

    const userFavorites = users.favorites

    res.json(userFavorites)


  } catch (error) {
    res.send({ message: error.message })
  }
})

router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    favorites: []
  })

  console.log(user)
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
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
    if (!user.favorites.includes(vynil._id)) {
      user.favorites.push(vynil._id);
      console.log("hola")
      const newUser = await user.save();
      console.log(newUser)
      const favorites = newUser.favorites
      res.json(favorites)

      //dislike
    } else{
      console.log("adios")
      user.favorites.pull(vynil.id)
      const newUser = await user.save();
      console.log(newUser)
      const favorites = newUser.favorites
      res.json(favorites)
    }

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
