const express = require('express')
const router = express.Router()
const User = require('../models/user')

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
    favourites: [],
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
