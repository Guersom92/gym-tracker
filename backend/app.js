require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const exerciseRouter = require('./controllers/exercise')
const mongoose = require('mongoose')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

mongoose.set('strictQuery', false)

mongoose.connect(process.env.MONGODB_URI)

// Middlewares
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// Routes
app.use(express.static('dist'))
app.use('/api/login', loginRouter)
app.use('/api/exercise', exerciseRouter)
app.use('/api/users', usersRouter)

// Error handling
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
