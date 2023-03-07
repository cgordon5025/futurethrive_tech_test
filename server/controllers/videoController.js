const { Video } = require('../models')
const { BlobServiceClient } = require('@azure/storage-blob')
const fs = require('fs')
const https = require('https')
const connStr = "DefaultEndpointsProtocol=https;AccountName=ftnsftestvideos;AccountKey=ZrdiLeyADwqrwLweHbaBhR+opWPAB+gTSVzNxiksGf9A2LnwtY/oSjvGPyNTeCCIvg3o1he0zDOs+AStIKzIeQ==;EndpointSuffix=core.windows.net"
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)
const containerName = "videos"
module.exports = {
    async saveVideo(req, res) {
        const { createReadStream, filename, mimetype, url } = req.body
        // const { createReadStream, filename, mimetype } = video
        // const vidStream = fs.createReadStream(url)
        const vidStream = https.get(url, (stream) => {
            stream.pipe(res)
        })
        // console.log(vidStream)
        const containerClient = blobServiceClient.getContainerClient(containerName)
        console.log(req.body)
        //look into put block??
        // const content = req.body.blob
        // let streamSize = parseInt(req.headers['content-length'])
        // // const content = args.url
        // // const fileStream = createReadStream()
        // const blobName = `${filename}.${mimetype}`
        // const blockBlobClient = containerClient.getBlockBlobClient(blobName)
        // const uploadBlobResponse = await blockBlobClient.upload(content, streamSize)
        // console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    }
}