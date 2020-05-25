const fs = require('fs')


function writeData(id, data, filename) {
    if (!fs.existsSync(`./data/videos/${id}`)) {
        fs.mkdirSync(`./data/videos/${id}`);
    }
    
    fs.writeFileSync(`./data/videos/${id}/${filename}.txt`, data);
}

module.exports = {
    writeData: writeData
}
