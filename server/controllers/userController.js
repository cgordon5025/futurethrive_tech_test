const { User } = require('../models')

module.exports = {
    async createUser(req, res) {
        const newUser = await User.create({ username: req.body.username })
        return (newUser)
    }
}