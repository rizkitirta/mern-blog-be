const express = require("express");
const router = express.Router()
const blogController = require('../controllers/blogController');
const authController = require('../controllers/authController');
const {body} = require('express-validator')

/**Auth Route*/
router.post('/auth/login',authController.login)
router.post('/auth/register',authController.register)

/**Blog Route */
router.get('/get-post',blogController.getPost);
router.post('/create-blog',[
    body('title').isLength({ min: 5 }).withMessage('title min 5 huruf'),
    body('content').isLength({ min: 5 }).withMessage('title min 5 huruf')
],blogController.storePost);

module.exports = router;

