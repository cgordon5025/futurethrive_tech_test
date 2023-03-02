const { User, Results, Video } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const generateCSV = require('../template/generateCSV');
const writeToFile = require('../utils/writeToFile');
const processVideo = require('../template/processVideo')
const downloadVideo = require('../utils/downloadVideo')
const fs = require('fs')
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
        saveVideo: async (parents, args) => {
            // const tempVideo = saveTemp({ ...args })
            console.log("hello triggered")
            const newVideo = await downloadVideo({ ...args })
            // await writeToFile(`./videos/${args.videofile}`, args.URL)
            // fs.createWriteStream({ ...args })
            // const newVideo = processVideo({ ...args })
            // const newVideo = await Video.create({ videofile: args.videofile })
            // const updatedUser = await User.findOneAndUpdate(
            //     { _id: args.userId },
            //     { $push: { video: newVideo._id } },
            //     { new: true }
            // )
            // return newVideo
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username })
            if (!user) {
                throw new AuthenticationError("You are not one of the users for this site, please return to the homepage")
            }

            const correctPw = await User.isCorrectPassword(password)
            if (!correctPw) {
                throw new AuthenticationError("You entered the wrong password")
            };

            const token = signToken(user)
            return { token, user }
        }
    }
};

module.exports = resolvers;