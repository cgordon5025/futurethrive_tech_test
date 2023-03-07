const { User, Results, Video } = require('../models');

const generateCSV = require('../template/generateCSV');
const writeToFile = require('../utils/writeToFile');
const processVideo = require('../template/processVideo')
const downloadVideo = require('../utils/downloadVideo')
const fs = require('fs')
const { BlobServiceClient } = require('@azure/storage-blob')
const connStr = "DefaultEndpointsProtocol=https;AccountName=ftnsftestvideos;AccountKey=ZrdiLeyADwqrwLweHbaBhR+opWPAB+gTSVzNxiksGf9A2LnwtY/oSjvGPyNTeCCIvg3o1he0zDOs+AStIKzIeQ==;EndpointSuffix=core.windows.net"
const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)
const containerName = "videos"
// const { json2csv } = require('json2csv')
const resolvers = {
    Query: {
        getUsers: async () => {
            try {
                return await User.find().populate('Results').populate({ path: 'Video' })
            }
            catch (e) {
                console.log(e)
            }

        },
        getUser: async (parent, args, context) => {
            return User.findOne({ _id: args.id }).populate({ path: 'results' }).populate({ path: 'video' })
        }
    },
    Mutation: {
        //to add back in if we want this, might be causing the issue?
        // familyHelp:args.familyHelp
        //on the front end we'll hardcode this so it's deidentified, but linked the ids to respective reports and vids
        createUser: async (parents, args) => {
            const newUser = await User.create({ username: args.username })
            return (newUser)
        },
        saveAnswers: async (parent, args) => {

            const newResults = await Results.create({ ...args })
            const updatedUser = await User.findOneAndUpdate(
                { _id: args.userId },
                { $push: { results: newResults._id } },
                { new: true })

            await writeToFile(`./data/${args.userId}.csv`, generateCSV({ ...args }))
            return newResults
        },
        uploadVideo: async (parents, args) => {
            const { createReadStream, filename, mimetype } = args.video
            console.log("hello triggered")
            const containerClient = blobServiceClient.getContainerClient(containerName)
            // const content = args.videofile
            const content = args.video
            // const content = args.url
            const blobName = `${filename}.${mimetype}`
            const blockBlobClient = containerClient.getBlockBlobClient(blobName)
            const uploadBlobResponse = await blockBlobClient.upload(content, content.length)
            console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
        },
        saveVideo: async (parents, args) => {
            const { createReadStream, filename, mimetype } = video
            console.log("hello triggered")
            const containerClient = blobServiceClient.getContainerClient(containerName)
            // const content = args.videofile
            const content = video
            // const content = args.url
            const blobName = `${args.filename}.${args.mimetype}`
            const blockBlobClient = containerClient.getBlockBlobClient(blobName)
            const uploadBlobResponse = await blockBlobClient.upload(content, content.length)
            console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
        }
    }
};

module.exports = resolvers;