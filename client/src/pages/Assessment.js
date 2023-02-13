import React, { useState } from "react"
import { RecordWebcam, useRecordWebcam } from 'react-record-webcam';



function Assessment() {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    //these states will be used to trigger the contigency, if they respond yes it will flip to true and show the corresponding questions, if false it will skip it
    const [deathInFamily, setDeathInFamily] = useState(false)
    const [sickInFamily, setSickInFamily] = useState(false)
    const [outsideHelp, setOutsideHelp] = useState(false)
    const [isWorried, setIsWorried] = useState(false)

    const [formState, setFormState] = useState([
        { age: "" },
        { grade: "" },
        { liveWith: "" },
        { familyHelp: "" },
        { familyHelpDetails: "" },
        { outsideHelp: "" },
        { outsideDetails: "" },
        { recentDeath: "" },
        { whoDeath: "" },
        { sickFamily: "" },
        { whoSick: "" },
        { happyOrSad: "" },
        { whySad: "" },
        { whyHappy: "" },
        { beHappier: "" },
        { academics: "" },
        { schoolTrouble: "" },
        { schoolFriends: "" },
        { madeFunOf: "" },
        { hobbies: "" },
        { hobbiesStop: "" },
        { areWorried: "" },
        { whyWorried: "" },
        { makeLessWorry: "" },
        { greatestWorry: "" },
        { talents: "" }
    ]);
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
            index: 3,
            question: "Is there someone in your family you can talk to if you need help? Yes or no?",
            hint: "Mom? Dad? Grandmother? Grandfather? Brother? Sister?",
            name: "familyHelp",
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
            name: "outsideDetails"
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
    const rate = .8;
    const synth = window.speechSynthesis;
    const voices = synth.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase();
        const bname = b.name.toUpperCase();

        if (aname < bname) {
            return -1;
        } else if (aname == bname) {
            return 0;
        } else {
            return +1;
        }
    });
    const daniel = voices[14];
    const utterThis = new SpeechSynthesisUtterance(questions[currentQuestion].question);
    utterThis.rate = rate;
    utterThis.voice = daniel;
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
        switch (currentQuestion) {
            case 4:
                name = "outsideHelp"
                setOutsideHelp(true)
                break;
            case 7:
                name = "recentDeath"
                setDeathInFamily(true)
                break;
            case 9:
                name = "familySick"
                setSickInFamily(true)
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
                setIsWorried(true)
                break;
        }
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
        console.log()
        switch (currentQuestion) {
            case 4:
                if (outsideHelp == true) {
                    // const tempObj = { "outsideHelp": true }
                    // setFormState({ ...formState, "outsideHelp": true })
                    // console.log(formState)
                    console.log("on the outside help questions")
                    const nextQuestion = currentQuestion + 1
                    setCurrentQuestion(nextQuestion)
                    break;
                } else {
                    //skip the next two questions to continue onwards
                    const nextQuestion = currentQuestion + 3
                    setCurrentQuestion(nextQuestion)
                    break;
                }
            case 7:
                if (deathInFamily) {
                    const nextQuestion = currentQuestion + 1
                    setCurrentQuestion(nextQuestion)
                    break;
                } else {
                    const nextQuestion = currentQuestion + 2
                    setCurrentQuestion(nextQuestion)
                    break;
                }
            case 9:
                if (sickInFamily) {
                    const nextQuestion = currentQuestion + 1
                    setCurrentQuestion(nextQuestion)
                    break;
                } else {
                    const nextQuestion = currentQuestion + 2
                    setCurrentQuestion(nextQuestion)
                    break;
                }
            case 21:
                if (isWorried) {
                    const nextQuestion = currentQuestion + 1
                    setCurrentQuestion(nextQuestion)
                    break;
                } else {
                    const nextQuestion = currentQuestion + 3
                    setCurrentQuestion(nextQuestion)
                    break;
                }
            default:
                const nextQuestion = currentQuestion + 1
                setCurrentQuestion(nextQuestion)
        }
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
    const handleSubmit = (event) => {
        var finalFormState = toObject(formState)
        console.log(finalFormState)
    }

    return (
        <div className="assessmentContainer">

            {/* need a plan b if the launched version does repeat twice, seems like it wont as its a dev tool */}
            {/* {synth.speak(utterThis)} */}
            <div className="questionContainer">
                <h2> {questions[currentQuestion].question}</h2>
                <form>
                    {currentQuestion == 4 || currentQuestion == 7 || currentQuestion == 9 || currentQuestion == 15 || currentQuestion == 16 || currentQuestion == 17 || currentQuestion == 18 || currentQuestion == 21 ?
                        (
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                        name={questions[currentQuestion].name}
                                        onChange={handleYes}
                                    />Yes
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name={questions[currentQuestion].name}

                                        onChange={handleNo}
                                    />No
                                </label>
                            </div>

                        ) :
                        (

                            <input
                                name={questions[currentQuestion].name}
                                type="text"
                                value={[Object.values(formState[currentQuestion])]}
                                onChange={handleChange}
                            />
                        )}
                </form>
                {/* <input></input> */}
                <button className="progressBtn" onClick={handleProgression}>Next </button>
                <button onClick={handleSubmit}>Submit</button>
                <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
            </div>
        </div >
    )
}
// import dog from '../../public/images/NEW_dog'

export default Assessment