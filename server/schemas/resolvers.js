const { User, Results, Video } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        getUsers: async () => {
            try {
                return await User.find().populate({ path: 'Results' }).populate({ path: 'Video' })
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
        saveAnswers: async (parent, args) => {
            const newResults = await Results.create({ ...args })
            const updatedUser = await User.findOneAndUpdate(
                { _id: args.userID },
                { $push: { results: newResults._id } },
                { new: true })
            return newResults
        },
        saveVideo: async (parents, args) => {
            const newVideo = await Video.create({ videofile: args.videofile })
            const updatedUser = await User.findOneAndUpdate(
                { _id: args.userID },
                { $push: { video: newVideo._id } },
                { new: true }
            )
            return newVideo
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