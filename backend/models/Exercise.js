const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    repetitions: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        default: 0
    },
    day: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

exerciseSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Exercise', exerciseSchema)