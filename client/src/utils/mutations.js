import { gql } from "@apollo/client";

export const SAVE_ANSWERS = gql`
mutation SaveAnswers($grade: String!, $age: String!, $liveWith: String, $familyHelp: Boolean, $familyHelpDetails: String, $outsideHelp: Boolean, $recentDeath: Boolean, $outsideDetails: String, $whoDeath: String, $userId: ID!, $sickFamily: Boolean, $whoSick: String, $happyOrSad: String, $whySad: String, $whyHappy: String, $beHappier: String, $schoolTrouble: Boolean, $academics: Boolean, $schoolFriends: Boolean, $hobbies: String, $madeFunOf: Boolean, $hobbiesStop: Boolean, $areWorried: Boolean, $whyWorried: String, $makeLessWorry: String, $greatestWorry: String, $talents: String) {
    saveAnswers(grade: $grade, age: $age, liveWith: $liveWith, familyHelp: $familyHelp, familyHelpDetails: $familyHelpDetails, outsideHelp: $outsideHelp, recentDeath: $recentDeath, outsideDetails: $outsideDetails, whoDeath: $whoDeath, userId: $userId, sickFamily: $sickFamily, whoSick: $whoSick, happyOrSad: $happyOrSad, whySad: $whySad, whyHappy: $whyHappy, beHappier: $beHappier, schoolTrouble: $schoolTrouble, academics: $academics, schoolFriends: $schoolFriends, hobbies: $hobbies, madeFunOf: $madeFunOf, hobbiesStop: $hobbiesStop, areWorried: $areWorried, whyWorried: $whyWorried, makeLessWorry: $makeLessWorry, greatestWorry: $greatestWorry, talents: $talents) {
      _id
      age
      grade
      liveWith
      familyHelp
      familyHelpDetails
      outsideHelp
      outsideDetails
      recentDeath
      whoDeath
      sickFamily
      whoSick
      happyOrSad
      whySad
      whyHappy
      beHappier
      academics
      schoolTrouble
      schoolFriends
      madeFunOf
      hobbies
      hobbiesStop
      areWorried
      whyWorried
      makeLessWorry
      greatestWorry
      talents
    }
  }`