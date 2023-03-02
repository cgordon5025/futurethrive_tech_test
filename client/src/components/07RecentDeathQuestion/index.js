import React, { useState, useEffect } from 'react'

const RecentDeathQuestion = ({ setYesNoChecked, yesNoChecked, formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const [buttonDisplay, setButtonDisplay] = useState("none")

    useEffect(() => {
        setTimeout(() => {
            setButtonDisplay("block")
        }, 3000)
    }, [currentQuestion])

    const handleChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        if (event.target.value == "yes") {
            setYesNoChecked({ ...yesNoChecked, recentDeath: { yes: true, no: false } })
            setFormState({ ...formState, recentDeath: true })
        } else {
            setYesNoChecked({ ...yesNoChecked, recentDeath: { yes: false, no: true } })
            setFormState({ ...formState, recentDeath: false })
        }
    }
    const handleProgression = () => {
        if (formState.recentDeath == true) {
            //proceed to the next questions, such that we can do the regular progression
            const nextQuestion = currentQuestion + 1
            setCurrentQuestion(nextQuestion)
        } else {
            //this will skip the next 2 questions
            const nextQuestion = currentQuestion + 2
            setCurrentQuestion(nextQuestion)
        }
    }
    const handleRegression = () => {
        if (formState.outsideHelp != false) {
            const prevQuestion = currentQuestion - 1
            setCurrentQuestion(prevQuestion)
        } else {
            const prevQuestion = currentQuestion - 3
            setCurrentQuestion(prevQuestion)
        }
    }

    return (
        <div className='questionContainer'>
            <div className='formContainer'>
                <p>Has anyone you love died?</p>
                <form>
                    <label htmlFor="yes">Yes</label>
                    <input
                        type="radio"
                        id="yes"
                        checked={yesNoChecked.recentDeath.yes}
                        name="recentDeath"
                        value="yes"
                        onChange={handleChange}
                    />
                    <label htmlFor="no">No</label>
                    <input
                        type="radio"
                        id="no"
                        checked={yesNoChecked.recentDeath.no}
                        name="recentDeath"
                        value="no"
                        onChange={handleChange}
                    />
                </form>
            </div>
            <button style={{ display: buttonDisplay }} className='progressBtn' onClick={handleProgression}>Next</button>
            <button style={{ display: buttonDisplay }} className='regressBtn' onClick={handleRegression}>Back</button>
            <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
        </div>
    )
}

export default RecentDeathQuestion