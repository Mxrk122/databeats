const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Vynil = require('../models/vynil')
const Rate = require('../models/rate')

router.get('/', async (req, res) => {
  try {
    const rates = await Rate.find()
    res.json(rates)
  } catch (error) {
    res.send({ message: error.message })
  } 
})

router.post('/', async (req, res) => {
  const rate = new Rate({
    user: req.body.user,
    album: req.body.album,
    score: req.body.score,
    comment: req.body.comment
  })

  console.log(rate)
  try {
    const newRate = await rate.save()
    res.status(201).json(newRate)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router
