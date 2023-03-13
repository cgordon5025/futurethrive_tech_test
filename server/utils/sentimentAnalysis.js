// const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text");
const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");
const writeToFile = require('../utils/writeToFile')

// const { TextAnalysisClient }
require("dotenv").config()
const key = process.env.LANGUAGE_KEY;
const endpoint = process.env.LANGUAGE_ENDPOINT;
var confidenceString;
// const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(key));
const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key))
var documents = [];
var documents2 = [];
var documents3 = [];
var questions = [];
var userId;
function createDocument(data) {
    // console.log(data)
    userId = data.userId
    var i = 0
    const responses = data.formState;
    for (values in responses) {
        if (Array.isArray(responses[values])) {
            console.log("this is the checkbox question, not much sentiment here")
            // var temp = responses[values].join()
            // documents.push(temp)

        } else if (typeof responses[values] == "boolean") {
            // var tempBool = responses[values].toString()
            // documents.push(tempBool)
            console.log("its a boolean lets leave it out")
        }
        else if (parseInt(responses[values])) {
            console.log("its a number, lets leave it out")
        }
        else {
            if (i < 10) {
                // console.log(i)
                documents.push(responses[values])
                i++
            } else if (i > 9 && i < 20) {
                // console.log(i)

                documents2.push(responses[values])
                i++
            } else {
                // console.log(i)

                documents3.push(responses[values])
            }
        }
        // documents.push(`{"id":"${i}","language": "en-us","text": ${responses[values]}}`)
        // console.log(values)
        questions.push(values)
    }

    // console.log(documents)
    // console.log(questions)

}

var myResults = `userId, sentence, sentiment Analysis, confidence Interval`
async function sentimentAnalysis(data) {
    // console.log("here")
    await createDocument(data)
    // console.log(documents)
    // console.log(documents2)
    // console.log(documents3)
    const results = await client.analyzeSentiment(documents)
    for (const result of results) {
        // console.log(result)
        if (result.error === undefined) {
            confidenceString = `
            Positive: ${result.confidenceScores.positive}; Neutral:${result.confidenceScores.neutral}; Negative:${result.confidenceScores.negative}`
            // const confScores = result.confidenceScores
            // for (const confidenceScore of confScores) {
            //     console.log(confidenceScore, confScore(confidenceScore))
            // }
            var temp = `${userId},${result.sentences[0].text},${result.sentiment},${confidenceString}`
            myResults = myResults + temp
            // console.log(myResults)

            // console.log("original sentence:", result.sentences[0].text)
            // console.log("Overall sentiment:", result.sentiment);
            // console.log("Scores:", result.confidenceScores);
        } else {
            console.error("Encountered an error:", result.error);
        }
    }
    writeToFile(`./sentimentAnalysis/${userId}.csv`, myResults)
}

module.exports = sentimentAnalysis
