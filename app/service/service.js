const path = require('path');
const fs = require('fs');

exports.removeFile = (filePath) => {
    filePath = path.join(__dirname,'../../',filePath)
    fs.unlink(filePath,err => console.log(err));
}