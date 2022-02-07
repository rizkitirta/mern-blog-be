const express = require("express");
const router = express.Router()
const blogController = require('../controllers/blogController');

router.get('/create-blog',blogController.getPost)

module.exports = router;

