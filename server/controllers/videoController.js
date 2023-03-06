const { Video } = require('../models')
const { BlobServiceClient } = require('@azure/storage-blob')
const connStr = "DefaultEndpointsProtocol=https;AccountName=ftnsftestvideos;AccountKey=ZrdiLeyADwqrwLweHbaBhR+opWPAB+gTSVzNxiksGf9A2LnwtY/oSjvGPyNTeCCIvg3o1he0zDOs+AStIKzIeQ==;EndpointSuffix=core.windows.net"
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)
const containerName = "videos"
module.exports = {
    async saveVideo(req, res) {
        const containerClient = blobServiceClient.getContainerClient(containerName)
        console.log(req.body)
        // const content = args.videofile
        const content = req.body.blob
        // const content = args.url
        const blobName = `${req.body.filename}.${req.body.mimetype}`
        const blockBlobClient = containerClient.getBlockBlobClient(blobName)
        const uploadBlobResponse = await blockBlobClient.upload(content, content.length)
        console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    }
}