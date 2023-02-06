const { gql } = require('apollo-server-express')


const typeDefs = gql`
type User{
    _id:ID
    username:String
    password:String
    results:[Results],
    video:[Video]
}

type Results{
    _id:ID
    age:String
    grade: String
    liveWith: String
    familyHelp: Boolean
    familyHelpDetails: String
    outsideHelp: Boolean
    outsideDetails: String
    recentDeath: Boolean
    whoDeath: String
    sickFamily: Boolean
    whoSick: String
    happyOrSad: String
    whySad: String
    whyHappy: String
    beHappier: String
    academics:Boolean
    schoolTrouble: Boolean
    schoolFriends: Boolean
    madeFunOf: Boolean
    hobbies: String
    hobbiesStop: Boolean
    areWorried: Boolean
    whyWorried: String
    makeLessWorry: String
    greatestWorry: String
    talents: String
}

type Video{
    _id:ID
    videofile:String
}

type Auth{
    token:ID!
    user:User
}

type Query{
    getUsers:[User]
    getUser(id:ID):User
}

type Mutation{
    saveAnswers(userId:ID!,age:String!,grade: String!,liveWith: String,familyHelp: Boolean, familyHelpDetails: String,outsideHelp: Boolean,outsideDetails: String,recentDeath: Boolean,whoDeath: String,sickFamily: Boolean,whoSick: String,happyOrSad: String,whySad: String,whyHappy: String,beHappier: String,academics:Boolean,schoolTrouble: Boolean,schoolFriends: Boolean,madeFunOf: Boolean,hobbies: String,hobbiesStop: Boolean,areWorried: Boolean,whyWorried: String,makeLessWorry: String,greatestWorry:String,talents: String):Results
    login(username:String,password:String!):Auth
    saveVideo(userId:ID!,videofile:String):Video
}

`;

// not sure about the videofile type, will need to test and change

module.exports = typeDefs;