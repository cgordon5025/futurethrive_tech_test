import React, { useState } from "react"
import { RecordWebcam, useRecordWebcam } from 'react-record-webcam';
import { SAVE_ANSWERS } from "../utils/mutations";
import { useMutation } from "@apollo/client";
//lets import all of the components for the questions
import AgeQuestion from "../components/00AgeQuestion";
import GradeQuestion from "../components/01GradeQuestion";
import LiveWithQuestion from "../components/02LiveWithQuestion";
import FamilyHelpQuestion from "../components/03FamilyHelpQuestion";
import OutsideHelpQuestion from "../components/04OutsideHelpQuestion";
import OutsideHelpWhoQuestion from "../components/05OutsideHelpWhoQuestion";
import OutsideHelpHowQuestion from "../components/06OutsideHelpHowQuestion";
import RecentDeathQuestion from "../components/07RecentDeathQuestion";
import WhoDeathQuestion from "../components/08WhoDeathQuestion";
import SickFamilyQuestion from "../components/09SickFamilyQuestion";
import WhoSickQuestion from "../components/10WhoSickQuestion";
import HappyOrSadQuestion from "../components/11HappyOrSadQuestion";
import WhySadQuestion from "../components/12WhySadQuestion";
import WhyHappyQuestion from "../components/13WhyHappyQuestion";
import BeHappierQuestion from "../components/14BeHappierQuestion";
import AcademicsQuestion from "../components/15AcadmicsQuestion";
import SchoolTroubleQuestion from "../components/16SchoolTroubleQuestion";
import SchoolSocialQuestion from "../components/17SchoolSocialQuestion";
import MadeFunOfQuestion from "../components/18MadeFunOfQuestion";
import HobbiesQuestion from "../components/19HobbiesQuestion";
import HobbiesStopQuestion from "../components/20HobbiesStopQuestion";
import AreWorriedQuestion from "../components/21AreWorriedQuestion";
import WhyWorriedQuestion from "../components/22WhyWorriedQuestion";
import MakeLessWorriedQuestion from "../components/23MakeLessWorriedQuestion";
import GreatestWorryQuestion from "../components/24GreatestWorryQuestion";
import TalentsQuestion from "../components/25TalentQuestion";

