const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Vynil = require('../models/vynil')
const Rate = require('../models/rate')

router.get('/:vynil_id', async (req, res) => {
  try {
    Rate.find({
      vynil: req.params.vynil_id
    }, function (err, docs) {
      if (err) {
        // handle the error here
      } else {
        // "docs" is an array of documents that match the given criteria
        const myDocuments = docs
        res.send(myDocuments)
      }
    })
  } catch (error) {
    res.send({ message: error.message })
  } 
})

router.post('/', async (req, res) => {
  // si es un comentario que ya realizo a un disco, actualizarlo
  const user_id = req.body.actualUser
  const vynil_id = req.body.vynil

  Rate.findOne({
    user: user_id,
    vynil: vynil_id
  }, function (err, doc) {
    if (err) {
      // handle the error here
      console.log(err)
    } else if(!doc){
      // no document was found, so create a new one
      const newRate = new Rate({
        user: req.body.actualUser,
        username: req.body.username,
        vynil: req.body.vynil,
        score: req.body.score,
        comment: req.body.comment
      })
      try {
        newRate.save()
        res.status(201).json({ message: "guardada nueva rate!" })
      } catch (error) {
        res.status(400).json({ message: error.message })
      }
    } else{
      // document was found, so update it
      doc.score = req.body.score
      doc.comment = req.body.comment
      try {
        doc.save()
        res.status(201).json({ message: "rate aactualizada!" })
      } catch (error) {
        res.status(400).json({ message: error.message })
      }
    }

  })
})

module.exports = router
