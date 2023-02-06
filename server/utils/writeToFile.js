const fs = require('fs')

function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log('Commit logged!'))
}

module.exports = writeToFile