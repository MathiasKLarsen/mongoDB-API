const express = require('express')
const router = express.Router()

// Modellen/skemaet for todo-data
const Todo = require("../models/todo.models")

// Multer til håndtering af filer - fx billeder/images
const multer = require('multer')

const upload = multer({

    storage: multer.diskStorage({

        destination: function(req, file, cb) {
            cb(null, 'public/images')
        },
        filename: function(req, file, cb) {
            // cb(null, file.originalname)
            cb(null, Date.now() + "-" + file.originalname)
            // cb(null, Data.now() + path.exname + file.originalname)
        }

    })
})

// TODOS 

// ----- HENT/GET hilsen fra route
// ------------------------------------------------------------
router.get('/', async (req, res) => {
    console.log("GET - hent alle todos")

    try {
        let todos = await Todo.find()
        return res.status(200).json({ todos: todos })

    } catch (error) {
        return res.status(400).json({ message: `Der er opstået en fejl: ${error.message}`, created: null})
        
    }
})

// ---- GET - udvalgt --------
// ------------------------------------------------------------
router.get('/:id', async (req, res) => {
    console.log("GET - hent udvalgt todo")

    try {
        let todo = await Todo.findById(req.params.id) // betyder find ud fra id - snup id fra params (url'en)
        return res.status(200).json({ todo: todo })

    } catch (error) {
        return res.status(400).json({ message: `Der er opstået en fejl: ${error.message}`, todo: null})
        
    }
})

// ---- POST --------
// ------------------------------------------------------------
router.post('/', upload.single("image"), async (req, res) => {

    console.log("POST - opret ny todo")
    try {
        let todo = new Todo( req.body )
        // filnavne fra multer skal gemmes i databasen
        todo.image = req.file.filename

        await todo.save()
        return res.status(201).json({ data: `Ny todo er oprettet: `, creadted: todo})

    } catch (error) {

        return res.status(400).json({ message: `Der er opstået en fejl: ${error.message}`, created: null})
    }
})

// ---- PUT --------
// ------------------------------------------------------------
router.put('/:id', async (req, res) => {
    console.log("PUT - ret todo")

    try {
        
        let todo = await Todo.findByIdAndUpdate ( req.params.id, req.body, { new: true})

        if(!todo) {
            return res.status(404).json({ message: "Todo kunne ikke findes:", edited: null})
        }

        return res.status(200).json({ data: `todo er rettet: `, edited: todo})

    } catch (error) {

        return res.status(400).json({ message: `Der er opstået en fejl: ${error.message}`, edited: null})
    }
})

// ---- Delete --------
// ------------------------------------------------------------
router.delete('/:id', async (req, res) => {
    console.log("DELETE - slet todo")

    try {
        
        let todo = await Todo.findByIdAndDelete ( req.params.id )

        if(!todo) {
            return res.status(404).json({ message: "Todo kunne ikke findes:"})
        }

        return res.status(200).json({ data: "todo er slettet"})

    } catch (error) {

        return res.status(400).json({ message: `Der er opstået en fejl: ${error.message}`})
    }
})

// HUSK !!!!
module.exports = router;
