const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Titel - title - er påkrævet']
    },
    description: {
        type: String,
        required: [true, 'Beskrivelse - description - er påkrævet']
    },
    image: {
        type: String
    },
    done: {
        type: Boolean,
        default: false
    }

})

module.exports = mongoose.model('Todo', todoSchema, 'todos')