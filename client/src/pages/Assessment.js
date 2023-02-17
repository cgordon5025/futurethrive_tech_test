import React, { useState, useContext, useEffect } from "react"
import { RecordWebcam, useRecordWebcam } from 'react-record-webcam';
import { SAVE_ANSWERS } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import VoiceContext from "../utils/VoiceContext";
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

function Assessment({ setCamStatus, setEndDisplay, setAssessmentDisplay, assessmentDisplay }) {
    const { voice, setVoice } = useContext(VoiceContext)
    const [currentQuestion, setCurrentQuestion] = useState(0)
    //these states will be used to trigger the contigency, if they respond yes it will flip to true and show the corresponding questions, if false it will skip it
    const [saveAns, { error, data }] = useMutation(SAVE_ANSWERS)
    // take this out later, this is for testing purposes
    const [formState, setFormState] = useState(
        {
            age: null,
            grade: null,
            liveWith: [],
            familyHelpDetails: [],
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
    console.log(voice)
    // console.log(formState)
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
    console.log(voice.voice)
    const synth = voice.synth
    const utterThis = new SpeechSynthesisUtterance(questions[currentQuestion].question);
    utterThis.rate = voice.rate;
    utterThis.voice = voice.voice;
    // console.log(formState)

    // useEffect(() => {
    //     synth.speak(utterThis)
    // }, [currentQuestion])

    // useEffect(() => {
    //     console.log("trigger")
    //     synth.speak(utterThis)
    // }, [assessmentDisplay == "block"])
    
    const handleChange = (event) => {
        // console.log("hey i be triggered")
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
        console.log(formState)
    }
    const handleSubmit = async (event) => {
        console.log("submitting")
        // const finalFormState = toObject(formState)
        // finalFormState.userId = "63e1645e690cc9d7fcf52bd0"
        try {
            const { data } = await saveAns({
                variables: {
                    userId: "63ea86c4fd9ddbf82469e45e",
                    ...formState
                }
            });
            console.log(data)
        } catch (error) {
            console.log(error)
        };
        setAssessmentDisplay("none")
        setEndDisplay("block")
        setCamStatus(true)
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
        // case 25:
        //     return (
        //         <TalentsQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} setAssessmentDisplay={setAssessmentDisplay} setEndDisplay={setEndDisplay} setCamStatus={setCamStatus} />
        //     )
        default:
            return (
                <div className='questionContainer'>
                    <div className='formContainer'>
                        <p>What are you really good at?</p>
                        <input
                            name='talents'
                            value={formState.talents}
                            onChange={handleChange}
                        />
                        <button style={{ marginTop: "2%" }} className='submitBtn' onClick={handleSubmit}>Complete</button>

                    </div>
                    <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
                </div>
            )
    }

}

export default Assessment