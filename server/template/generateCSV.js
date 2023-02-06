
var ageField
var gradeField
var liveWithField
var familyField
var outsideHelpField
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
var lessWorriedField
var greatestWorryField
var talentField
function popFields(data) {
    if (data.age) {
        ageField = `${data.userId},Age,${data.age}`
    }
    if (data.grade) {
        gradeField = `${data, userId},Grade,${data.grade}`
    }
    if (data.liveWith) {
        liveWithField = `${data, userId},Live With who,${data.liveWith}`
    }
    if (data.familyHelp) {
        familyField = `${data.userId},Family they can rely on,${data.familyHelpDetails}`;
    }
    if (data.outsideHelp) {
        outsideHelpField = `${data.userId},People outside of family they can rely on,${data.outsideDetails}`;
    }
    if (data.recentDeath) {
        recentDeathField = `${data.userId},Recent Death,${data.whoDeath}`;
    }
    if (data.sickFamily) {
        familySickField = `${data.userId},Serious illness in family,${data, whoSick}`;
    }
    if (data.happyOrSad) {
        happySadField = `${data.userId},Are they more happy, sad, or somehwere in between,${data.happyOrSad}`;
    }
    if (data.whySad) {
        whySadField = `${data.userId},What makes you sad,${data.whySad}`;
    }
    if (data.whyHappy) {
        whyHappyField = `${data.userId},What makes you happy,${data.whyHappy}`;
    }
    if (data.beHappier) {
        beHappierField = `${data.userId},What could make you happier,${data.beHappier}`;
    }
    if (data.academics) {
        academicField = `${data.userId},Are you making good grades in school,${data.academics}`;
    }
    if (data.schoolTrouble) {
        schoolTroubleField = `${data.userId},Are you getting in trouble in school,${data.schoolTrouble}`
    }
    if (data.schoolFriends) {
        friendsField = `${data.userId},Do you have friends at school,${data.schoolFriends}`;
    }
    if (data.madeFunOf) {
        madeFunOfField = `${data.userId},Have any of your friends or classmates ever said or done anything that hurt you or make you feel bad,${data.madeFunOf}`
    }
    if (data.hobbies) {
        hobbyField = `${data.userId},What do you really like to do,${data.hobbies}`;
    }
    if (data.hobbiesStop) {
        stopHobbyField = `${data.userId},What stops you from doing that,${data.hobbiesStop}`;
    }
    if (data.areWorried) {
        worriedField = `${data.userId},What makes you worried,${data.whyWorried}`;
    }
    if (data.makeLessWorry) {
        lessWorriedField = `${data.userId},What could make you less worried,${data.makeLessWorry}`;
    }
    if (data.greatestWorry) {
        greatestWorryField = `${data.userId},What is your greatest worry,${data.greatestWorry}`;
    }
    if (data.talents) {
        talentField = `${data.userId},What are you really good at,${data.talents}`
    }
}


function generateCSV(data) {
    console.log(data)
    popFields(data)
    const myCSV = `
    userId,question,response/n
    ${ageField}/n
    ${gradeField}/n
    ${liveWithField}/n
    ${familyField}/n
    ${outsideHelpField}/n
    ${recentDeathField}/n
    ${familySickField}/n
    ${happySadField}/n
    ${whySadField}/n
    ${whyHappyField}/n
    ${beHappierField}/n
    ${academicField}/n
    ${schoolTroubleField}/n
    ${friendsField}/n
    ${madeFunOfField}/n
    ${hobbyField}/n
    ${stopHobbyField}/n
    ${worriedField}/n
    ${lessWorriedField}/n
    ${greatestWorryField}/n
    ${talentField}/n

    `;
    return myCSV
}

module.exports = generateCSV
