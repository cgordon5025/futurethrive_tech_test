const { Video } = require('../models')
const { BlobServiceClient } = require('@azure/storage-blob')
const fs = require('fs')
const https = require('https')
const connStr = "DefaultEndpointsProtocol=https;AccountName=ftnsftestvideos;AccountKey=ZrdiLeyADwqrwLweHbaBhR+opWPAB+gTSVzNxiksGf9A2LnwtY/oSjvGPyNTeCCIvg3o1he0zDOs+AStIKzIeQ==;EndpointSuffix=core.windows.net"
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)
const containerName = "videos"
module.exports = {
    async saveVideo(req, res) {
        var videoID = req.params.filename
        var fileName = videoID.split('_')[0]
        console.log(fileName)
        if (fs.existsSync(`./${fileName}`)) {
            console.log('directory already exists')
        } else {
            fs.mkdir(fileName, (err) => console.log(err))
        }
        // await fs.existsSync(fileName, function (error) {
        //     if (error) {
        //         fs.mkdir(fileName, (err) => console.log(err))
        //         console.log('making new directory')
        //     } else {
        //         console.log('the directory already exists')
        //     }
        // })
        const containerClient = blobServiceClient.getContainerClient(containerName)
        // console.log(req.body)
        req.on('data', chunk => {
            fs.appendFileSync(`${fileName}/${videoID}`, chunk); // append to a file on the disk
            fs.writeFile(`./videos/${fileName}.mp4`, chunk, function (err) {
                if (err) throw err;
            })
        })
        res.status(200).json('testing')
    },

    async uploadVideo(req, res) {
        console.log('its referring to this')
        console.log(req.body)
        const videoName = req.body.encryptedId
        const contentLength = req.body.fileSize
        // look into put block??
        const video = await fs.ReadStream(`./videos/${videoName}.mp4`, function (err) {
            if (err) throw err
        })
        console.log(video)
        const content = `../${req.body.encryptedId}`
        console.log(content)
        console.log(contentLength)
        res.status(200).json('testing')
        // let streamSize = parseInt(req.headers['content-length'])
        // const content = args.url
        // const fileStream = createReadStream()
        // const blobName = `${videoName}.mp4`
        // const blockBlobClient = containerClient.getBlockBlobClient(blobName)
        // const uploadBlobResponse = await blockBlobClient.upload(video, streamSize)
        // console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

    }
}