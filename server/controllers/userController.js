const { User } = require('../models')

module.exports = {
    async createUser(req, res) {
        try {
            const newUser = await User.create(
                { username: req.body.username }
            )
            // return (newUser._id)
            res.status(200).json(newUser._id)
        } catch (e) {
            res.status(400).json(e)
        }
    },
    async getUsers(req, res) {
        try {
            console.log('trying')
            const userData = await User.find();
            res.status(200).json(userData)
        } catch (e) {
            res.status(400).json(e)
        }
    }
}