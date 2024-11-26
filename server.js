const express = require('express')
const app = express()
const PORT = 5000

// --------- APP
// ---------------------------------------------------------
app.use( express.json() )                                   // POST PUT mv. kan modtage JSON
app.use( express.urlencoded ({ extended: true }))           // POST PUT mv. kan modtage som urlencoded

const formData = require( 'express-form-data' )
app.use( formData.parse())                                  // POST PUT mv. kan modtage data som form-data

// --------- DB MongoDB og Mongoose (npm i mongoose)
// ---------------------------------------------------------
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/dataserverDB")

const db = mongoose.connection
// hvis fejl
db.on ('error', (error) => console.log(`FEJL: ${error}`))
// hvis succes
db.once('open', () => console.log(`/// ---> Så er der hul igennem til MongoDB-databasen`))

// -------- GET til serverens endpoint: http://localhost:5000
// ----------------------------------------------------------
app.get('/', async (req, res) => { 

    console.log("GET - serveren endpoint")

    // response til client
    res.status(200).json({
        message: "velkommen til serverens endpoints"
    })

}) 

// Routes
// -----------------------------------------------------------
app.use( '/todos', require('./routes/todos.routes'))

// -------- LISTEN - opstart server
// -----------------------------------------------------------
app.listen(PORT, () => 

    console.log(`-------> Serveren er startet op nu på port: ${PORT}`)

)

