const { BlobServiceClient } = require('@azure/storage-blob')
const fs = require('fs')

const connStr = "DefaultEndpointsProtocol=https;AccountName=ftnsftestvideos;AccountKey=ZrdiLeyADwqrwLweHbaBhR+opWPAB+gTSVzNxiksGf9A2LnwtY/oSjvGPyNTeCCIvg3o1he0zDOs+AStIKzIeQ==;EndpointSuffix=core.windows.net"
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)
const containerName = "videos"
var chunkData;
module.exports = {
    async saveVideo(req, res) {
        var videoID = req.params.filename
        console.log(videoID)
        console.log(typeof videoID)
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
        if (videoID.includes("_0") && (fs.existsSync(`./videos/${fileName}`))) {
            console.log("first chunk and the video file has been made, lets drop it to avoid conflicts")
            await fs.unlink(`./videos/${fileName}`)
        }

        req.on('data', chunk => {
            console.log("runnig")
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
        console.log(req.body)
        console.log(videoName)
        const contentLength = req.body.fileSize
        const videoPath = `./videos/${videoName}`


        const containerClient = blobServiceClient.getContainerClient(containerName)
        const blockBlobClient = containerClient.getBlockBlobClient(videoName)
        if (fs.existsSync(videoPath)) {
            await blockBlobClient.uploadFile(videoPath, {
                blockSize: contentLength,
                concurrency: 20
            })
        } else {
            console.log("the video does not exist")
        }
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


        res.status(200).json('testing')

    }
}