const { Video } = require('../models')
const { BlobServiceClient } = require('@azure/storage-blob')
const { pipeline } = require('stream/promises')
const fs = require('fs')
const https = require('https')
const connStr = "DefaultEndpointsProtocol=https;AccountName=ftnsftestvideos;AccountKey=ZrdiLeyADwqrwLweHbaBhR+opWPAB+gTSVzNxiksGf9A2LnwtY/oSjvGPyNTeCCIvg3o1he0zDOs+AStIKzIeQ==;EndpointSuffix=core.windows.net"
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)
const containerName = "videos"
module.exports = {
    async saveVideo(req, res) {
        var videoID = req.params.filename
        var fileName = videoID.split('_')[0]
        // console.log(fileName)
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

        // console.log(req.body)
        req.on('data', chunk => {
            fs.appendFileSync(`${fileName}/${videoID}`, chunk); // append to a file on the disk
            //needs to be append file or else it will continually save over what i have already
            fs.appendFile(`./videos/${fileName}.mp4`, chunk, function (err) {
                if (err) throw err;
            })
        })
        res.status(200).json('testing')
    },

    async uploadVideo(req, res) {
        // console.log('its referring to this')
        // console.log(req.body)
        const videoName = req.body.encryptedId
        const contentLength = req.body.fileSize
        console.log(videoName)
        // look into put block??
        var video;
        const blobName = `${videoName}.mp4`
        const containerClient = blobServiceClient.getContainerClient(containerName)
        var videoBlob;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName)
        if ((videoName != NaN) && (contentLength != NaN)) {
            // await pipeline(
            video = fs.readFile(`./videos/${videoName}.mp4`, err => {
                console.log(err)
            })
            console.log("video file being read",video)
            videoBlob = new Blob(video)
            // blockBlobClient.upload(video, contentLength)
            // )
            // console.log(`Upload block blob ${blobName} successfully`,);
            console.log("this is the new blob",videoBlob)
            // video = await fs.createReadStream(`./videos/${videoName}.mp4`, function (err) {
            //         if (err) throw err
            //     })
            // console.log(video)
            // const blobName = `${videoName}.mp4`
            // const containerClient = blobServiceClient.getContainerClient(containerName)

            // const blockBlobClient = containerClient.getBlockBlobClient(blobName)
            // const uploadBlobResponse = await blockBlobClient.upload(video, contentLength)
            // console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
        }
        console.log(video)
        // const content = `../${req.body.encryptedId}`
        // console.log(content)
        // console.log(contentLength)
        res.status(200).json('testing')
        // let streamSize = parseInt(req.headers['content-length'])
        // const content = args.url
        // const fileStream = createReadStream()
        // const blobName = `${videoName}.mp4`
        // const containerClient = blobServiceClient.getContainerClient(containerName)

        // const blockBlobClient = containerClient.getBlockBlobClient(blobName)
        // const uploadBlobResponse = await blockBlobClient.upload(video, contentLength)
        // console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

    }
}