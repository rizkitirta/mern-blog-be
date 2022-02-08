const express = require('express');
const app = express();
const router = express.Router();
const routes = require('./app/routes');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');

app.use(bodyParser.json())
app.use(cors())
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//     next();
// })

app.use((error,req,res,next) => {
    res.status(error.status).json({
        message: error.message,
        data: error.data
    })
})

mongoose.connect('mongodb+srv://tirtadev:BzLulT3tyRyXFqPq@cluster0.bu4eo.mongodb.net/mern-myblog?retryWrites=true&w=majority')
.then(() => {
    app.listen(3001,() => console.log("Server is running"));
})
.catch(err => console.log(err))


app.use('/v1', routes)