const express = require('express')
const router = express.Router()

// Modellen/skemaet for todo-data
const Todo = require("../models/todo.models")

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
router.post('/', async (req, res) => {

    console.log("POST - opret ny todo")
    try {
        let todo = new Todo( req.body )
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

        return res.status(200).json({ data: `todo er rettet: `, edited: todo})

    } catch (error) {

        return res.status(400).json({ message: `Der er opstået en fejl: ${error.message}`, edited: null})
    }
})

// ---- Delete --------
// ------------------------------------------------------------
router.delete('/:id', async (req, res) => {
    return res.status(200).json({ data: "DELETE ud fra ID: Skal modtage ID'en på det som skal slettes i DB. ID:" + req.params.id})
})

// HUSK !!!!
module.exports = router;
