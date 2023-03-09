const { BlobServiceClient } = require('@azure/storage-blob')
const connStr = "DefaultEndpointsProtocol=https;AccountName=ftnsftestvideos;AccountKey=ZrdiLeyADwqrwLweHbaBhR+opWPAB+gTSVzNxiksGf9A2LnwtY/oSjvGPyNTeCCIvg3o1he0zDOs+AStIKzIeQ==;EndpointSuffix=core.windows.net"
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)
const containerName = "videos"

function pushToAzure(chunk) {
    var blob = new Blob(chunk)
    blob = blob.slice(0, blob.size, 'video/mp4')
    const containerClient = blobServiceClient.getContainerClient(containerName)
    // console.log(containerClient)
    const blockBlobClient = containerClient.getBlockBlobClient("finaltest.mp4")
    if (blockBlobClient) {
        console.log("the file exists already")
        blockBlobClient.appendBlock(blob, blob.size)
    } else {
        console.log("it does not exist, lets initiate")
        blockBlobClient.upload(blob, blob.size)

    }
    // // const blockBlobClient = containerClient.getBlockBlobClient('finaltest.mp4')
    // blockBlobClient.AsyncUpload(blob, blob.size)
}

module.exports = pushToAzure