function Assessment({ setCamStatus, setEndDisplay, setAssessmentDisplay }) {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    //these states will be used to trigger the contigency, if they respond yes it will flip to true and show the corresponding questions, if false it will skip it
    const [saveAns, { error, data }] = useMutation(SAVE_ANSWERS)
    // take this out later, this is for testing purposes
    const [formState, setFormState] = useState(
        {
            age: null,
            grade: null,
            liveWith: null,
            familyHelpDetails: null,
            outsideHelp: null,
            outsideDetails: null,
            outsideDetails2: null,
            recentDeath: null,
            whoDeath: null,
            sickFamily: null,
            whoSick: null,
            happyOrSad: null,
            whySad: null,
            whyHappy: null,
            beHappier: null,
            academics: null,
            schoolTrouble: null,
            schoolFriends: null,
            madeFunOf: null,
            hobbies: null,
            hobbiesStop: null,
            areWorried: null,
            whyWorried: null,
            makeLessWorry: null,
            greatestWorry: null,
            talents: null
        }
    );
    console.log(formState)
    //here are the questions and data associated with it
    const questions = [
        {
            index: 0,
            question: "How old are you?",
            hint: "",
            name: "age",
        },
        {
            index: 1,
            question: "What grade are you in?",
            hint: "",
            name: "grade",
        },
        {
            index: 2,
            question: "Who do you live with?",
            hint: "Mom, dad, Grandparents?",
            name: "liveWith",
        },
        {
            index: 3,//make this have choices so they can select mom dad brother sister
            question: "Who can you talk to in your family if you need help?",
            hint: ["Mom", "Dad", "Grandmother", "Grandfather", "Brother", "Sister"],
            name: "familyHelpDetails",
        },
        {
            index: 4,
            question: `Are there people outside your family you "talk to" when you need help?`,
            hint: "",
            name: "outsideHelp"
        },
        {
            index: 5,
            question: "Great who is it?",
            hint: "",
            name: "outsideDetails"
        },
        {
            index: 6,
            question: "How do you know them?",
            hint: "",
            name: "outsideDetails2"
        },
        {
            index: 7,
            question: "Has anyone you love died?",
            hint: "",
            name: "recentDeath"
        },
        {
            index: 8,
            question: "Who?",
            hint: "",
            name: "whoDeath"
        },
        {
            index: 9,
            question: "Is anyone living in your house really sick?",
            hint: "",
            name: "sickFamily"
        },
        {
            index: 10,
            question: "Who?",
            hint: "",
            name: "whoSick"
        },
        {
            index: 11,
            question: "Are you sad most of the time, happy most of the time, or in between?",
            hint: "",
            name: "happyOrSad"
        },
        {
            index: 12,
            question: "What makes you sad?",
            hint: "",
            name: "whySad"
        },
        {
            index: 13,
            question: "What makes you happy?",
            hint: "",
            name: "whyHappy"
        },
        {
            index: 14,
            question: "What could make you even happier?",
            hint: "",
            name: "beHappier"
        },
        {
            index: 15,
            question: "Are you making good grades in school?",
            hint: "",
            name: "academics"
        },
        {
            index: 16,
            question: "Are you getting in trouble in school?",
            hint: "",
            name: "schoolTrouble"
        },
        {
            index: 17,
            question: "Do you have friends at school?",
            hint: "",
            name: "schoolFriends"
        },
        {
            index: 18,
            question: "Have any of your friends or classmates ever said or done anything that hurt your or make you feel bad?",
            hint: "",
            name: "madeFunOf"
        },
        {
            index: 19,
            question: "What do you really like to do?",
            hint: "",
            name: "hobbies"
        },
        {
            index: 20,
            question: "What stops you from doing that?",
            hint: "",
            name: "hobbiesStop"
        },
        {
            index: 21,
            question: "Do you get worried?",
            hint: "",
            name: "areWorried"
        },
        {
            index: 22,
            question: "What makes you feel worried?",
            hint: "",
            name: "whyWorried"
        },
        {
            index: 23,
            question: "If there was one thing in your life that you could change to make you feel less worried, what would it be?",
            hint: "",
            name: "makeLessWorry"
        },
        {
            index: 24,
            question: "What is your greatest worry?",
            hint: "",
            name: "greatestWorry"
        },
        {
            index: 25,
            question: "What are you really good at?",
            hint: "",
            name: "talents"
        }
    ]
    //setting up the voice reader
    // const rate = .8;
    // const synth = window.speechSynthesis;
    // const voices = synth.getVoices().sort(function (a, b) {
    //     const aname = a.name.toUpperCase();
    //     const bname = b.name.toUpperCase();

    //     if (aname < bname) {
    //         return -1;
    //     } else if (aname == bname) {
    //         return 0;
    //     } else {
    //         return +1;
    //     }
    // });
    // const daniel = voices[14];
    // const utterThis = new SpeechSynthesisUtterance(questions[currentQuestion].question);
    // utterThis.rate = rate;
    // utterThis.voice = daniel;
    // console.log(formState)
    function toObject(arr) {
        var rv = {};
        for (const index in arr) {
            var key = Object.keys(arr[index])
            var value = Object.values(arr[index])
            rv = { ...rv, [key]: value[0] }
        }
        return rv
    }
    const handleYes = (event) => {
        var value
        if (event.target.value == "on") {
            value = true
        }
        // const value = event.target.value
        console.log(value)
        var name;
        console.log(currentQuestion)
        // switch (currentQuestion) {
        //     case 4:
        //         name = "outsideHelp"
        //         setOutsideHelp(true)
        //         break;
        //     case 7:
        //         name = "recentDeath"
        //         setDeathInFamily(true)
        //         break;
        //     case 9:
        //         name = "familySick"
        //         setSickInFamily(true)
        //         break;
        //     case 15:
        //         name = "academics"
        //         break;
        //     case 16:
        //         name = "schoolTrouble"
        //         break;
        //     case 17:
        //         name = "schoolFriends"
        //         break;
        //     case 18:
        //         name = "madeFunOf"
        //         break;
        //     case 21:
        //         name = "areWorried"
        //         setIsWorried(true)
        //         break;
        // }
        setFormState({
            ...formState, [currentQuestion]: { [name]: value }
        })
    }
    const handleNo = (event) => {
        var value
        if (event.target.value == "on") {
            value = false
        }
        var name;
        switch (currentQuestion) {
            case 4:
                name = "outsideHelp"
                break;
            case 7:
                name = "recentDeath"
                break;
            case 9:
                name = "familySick"
                break;
            case 15:
                name = "academics"
                break;
            case 16:
                name = "schoolTrouble"
                break;
            case 17:
                name = "schoolFriends"
                break;
            case 18:
                name = "madeFunOf"
                break;
            case 21:
                name = "areWorried"
                break;
        }
        setFormState({
            ...formState, [currentQuestion]: { [name]: value }
        })
    }
    const handleProgression = (event) => {
        console.log("hey hey you clicked me")
        // switch (currentQuestion) {
        //     case 4:
        //         if (outsideHelp == true) {
        //             // const tempObj = { "outsideHelp": true }
        //             // setFormState({ ...formState, "outsideHelp": true })
        //             // console.log(formState)
        //             console.log("on the outside help questions")
        //             const nextQuestion = currentQuestion + 1
        //             setCurrentQuestion(nextQuestion)
        //             break;
        //         } else {
        //             //skip the next two questions to continue onwards
        //             const nextQuestion = currentQuestion + 3
        //             setCurrentQuestion(nextQuestion)
        //             break;
        //         }
        //     case 7:
        //         if (deathInFamily) {
        //             const nextQuestion = currentQuestion + 1
        //             setCurrentQuestion(nextQuestion)
        //             break;
        //         } else {
        //             const nextQuestion = currentQuestion + 2
        //             setCurrentQuestion(nextQuestion)
        //             break;
        //         }
        //     case 9:
        //         if (sickInFamily) {
        //             const nextQuestion = currentQuestion + 1
        //             setCurrentQuestion(nextQuestion)
        //             break;
        //         } else {
        //             const nextQuestion = currentQuestion + 2
        //             setCurrentQuestion(nextQuestion)
        //             break;
        //         }
        //     case 21:
        //         if (isWorried) {
        //             const nextQuestion = currentQuestion + 1
        //             setCurrentQuestion(nextQuestion)
        //             break;
        //         } else {
        //             const nextQuestion = currentQuestion + 3
        //             setCurrentQuestion(nextQuestion)
        //             break;
        //         }
        //     default:
        //         const nextQuestion = currentQuestion + 1
        //         setCurrentQuestion(nextQuestion)
        // }
    }
    const handleChange = (event) => {
        // console.log("hey i be triggered")
        const index = currentQuestion
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [index]: { [name]: value }
        })
        console.log(formState)
    }
    const handleSubmit = async (event) => {
        console.log("submitting")
        const finalFormState = toObject(formState)
        // finalFormState.userId = "63e1645e690cc9d7fcf52bd0"
        console.log({ ...finalFormState })
        try {
            const { data } = await saveAns({
                variables: {
                    userId: "63ea86c4fd9ddbf82469e45e",
                    ...finalFormState
                }
            });
            console.log(data)
        } catch (error) {
            console.log(error)
        };
        setAssessmentDisplay("none")
        setEndDisplay("block")
        setCamStatus(true)
        // setFormState([
        //     { age: "" },
        //     { grade: "" },
        //     { liveWith: "" },
        //     { familyHelp: "" },
        //     { familyHelpDetails: "" },
        //     { outsideHelp: "" },
        //     { outsideDetails: "" },
        //     { recentDeath: "" },
        //     { whoDeath: "" },
        //     { sickFamily: "" },
        //     { whoSick: "" },
        //     { happyOrSad: "" },
        //     { whySad: "" },
        //     { whyHappy: "" },
        //     { beHappier: "" },
        //     { academics: "" },
        //     { schoolTrouble: "" },
        //     { schoolFriends: "" },
        //     { madeFunOf: "" },
        //     { hobbies: "" },
        //     { hobbiesStop: "" },
        //     { areWorried: "" },
        //     { whyWorried: "" },
        //     { makeLessWorry: "" },
        //     { greatestWorry: "" },
        //     { talents: "" }
        // ]);
    }
    switch (currentQuestion) {
        case 0:
            return (
                <AgeQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 1:
            return (
                <GradeQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 2:
            return (
                <LiveWithQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 3:
            return (
                <FamilyHelpQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 4:
            return (
                <OutsideHelpQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 5:
            return (
                <OutsideHelpWhoQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 6:
            return (
                <OutsideHelpHowQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 7:
            return (
                <RecentDeathQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 8:
            return (
                <WhoDeathQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 9:
            return (
                <SickFamilyQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 10:
            return (
                <WhoSickQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 11:
            return (
                <HappyOrSadQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 12:
            return (
                <WhySadQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 13:
            return (
                <WhyHappyQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 14:
            return (
                <BeHappierQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 15:
            return (
                <AcademicsQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 16:
            return (
                <SchoolTroubleQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 17:
            return (
                <SchoolSocialQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 18:
            return (
                <MadeFunOfQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 19:
            return (
                <HobbiesQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 20:
            return (
                <HobbiesStopQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 21:
            return (
                <AreWorriedQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 22:
            return (
                <WhyWorriedQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 23:
            return (
                <MakeLessWorriedQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 24:
            return (
                <GreatestWorryQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 25:
            return (
                <TalentsQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} setAssessmentDisplay={setAssessmentDisplay} setEndDisplay={setEndDisplay} setCamStatus={setCamStatus} />
            )

    }
    // return (
    //     <div className="assessmentContainer">

    //         {/* need a plan b if the launched version does repeat twice, seems like it wont as its a dev tool */}
    //         {/* {synth.speak(utterThis)} */}
    //         <div className="questionContainer">
    //             <h2> {questions[currentQuestion].question}</h2>
    //             <form>
    //                 {currentQuestion == 4 || currentQuestion == 7 || currentQuestion == 9 || currentQuestion == 15 || currentQuestion == 16 || currentQuestion == 17 || currentQuestion == 18 || currentQuestion == 21 ?
    //                     (
    //                         <div>
    //                             <label>
    //                                 <input
    //                                     type="radio"
    //                                     name={questions[currentQuestion].name}
    //                                     onChange={handleYes}
    //                                 />Yes
    //                             </label>
    //                             <label>
    //                                 <input
    //                                     type="radio"
    //                                     name={questions[currentQuestion].name}

    //                                     onChange={handleNo}
    //                                 />No
    //                             </label>
    //                         </div>

    //                     ) :
    //                     (
    //                         <input
    //                             name={questions[currentQuestion].name}
    //                             type="text"
    //                             value={[Object.values(formState[currentQuestion])]}
    //                             onChange={handleChange}
    //                         />
    //                     )}
    //             </form>
    //             {/* <input></input> */}
    //             {currentQuestion < 25 ?
    //                 (
    //                     <>
    //                         <button className="progressBtn" onClick={handleProgression}>Next </button>
    //                         <button style={{ marginTop: "10%" }} onClick={handleSubmit}>Submit</button>
    //                     </>

    //                 ) : (
    //                     <button style={{ marginTop: "10%" }} onClick={handleSubmit}>Submit</button>
    //                 )}
    //             <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
    //         </div>
    //     </div >
    // )
}
// import dog from '../../public/images/NEW_dog'

export default Assessment