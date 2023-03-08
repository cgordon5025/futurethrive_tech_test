const { User, Results } = require('../models')

module.exports = {
    async saveAnswers(req, res) {
        const newResults = await Results.create({ ...req.body })
        const updatedUser = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { results: newResults._id } },
            { new: true })

        await writeToFile(`./data/${req.body.userId}.csv`, generateCSV({ ...args }))
        return newResults

    }
}