require('dotenv').config()

const express = require('express')
const app = express()

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const dbConnection = mongoose.connection
dbConnection.on('error', (err) => console.error.bind(console, "dbCerror: "))
dbConnection.once('open', () => console.log('Connect to the Database Successfully'))

app.use(express.json())


const subscribersRouters = require('./routes/subscribers')
app.use('/subscribers', subscribersRouters)

app.listen(3000, () => console.log('Server is Running on PORT 3000'))