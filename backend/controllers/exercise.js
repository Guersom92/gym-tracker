const exerciseRouter = require('express').Router()
require('dotenv').config()
const Exercise = require('../models/Exercise')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


exerciseRouter.get('/', async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }

        const exercises = await Exercise.find({ user: decodedToken.id })
            .populate('user', { username: 1, name: 1 })

        response.json(exercises)
    } catch (error) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
})



exerciseRouter.post('/', async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }

        const user = await User.findById(decodedToken.id)
        if (!user) {
            return response.status(404).json({ error: 'user not found' })
        }

        const exercise = new Exercise({
            ...request.body,
            user: user._id
        })

        const savedExercise = await exercise.save()
        response.status(201).json(savedExercise)
    } catch (error) {
        console.error('Error creating exercise:', error)
        if (error.name === 'ValidationError') {
            return response.status(400).json({ error: error.message })
        }
        return response.status(500).json({ error: 'internal server error' })
    }
})

exerciseRouter.delete('/:id', async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }

        const exercise = await Exercise.findById(request.params.id)
        if (!exercise) {
            return response.status(404).json({ error: 'exercise not found' })
        }

        if (exercise.user.toString() !== decodedToken.id.toString()) {
            return response.status(403).json({ error: 'not authorized' })
        }

        await exercise.deleteOne()
        response.status(204).end()
    } catch (error) {
        console.error('Error deleting exercise:', error)
        response.status(500).json({ error: 'internal server error' })
    }
})

exerciseRouter.put('/:id', async (request, response) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }

        const exercise = await Exercise.findById(request.params.id)
        if (!exercise) {
            return response.status(404).json({ error: 'exercise not found' })
        }

        if (exercise.user.toString() !== decodedToken.id.toString()) {
            return response.status(403).json({ error: 'not authorized' })
        }

        const { sets, repetitions, day } = request.body
        exercise.sets = sets
        exercise.repetitions = repetitions
        exercise.day = day

        const updatedExercise = await exercise.save()
        response.json(updatedExercise)
    } catch (error) {
        console.error('Error updating exercise:', error)
        if (error.name === 'ValidationError') {
            return response.status(400).json({ error: error.message })
        }
        response.status(500).json({ error: 'internal server error' })
    }
})

module.exports = exerciseRouter