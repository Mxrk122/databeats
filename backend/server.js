const mongoose = require('mongoose')

const uri = 'mongodb+srv://dummy:protestthehero@cluster0.jft1kx5.mongodb.net/databeats?retryWrites=true&w=majority'
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Databeats!!'
  })
})

app.use(express.json())

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)

const vynilsRouter = require('./routes/vynils')
app.use('/vynils', vynilsRouter)

const songsRouter = require('./routes/rates')
app.use('/rates', songsRouter)

app.listen(4000, () => console.log('servidor corriendo en el puerto 4000'))
