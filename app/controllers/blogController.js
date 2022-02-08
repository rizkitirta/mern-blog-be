const {body,validationResult} = require('express-validator');
const Blog = require('../models/blog')

exports.getPost = async (req,res,next) => {
    await res.send('okke')
    next()
}

exports.storePost =  (req,res) => {
    const errors = validationResult(req)
    const {title,content} = req.body;
    console.log(req.body,'ss')

    // if(!errors.isEmpty()){
    //     const err = new Error('Invalid Req')
    //     err.status = 400;
    //     err.data = errors.array();
    //     throw err;
    // }
    
    const post = new Blog({
        title: title,
        content: content,
        author: {uid:1, name: 'tirtadev'}
    });

    post.save()
    .then(data => {
        res.status(201).json({
            success: true,
            data: data
        });
    })
    .catch(error => {
        res.status(400).json({
            success: false,
            data: error.message
        });
    })
}