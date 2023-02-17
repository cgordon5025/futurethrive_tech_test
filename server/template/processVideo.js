const mongodb = require('mongodb')

const fs = require('fs')
const db = require('../config/connection');
const bucket = new mongodb.GridFSBucket(db, { bucketName: "videos" })
function processVideo(data) {
    console.log(data)
    const fileLocation = '~./server/template/sample.mp4'
    fs.createReadStream(`~./server/template/sample.mp4`).
        pipe(bucket.openUploadStream('myFile', {
            chunkSizeBytes: 1048576,
            metadata: { field: 'myField', value: 'myValue' }
        }));
}
module.exports = processVideo