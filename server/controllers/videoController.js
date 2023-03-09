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
        if (fs.existsSync(`./videos/finaltest.mp4`) && fs.existsSync(`./${fileName}`)) {
            console.log("the file have already been processed")
            res.status(200).json('testing')

        } else {
            req.on('data', chunk => {

                // // console.log(chunk.length)
                fs.appendFileSync(`${fileName}/${videoID}`, chunk); // append to a file on the disk
                //needs to be append file or else it will continually save over what i have already
                fs.appendFile(`./videos/${fileName}.mp4`, chunk, function (err) {
                    if (err) throw err;
                })

                chunkData = chunkData + chunk
                // pushToAzure(chunk)
                // const containerClient = blobServiceClient.getContainerClient(containerName)
                // const blockBlobClient = containerClient.getAppendBlobClient("finaltest.mp4")

                // // const blockBlobClient = containerClient.getBlockBlobClient(fileName)
                // blockBlobClient.appendBlock(chunk, chunk.length)

                // blockBlobClient.upload(chunk, chunk.length)

                // fs.appendFile(`./videos/${fileName}.mp4`, chunk, function (err) {
                //     if (err) throw err;
                // })
            })
            res.status(200).json('testing')
        }
    },

    async uploadVideo(req, res) {
        const videoName = req.body.encryptedId
        const contentLength = req.body.fileSize
        //test path
        const videoPath = `./videos/${videoName}.mp4`


        const containerClient = blobServiceClient.getContainerClient(containerName)
        // const blockBlobClient = containerClient.getAppendBlobClient("finaltest.mp4")
        const data = Buffer.from(chunkData, "base64")
        const blockBlobClient = containerClient.getBlockBlobClient('finaltest.mp4')
        // await blockBlobClient.uploadFile(videoPath, {
        //     blockSize: contentLength,
        //     concurrency: 20
        // })
        // await fs.unlink(videoPath, (err) => {
        //     if (err) {
        //         throw err
        //     }
        //     console.log("deletedFile")
        // })
        await fs.rmSync(`./${videoName}`, { recursive: true, force: true }, (err) => {
            if (err) {
                throw err
            }
            console.log("deleted the holding file")
        })

        // console.log(`Upload block blob ${videoName} successfully`, uploadBlobResponse.requestId);

        res.status(200).json('testing')

    }
}