const express = require('express');
const app = express();

app.use(() => {
    console.log('hello server')
})
app.listen(3001);