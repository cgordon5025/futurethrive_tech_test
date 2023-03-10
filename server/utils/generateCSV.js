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
    var tempLiveWith = data.formState.liveWith;
    var liveWithStr = tempLiveWith.toString().replace(',', ' ')

    var tempRelyFam = data.formState.familyHelpDetails;
    var relyFamStr = tempRelyFam.toString().replace(',', ' ')

    ageField = `${data.userId},Age,${data.formState.age}`
    gradeField = `${data.userId},Grade,${data.formState.grade}`
    liveWithField = `${data.userId},Live With who,${liveWithStr}`
    familyField = `${data.userId},Family they can rely on,${relyFamStr}`;
    //this one should be processed further in case they put in commas, to remove them and replace with semi colons or something, commas will mess with the csv
    outsideHelpField = `${data.userId},People outside of family they can rely on,${data.formState.outsideDetails}`;
    outsideFamilyField = `${data.userId},How do you know these people,${data.formState.outsideDetails2}`
    recentDeathField = `${data.userId},Recent Death,${data.formState.whoDeath}`;
    familySickField = `${data.userId},Serious illness in family,${data.formState.whoSick}`;
    happySadField = `${data.userId},Are they more happy sad or somehwere in between,${data.formState.happyOrSad}`;
    whySadField = `${data.userId},What makes you sad,${data.formState.whySad}`;
    whyHappyField = `${data.userId},What makes you happy,${data.formState.whyHappy}`;
    beHappierField = `${data.userId},What could make you happier,${data.formState.beHappier}`;
    academicField = `${data.userId},Are you making good grades in school,${data.formState.academics}`;
    schoolTroubleField = `${data.userId},Are you getting in trouble in school,${data.formState.schoolTrouble}`
    friendsField = `${data.userId},Do you have friends at school,${data.formState.schoolFriends}`;
    madeFunOfField = `${data.userId},Have any of your friends or classmates ever said or done anything that hurt you or make you feel bad,${data.formState.madeFunOf}`
    hobbyField = `${data.userId},What do you really like to do,${data.formState.hobbies}`;
    stopHobbyField = `${data.userId},What stops you from doing that,${data.formState.hobbiesStop}`;
    worriedField = `${data.userId},What makes you worried,${data.formState.areWorried}`;
    whyWorriedField = `${data.userId},What makes you worried,${data.formState.whyWorried}`;
    lessWorriedField = `${data.userId},What could make you less worried,${data.formState.makeLessWorry}`;
    greatestWorryField = `${data.userId},What is your greatest worry,${data.formState.greatestWorry}`;
    talentField = `${data.userId},What are you really good at,${data.formState.talents}`

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
