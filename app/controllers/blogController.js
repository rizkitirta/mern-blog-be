const {body,validationResult} = require('express-validator');
const parse = require('nodemon/lib/cli/parse');
const Blog = require('../models/blog')
const blog = require('../models/blog');
const service = require('../service/service')

exports.getPost = (req,res,next) => {
    const currentPage = req.query.page || 1;
    const perPage = req.query.perPage || 3;
    let totalItems;
    
    blog.find().countDocuments()
    .then(count => {
        totalItems = count;
        return Blog.find()
        .skip((parseInt(currentPage) -1 ) * parseInt(perPage))
        .limit(perPage)
        .then(result => {
            res.status(200).json({
                message: 'Data Retrieved Successfully',
                data: result,
                total_data : totalItems,
                curent_page: parseInt(currentPage),
                per_page: parseInt(perPage),
                total_page: totalItems / perPage
            })
        })
    })
    .catch(err => {
        next(err)
    })
}

exports.getPostById = (req,res,next) => {
    const data = Blog.findById(req.params.id)
    .then(result => {
        if(!result){
            const error = new Error('Not Found Data!')
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            message: 'Data Retrieved Successfully',
            data: result
        })
    })
    .catch(err => {
        next(err)
    })
}

exports.storePost =  (req,res,next) => {
    const errors = validationResult(req)
    
    console.log(req.body,'ss')

    if(!errors.isEmpty()){
        const err = new Error('Invalid Req')
        err.status = 400;
        err.data = errors.array();
        throw err;
    }

    if(!req.file){
        const err = new Error('Image Wajib Di Upload!')
        err.status = 422;
        err.data = errors.array();
        throw err;
    }

    const {title,content} = req.body;
    const post = new Blog({
        title: title,
        content: content,
        image: req.file.path,
        author: {uid:1, name: 'tirtadev'}
    });

    post.save()
    .then(data => {
        res.status(201).json({
            success: true,
            message: 'Data created successfully',
            data: data
        });
    })
    .catch(err => {
        next(err)
    })
}

exports.updatePost =  (req,res,next) => {
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        const err = new Error('Invalid Req')
        err.status = 400;
        err.data = errors.array();
        throw err;
    }
    
    const {title,content} = req.body;
    const post = Blog.findById(req.params.id)
    .then(data => {
        console.log(data)
        if(!data){
            const error = new Error('Post Not Found!')
            error.status = 400;
            throw error;
        }

        data.title = title;
        data.content = content;
        if(req.file){
            service.removeFile(data.image)
            data.image = req.file.path;
        }
        data.author = {uid:1, name: 'tirtadev'};
        data.save()
        .then(result => {
            res.status(201).json({
                success: true,
                message: 'Data updated successfully',
                data: result
            });
        })
    })
    .catch(err => {
        next(err)
    })
}

exports.deletePost = (req,res,next) => {
    const post = Blog.findById(req.params.id)
    .then(data => {
         if(!data){
             const error = new Error('Data not found!');
             error.status = 404;
             throw error;
         }

         if(data.image){
            service.removeFile(data.image)
         }
         return blog.findByIdAndRemove(req.params.id)
         .then(result => {
            res.status(200).json({
                success: true,
                message: 'Data deleted successfully',
                data: result
            })
         })
    })
    .catch(err => {
        next(err)
    })
}
