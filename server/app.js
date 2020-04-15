const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const userRoutes = require('./routes/users')
const articleRoutes = require('./routes/articles')

mongoose.connect(
    'mongodb://localhost:27018/certificationProject',
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log('DB Connected!')
)

const app = express()

app.use(cors())


//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded( {extended: false} ))

//parse application/json
app.use(bodyParser.json())

app.use('/', userRoutes)
app.use('/articles', articleRoutes)


module.exports = app