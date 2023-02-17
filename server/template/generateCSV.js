// need to make exceptions for answers with commans so it does not mess up the csv formatting, for now go on ahead but will need to take this into consideration
var ageField
var gradeField
var liveWithField
var familyField
var outsideHelpField
var outsideFamilyField
var recentDeathField
var familySickField
var happySadField
var whySadField
var whyHappyField
var beHappierField
var academicField
var schoolTroubleField
var friendsField
var madeFunOfField
var hobbyField
var stopHobbyField
var worriedField
var whyWorriedField
var lessWorriedField
var greatestWorryField
var talentField
function popFields(data) {
    var tempLiveWith = data.liveWith;
    var liveWithStr = tempLiveWith.join(" ");

    var tempRelyFam = data.familyHelpDetails;
    var relyFamStr = tempRelyFam.join(" ");

    ageField = `${data.userId},Age,${data.age}`
    gradeField = `${data.userId},Grade,${data.grade}`
    liveWithField = `${data.userId},Live With who,${liveWithStr}`
    familyField = `${data.userId},Family they can rely on,${relyFamStr}`;
    outsideHelpField = `${data.userId},People outside of family they can rely on,${data.outsideDetails}`;
    outsideFamilyField = `${data.userId},How do you know these people,${data.outsideDetails2}`
    recentDeathField = `${data.userId},Recent Death,${data.whoDeath}`;
    familySickField = `${data.userId},Serious illness in family,${data.whoSick}`;
    happySadField = `${data.userId},Are they more happy sad or somehwere in between,${data.happyOrSad}`;
    whySadField = `${data.userId},What makes you sad,${data.whySad}`;
    whyHappyField = `${data.userId},What makes you happy,${data.whyHappy}`;
    beHappierField = `${data.userId},What could make you happier,${data.beHappier}`;
    academicField = `${data.userId},Are you making good grades in school,${data.academics}`;
    schoolTroubleField = `${data.userId},Are you getting in trouble in school,${data.schoolTrouble}`
    friendsField = `${data.userId},Do you have friends at school,${data.schoolFriends}`;
    madeFunOfField = `${data.userId},Have any of your friends or classmates ever said or done anything that hurt you or make you feel bad,${data.madeFunOf}`
    hobbyField = `${data.userId},What do you really like to do,${data.hobbies}`;
    stopHobbyField = `${data.userId},What stops you from doing that,${data.hobbiesStop}`;
    worriedField = `${data.userId},What makes you worried,${data.areWorried}`;
    whyWorriedField = `${data.userId},What makes you worried,${data.whyWorried}`;
    lessWorriedField = `${data.userId},What could make you less worried,${data.makeLessWorry}`;
    greatestWorryField = `${data.userId},What is your greatest worry,${data.greatestWorry}`;
    talentField = `${data.userId},What are you really good at,${data.talents}`

}


function generateCSV(data) {
    console.log(data)
    popFields(data)
    const myCSV = `
    userId,question,response
    ${ageField}
    ${gradeField}
    ${liveWithField}
    ${familyField}
    ${outsideHelpField}
    ${recentDeathField}
    ${familySickField}
    ${happySadField}
    ${whySadField}
    ${whyHappyField}
    ${beHappierField}
    ${academicField}
    ${schoolTroubleField}
    ${friendsField}
    ${madeFunOfField}
    ${hobbyField}
    ${stopHobbyField}
    ${worriedField}
    ${whyWorriedField}
    ${lessWorriedField}
    ${greatestWorryField}
    ${talentField}

    `;
    return myCSV
}

module.exports = generateCSV
