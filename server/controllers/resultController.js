const { User, Results } = require('../models')
const generateRawResults = require('../utils/generateRawResults')
const writeToFile = require('../utils/writeToFile');
const sentimentAnalysis = require('../utils/sentimentAnalysis')
const writeJSON = require('../utils/writeJSON')
module.exports = {
    async saveAnswers(req, res) {
        // console.log(req.body.formState)

        // await writeToFile(`./JSON/${req.body.userId}.json`, writeJSON({ ...req.body }))
        await sentimentAnalysis({ ...req.body }) // await writeJSON({ ...req.body })
        // await sentimentAnalysis({ ...req.body })
        // await writeToFile(`./data/${req.body.userId}.csv`, generateRawResults({ ...req.body }))
        // // await sentimentAnalysis()
        //     res.status(200).json("tada")

    }
}