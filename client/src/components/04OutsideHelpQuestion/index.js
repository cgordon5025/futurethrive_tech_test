import React, { useState } from 'react'

const OutsideHelpQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {

    const handleChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        if (event.target.value == "yes") {
            setFormState({ ...formState, outsideHelp: true })
        } else {
            setFormState({ ...formState, outsideHelp: false })
        }
    }
    const handleProgression = () => {
        if (formState.outsideHelp == true) {
            //proceed to the next questions, such that we can do the regular progression
            const nextQuestion = currentQuestion + 1
            setCurrentQuestion(nextQuestion)
        } else {
            //this will skip the next 2 questions
            const nextQuestion = currentQuestion + 3
            setCurrentQuestion(nextQuestion)
        }
    }

    return (
        <div className='questionContainer'>
            <div className='formContainer'>
                <p>Are the people outside your family you "talk to" when you need help?</p>
                <form>
                    <label htmlFor="yes">Yes</label>
                    <input
                        type="radio"
                        id="yes"
                        name="outsideHelp"
                        value="yes"
                        onChange={handleChange}
                    />
                    <label htmlFor="no">No</label>
                    <input
                        type="radio"
                        id="no"
                        name="outsideHelp"
                        value="no"
                        onChange={handleChange}
                    />
                </form>
            </div>
            <button className='progressBtn' onClick={handleProgression}>Next</button>
        </div>
    )
}

export default OutsideHelpQuestion