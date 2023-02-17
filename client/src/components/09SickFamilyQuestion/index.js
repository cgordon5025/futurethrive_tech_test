import React, { useState } from 'react'

const SickFamilyQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const handleChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        if (event.target.value == "yes") {
            setFormState({ ...formState, sickFamily: true })
        } else {
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

    return (
        <div className='questionContainer'>
            <div className='formContainer'>
                <p>Is anyone living in your house really sick?</p>
                <form>
                    <label htmlFor="yes">Yes</label>
                    <input
                        type="radio"
                        id="yes"
                        name="recentDeath"
                        value="yes"
                        onChange={handleChange}
                    />
                    <label htmlFor="no">No</label>
                    <input
                        type="radio"
                        id="no"
                        name="recentDeath"
                        value="no"
                        onChange={handleChange}
                    />
                </form>
            </div>
            <button className='progressBtn' onClick={handleProgression}>Next</button>
            <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
        </div>
    )
}

export default SickFamilyQuestion