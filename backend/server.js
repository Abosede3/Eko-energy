const express = require('express')
const dotenv = require('dotenv') // contenting to .env file 
const connectDB = require('./Config/db') // Connecting to the database
const userRoute = require('./api/userRoute')

const cors = require('cors')

const bodyParser = require('express').json

const app = express()
app.use(cors())
app.use(bodyParser())
dotenv.config()
connectDB()


// API Routes
app.use('/users', userRoute)


const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
 console.log(`Server is running on ${PORT}`)
})