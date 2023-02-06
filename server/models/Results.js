const { Schema, model } = require('mongoose')

//lets put the notes here so it doesn't interfere with the model itself, have had issues in the past
// liveWith will be a String, so that when we store the data it will be w/ parents, gparents etc.
//if we only getting verbal answers in this version this is just a reduction of it, and a framework to reference, it will hold no data
// if we are getting some text/user interactivity it will be filled with data

const ResultsSchema = new Schema({
    age: {
        type: String,
    },
    grade: {
        type: String
    },
    liveWith: {
        type: String
    },
    familyHelp: {
        type: Boolean
    },
    familyHelpDetails: {
        type: String
    },
    outsideHelp: {
        type: Boolean
    },
    outsideDetails: {
        type: String
    },
    recentDeath: {
        type: Boolean
    },
    whoDeath: {
        type: String
    },
    sickFamily: {
        type: Boolean
    },
    whoSick: {
        type: String
    },
    happyOrSad: {
        type: String
    },
    whySad: {
        type: String
    },
    whyHappy: {
        type: String
    },
    beHappier: {
        type: String
    },
    academics: {
        type: Boolean
    },
    schoolTrouble: {
        type: Boolean
    },
    schoolFriends: {
        type: Boolean
    },
    madeFunOf: {
        type: Boolean
    },
    hobbies: {
        type: String
    },
    hobbiesStop: {
        type: String
    },
    areWorried: {
        type: Boolean
    },
    whyWorried: {
        type: String
    },
    makeLessWorry: {
        type: String
    },
    greatestWorry: {
        type: String
    },
    talents: {
        type: String
    }
});

const Results = model('Results', ResultsSchema);

module.exports = Results;