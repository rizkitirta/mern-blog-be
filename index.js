const express = require('express');
const app = express();
const routes = require('./app/routes');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: (req,file,callback) => {
        callback(null,'./public/images');
    },
    filename: (req,file,callback) => {
        callback(null,new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req,file,callback) => {
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg'){
        callback(null,true)
    }else{
        callback(null,false)
    }
}

app.use(bodyParser.json())
// app.use(express.bodyParser())
app.use(cors())
app.use(multer({storage: fileStorage,fileFilter: fileFilter}).single('image'));
app.use('/public/images',express.static(path.join(__dirname,'/public/images')))
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//     next();
// })

app.use((error,req,res,next) => {
    const status = error.status || 500;
    res.status(status).json({
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