const { User, Results } = require('../models')
const generateCSV = require('../utils/generateCSV')
const writeToFile = require('../utils/writeToFile');

module.exports = {
    async saveAnswers(req, res) {
        console.log(req.body.formState)
        const responses = req.body.formState
        console.log(responses)
        // const newResults = await Results.create({ ...req.body })
        // const updatedUser = await User.findOneAndUpdate(
        //     { _id: req.body.userId },
        //     { $push: { results: newResults._id } },
        //     { new: true })

        await writeToFile(`./data/${req.body.userId}.csv`, generateCSV({ ...req.body }))
        res.status(200).json("tada")

    }
}