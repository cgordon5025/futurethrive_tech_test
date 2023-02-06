import React, { useState } from "react"




function Assessment() {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    //these states will be used to trigger the contigency, if they respond yes it will flip to true and show the corresponding questions, if false it will skip it
    const [deathInFamily, setDeathInFamily] = useState(false)
    const [sickInFamily, setSickInFamily] = useState(false)
    const [outsideHelp, setOutsideHelp] = useState(false)
    // console.log(questions.length)
    const [formState, setFormState] = useState({
        age: "",
        grade: "",
        liveWith: "",
        familyHelp: "",
        familyHelpDetails: "",
        outsideHelp: "",
        outsideDetails: "",
        recentDeath: "",
        whoDeath: "",
        sickFamily: "",
        whoSick: "",
        happyOrSad: "",
        whySad: "",
        whyHappy: "",
        beHappier: "",
        academics: "",
        schoolTrouble: "",
        schoolFriends: "",
        madeFunOf: "",
        hobbies: "",
        hobbiesStop: "",
        areWorried: "",
        whyWorried: "",
        makeLessWorry: "",
        greatestWorry: "",
        talents: ""
    });
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
            hint: ""
        },
        {
            index: 5,
            question: "Great who is it?",
            hint: ""
        },
        {
            index: 6,
            question: "How do you know them?",
            hint: ""
        },
        {
            index: 7,
            question: "Has anyone you love died?",
            hint: ""
        },
        {
            index: 8,
            question: "Who?",
            hint: ""
        },
        {
            index: 9,
            question: "Is anyone living in your house really sick?",
            hint: ""
        },
        {
            index: 10,
            question: "Who?",
            hint: ""
        },
        {
            index: 11,
            question: "Are you sad most of the time, happy most of the time, or in between?",
            hint: ""
        },
        {
            index: 12,
            question: "What makes you sad?",
            hint: ""
        },
        {
            index: 13,
            question: "What makes you happy?",
            hint: ""
        },
        {
            index: 14,
            question: "Are you making good grades in school?",
            hint: ""
        },
        {
            index: 15,
            question: "Are you getting in trouble in school?",
            hint: ""
        },
        {
            index: 16,
            question: "Do you have friends at school?",
            hint: ""
        },
        {
            index: 17,
            question: "Have any of your friends or classmates ever said or done anything that hurt your or make you feel bad?",
            hint: ""
        },
        {
            index: 18,
            question: "What do you really like to do?",
            hint: ""
        },
        {
            index: 19,
            question: "What stops you from doing that?",
            hint: ""
        },
        {
            index: 20,
            question: "Do you get worried?",
            hint: ""
        },
        {
            index: 21,
            question: "What makes you feel worried?",
            hint: ""
        },
        {
            index: 22,
            question: "If there was one thing in your life that you could change to make you feel less worried, what would it be?",
            hint: ""
        },
        {
            index: 23,
            question: "WHat is your greatest worry?",
            hint: ""
        },
        {
            index: 24,
            question: "What are you really good at?",
            hint: ""
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

    const handleProgression = (event) => {
        switch (currentQuestion) {
            case 4:
                if (outsideHelp == true) {
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
            default:
                const nextQuestion = currentQuestion + 1
                setCurrentQuestion(nextQuestion)
                // synth.speak(utterThis)
                console.log(`moving onto question ${nextQuestion}`)
                console.log(`${questions[currentQuestion].question}`)

        }
    }


    return (
        <div className="assessmentContainer">

            {/* need a plan b if the launched version does repeat twice, seems like it wont as its a dev tool */}
            {/* {synth.speak(utterThis)} */}
            <div className="questionContainer">
                <h2> {questions[currentQuestion].question}</h2>
                <form>
                    {currentQuestion == 4 || currentQuestion == 7 || currentQuestion == 9 || currentQuestion == 14 || currentQuestion == 15 || currentQuestion == 16 || currentQuestion == 17 || currentQuestion == 20 ?
                        (
                            <div>
                                <label>
                                    <input
                                        type="radio"
                                    />Yes
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                    />No
                                </label>
                            </div>

                        ) :
                        (

                            <input
                                name={questions[currentQuestion].name}
                                type="text"
                                // value={formState.{currentQuestion}}
                            />
                        )}
                </form>
                {/* <input></input> */}
                <button onClick={handleProgression}>Next </button>
                <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
            </div>
        </div >
    )
}
// import dog from '../../public/images/NEW_dog'

export default Assessment