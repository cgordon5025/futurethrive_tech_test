const { Video } = require('../models')
const { BlobServiceClient } = require('@azure/storage-blob')
const fs = require('fs')
const { pipeline } = require('stream/promises')
const Stream = require('stream')
const https = require('https')
const path = require('path')
const connStr = "DefaultEndpointsProtocol=https;AccountName=ftnsftestvideos;AccountKey=ZrdiLeyADwqrwLweHbaBhR+opWPAB+gTSVzNxiksGf9A2LnwtY/oSjvGPyNTeCCIvg3o1he0zDOs+AStIKzIeQ==;EndpointSuffix=core.windows.net"
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)
const containerName = "videos"
const pushToAzure = require('../template/pushToAzure')
var chunkData;
module.exports = {
    async saveVideo(req, res) {
        var videoID = req.params.filename
        var fileName = videoID.split('_')[0]
        // console.log(req.headers)
        // var chunkLength = req.headers.get('content-length')
        // console.log(chunkLength)
        // console.log(fileName)
        if (fs.existsSync(`./${fileName}`)) {
            console.log('directory already exists')
        } else {
            fs.mkdir(fileName, (err) => console.log(err))
        }
        //in reality we will not be doing multiple files under the same exact name so this should not be an issue
        //kept here just in case, but this should not be an issue
        // if (fs.existsSync(`./videos/${fileName}.mp4`) && fs.existsSync(`./${fileName}`)) {
        //     console.log("the file have already been processed")
        //     res.status(200).json('testing')

        // } else {
        req.on('data', chunk => {

            // // console.log(chunk.length)
            fs.appendFileSync(`${fileName}/${videoID}`, chunk); // append to a file on the disk
            //needs to be append file or else it will continually save over what i have already
            fs.appendFile(`./videos/${fileName}.mp4`, chunk, function (err) {
                if (err) throw err;
            })
        })
        res.status(200).json('testing')
        // }
    },

    async uploadVideo(req, res) {
        const videoName = `${req.body.vidUserId}.mp4`

        console.log(videoName)
        const contentLength = req.body.fileSize
        //test path
        const videoPath = `./videos/${videoName}`


        const containerClient = blobServiceClient.getContainerClient(containerName)
        // const blockBlobClient = containerClient.getAppendBlobClient("finaltest.mp4")
        const blockBlobClient = containerClient.getBlockBlobClient(videoName)
        await blockBlobClient.uploadFile(videoPath, {
            blockSize: contentLength,
            concurrency: 20
        })
        await fs.unlink(videoPath, (err) => {
            if (err) {
                throw err
            }
            console.log("deletedFile")
        })
        await fs.rmSync(`./${req.body.vidUserId}`, { recursive: true, force: true }, (err) => {
            if (err) {
                throw err
            }
            console.log("deleted the holding file")
        })

        // console.log(`Upload block blob ${videoName} successfully`, uploadBlobResponse.requestId);

        res.status(200).json('testing')

    }
}