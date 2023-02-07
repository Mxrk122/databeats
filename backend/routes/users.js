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

router.post('/', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    favorites: [1]
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
    
    const newUser = await user.updateOne({ _id: user.id }, { $addToSet: { favorites: vynil.id} })
    console.log(newUser)
    res.json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
