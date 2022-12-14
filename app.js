const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const notesRouter = require('./controllers/note')
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require('./utils/middleware')
const { info, error } = require('./utils/logger')
const mongoose = require('mongoose')

info('connecting to MongoDB')

mongoose
  .connect(config.URI)
  .then(() => info('connected to MongoDB'))
  .catch((err) => error('error connecting to MongoDB', err))

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)

app.use('/api/notes', notesRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = app
