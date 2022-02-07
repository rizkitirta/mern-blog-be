const express = require('express');
const app = express();
const router = express.Router();
const routes = require('./app/routes');

app.use('/',routes)
app.listen(3001);