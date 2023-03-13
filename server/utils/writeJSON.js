var documents = []

function createDocument(data) {
    userId = data.userId

    const responses = data.formState;
    var i = 0
    for (values in responses) {

        documents.push(
            `{"id":"${i}","language": "en-us","text": "${responses[values]}"}`)
        i++

    }
    // console.log(questions)
}

function writeJSON(data) {
    createDocument(data)
    // console.log(documents)
    const myJSON = `
    {
        "kind":"SentimentAnalysis",
        "parameters":{
            "modelVersion":"latest",
            "opinionMining":"True"
        },
        "analysisInput":{
            "documents":[${documents}]
        }
    }
    `
    return myJSON
}


module.exports = writeJSON