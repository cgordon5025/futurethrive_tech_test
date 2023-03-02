import React, { useState, useEffect } from 'react'

const SickFamilyQuestion = ({ setYesNoChecked, yesNoChecked, formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const [buttonDisplay, setButtonDisplay] = useState("none")

    useEffect(() => {
        setTimeout(() => {
            setButtonDisplay("block")
        }, 3000)
    }, [currentQuestion])

    const handleChange = (event) => {
        if (event.target.value == "yes") {
            setYesNoChecked({ ...yesNoChecked, sickFamily: { yes: true, no: false } })
            setFormState({ ...formState, sickFamily: true })
        } else {
            setYesNoChecked({ ...yesNoChecked, sickFamily: { yes: false, no: true } })
            setFormState({ ...formState, sickFamily: false })
        }
    }
    const handleProgression = () => {
        if (formState.sickFamily == true) {
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
        if (formState.recentDeath != false) {
            const prevQuestion = currentQuestion - 1
            setCurrentQuestion(prevQuestion)
        } else {
            const prevQuestion = currentQuestion - 2
            setCurrentQuestion(prevQuestion)
        }
    }

    return (
        <div className='questionContainer'>
            <div className='formContainer'>
                <p>Is anyone living in your house really sick?</p>
                <form>
                    <label htmlFor="yes">Yes</label>
                    <input
                        type="radio"
                        id="yes"
                        checked={yesNoChecked.sickFamily.yes}
                        name="recentDeath"
                        value="yes"
                        onChange={handleChange}
                    />
                    <label htmlFor="no">No</label>
                    <input
                        type="radio"
                        id="no"
                        checked={yesNoChecked.sickFamily.no}
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

export default SickFamilyQuestion