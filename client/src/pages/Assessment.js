import React, { useState, useContext, useEffect } from "react"
import { RecordWebcam, useRecordWebcam } from 'react-record-webcam';
import { SAVE_ANSWERS } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { useTts } from 'tts-react';
import { TextToSpeech } from "tts-react";
import UserContext from "../utils/UserContext";
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

function Assessment({ readFirstQ, setCamStatus, setEndDisplay, setAssessmentDisplay, assessmentDisplay }) {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const showButton = readFirstQ
    const [buttonDisplay, setButtonDisplay] = useState("none")
    const [saveLiveWith, setSaveLiveWith] = useState({
        mother: false,
        father: false,
        grandmother: false,
        grandfather: false,
        brother: false,
        sister: false

    })
    const [saveRelyFam, setSaveRelyFam] = useState({
        mother: false,
        father: false,
        grandmother: false,
        grandfather: false,
        brother: false,
        sister: false

    })
    const [yesNoChecked, setYesNoChecked] = useState({
        outsideHelp: {
            yes: false,
            no: false
        },
        recentDeath: {
            yes: false,
            no: false
        },
        sickFamily: {
            yes: false,
            no: false
        },
        happyOrSad: {
            happy: false,
            sad: false,
            inbetween: false
        },
        academics: {
            yes: false,
            no: false
        },
        schoolTrouble: {
            yes: false,
            no: false
        },
        schoolFriends: {
            yes: false,
            no: false
        },
        madeFunOf: {
            yes: false,
            no: false
        },
        areWorried: {
            yes: false,
            no: false
        }
    })
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
    //here are the questions and data associated with it
    const questions = [
        {
            index: 0,
            question: "How old are you?",
        },
        {
            index: 1,
            question: "What grade are you in?",
        },
        {
            index: 2,
            question: "Who do you live with?",
        },
        {
            index: 3,//make this have choices so they can select mom dad brother sister
            question: "Who can you talk to in your family if you need help?",
        },
        {
            index: 4,
            question: `Are there people outside your family you "talk to" when you need help?`,
        },
        {
            index: 5,
            question: "Great who is it?",
        },
        {
            index: 6,
            question: "How do you know them?",
        },
        {
            index: 7,
            question: "Has anyone you love died?",
        },
        {
            index: 8,
            question: "Who?",
        },
        {
            index: 9,
            question: "Is anyone living in your house really sick?",
        },
        {
            index: 10,
            question: "Who?",
        },
        {
            index: 11,
            question: "Are you sad most of the time, happy most of the time, or in between?",
        },
        {
            index: 12,
            question: "What makes you sad?",
        },
        {
            index: 13,
            question: "What makes you happy?",
        },
        {
            index: 14,
            question: "What could make you even happier?",
        },
        {
            index: 15,
            question: "Are you making good grades in school?",
        },
        {
            index: 16,
            question: "Are you getting in trouble in school?",
        },
        {
            index: 17,
            question: "Do you have friends at school?",
        },
        {
            index: 18,
            question: "Have any of your friends or classmates ever said or done anything that hurt your or make you feel bad?",
        },
        {
            index: 19,
            question: "What do you really like to do?",
        },
        {
            index: 20,
            question: "What stops you from doing that?",
        },
        {
            index: 21,
            question: "Do you get worried?",
        },
        {
            index: 22,
            question: "What makes you feel worried?",
        },
        {
            index: 23,
            question: "If there was one thing in your life that you could change to make you feel less worried, what would it be?",
        },
        {
            index: 24,
            question: "What is your greatest worry?",
        },
        {
            index: 25,
            question: "What are you really good at?",
        }
    ]
    //userContext
    const { user } = useContext(UserContext)
    const userId = user._id
    //setting up the voice reader
    const rate = .9;
    const synth = window.speechSynthesis;
    //for this we would want to build out a version for every device, when i launch this try and see if it will work on a chrome book, and if the same voice exist, that is our target device at the moment anyways
    //long term look into safari, chrome, firefox, edge and maybe devices (unfortunately there is no true way to control this :())
    const primaryVoice = synth.getVoices().filter((voice) => voice.voiceURI == 'Google UK English Male');
    //as a backup we will just grab the first version in the device that is in Great British english, there is just so much variety in the voices, cannot standardize it
    const backupVoice = synth.getVoices().filter((voice) => voice.lang == 'en-GB');
    const voices = []
    if (primaryVoice !== null) {
        voices.push(...primaryVoice)
    }
    if (backupVoice !== null) {
        voices.push(...backupVoice)
    }
    const finalVoice = voices[0]
    const utterThis = new SpeechSynthesisUtterance(questions[currentQuestion].question);
    utterThis.rate = rate;
    console.log("final voice", finalVoice)
    //weird load error
    utterThis.voice = finalVoice;
    //this is the use effect that will enable the button timeout for the last question
    useEffect(() => {
        if (currentQuestion == 25) {
            setTimeout(() => {
                setButtonDisplay("block")
            }, 3000)
        }
    }, [currentQuestion])
    useEffect(() => {

        synth.speak(utterThis)
    }, [currentQuestion]) //this should only run if the index number changes

    useEffect(() => {
        synth.speak(utterThis)
    }, [readFirstQ])

    const questionNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    const finalTextNode = []
    const highLight = () => {
        let realNode = questionNodes.nextNode();
        while (realNode) {
            if (realNode.textContent.includes("?")) {
                finalTextNode.push(realNode)
            }
            realNode = questionNodes.nextNode()
        }
        const finalWords = []
        for (const textNode of finalTextNode) {
            for (const word of textNode.textContent.matchAll(/[a-zA-Z]+/g)) {
                finalWords.push({
                    word: word[0],
                    parentNode: textNode,
                    offset: word.index
                });
            }
        }
        let index = 0;
        const range = new Range();
        const highLight = setInterval(() => {
            if (currentQuestion == 25) {
                if (index >= finalWords.length) {
                    document.getSelection().removeAllRanges();
                    clearInterval(highLight)
                } else {
                    const { word, parentNode, offset } = finalWords[index];
                    range.setStart(parentNode, offset);
                    range.setEnd(parentNode, offset + word.length);
                    document.getSelection().removeAllRanges();
                    document.getSelection().addRange(range);
                    index++;
                }
            }
        }, 200);
    }
    useEffect(() => {
        highLight()
    }, [currentQuestion])

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
    }
    const handleSubmit = async (event) => {
        await fetch(`http://localhost:3001/api/results`, {
            method: 'POST',
            body: JSON.stringify({
                userId,
                formState
            }
            ),
            headers: {
                'content-type': 'application/json'
            }
        })

        // setAssessmentDisplay("none")
        // setEndDisplay("block")
        // setCamStatus(true)
    }
    const handleRegression = () => {
        const prevQuestion = currentQuestion - 1
        setCurrentQuestion(prevQuestion)
    }
    switch (currentQuestion) {
        case 0:
            return (
                <AgeQuestion showButton={showButton} readFirstQ={readFirstQ} formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 1:
            return (
                <GradeQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 2:
            return (
                <LiveWithQuestion saveLiveWith={saveLiveWith} setSaveLiveWith={setSaveLiveWith} formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 3:
            return (
                <FamilyHelpQuestion saveRelyFam={saveRelyFam} setSaveRelyFam={setSaveRelyFam} formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 4:
            return (
                <OutsideHelpQuestion yesNoChecked={yesNoChecked} setYesNoChecked={setYesNoChecked} formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
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
                <RecentDeathQuestion yesNoChecked={yesNoChecked} setYesNoChecked={setYesNoChecked} formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 8:
            return (
                <WhoDeathQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 9:
            return (
                <SickFamilyQuestion yesNoChecked={yesNoChecked} setYesNoChecked={setYesNoChecked} formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 10:
            return (
                <WhoSickQuestion formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 11:
            return (
                <HappyOrSadQuestion yesNoChecked={yesNoChecked} setYesNoChecked={setYesNoChecked} formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
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
                <AcademicsQuestion yesNoChecked={yesNoChecked} setYesNoChecked={setYesNoChecked} formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 16:
            return (
                <SchoolTroubleQuestion yesNoChecked={yesNoChecked} setYesNoChecked={setYesNoChecked} formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 17:
            return (
                <SchoolSocialQuestion yesNoChecked={yesNoChecked} setYesNoChecked={setYesNoChecked} formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
            )
        case 18:
            return (
                <MadeFunOfQuestion yesNoChecked={yesNoChecked} setYesNoChecked={setYesNoChecked} formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
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
                <AreWorriedQuestion yesNoChecked={yesNoChecked} setYesNoChecked={setYesNoChecked} formState={formState} setCurrentQuestion={setCurrentQuestion} setFormState={setFormState} currentQuestion={currentQuestion} />
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
                        <button style={{ display: buttonDisplay, marginTop: "2%" }} className='submitBtn' onClick={handleSubmit}>Complete</button>
                        <button style={{ display: buttonDisplay }} className='regressBtn' onClick={handleRegression}>Back</button>
                    </div>
                    <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
                </div>
            )
    }

}

export default Assessment