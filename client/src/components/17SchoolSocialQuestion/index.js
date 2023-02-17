import React, { useState } from 'react'

const SchoolSocialQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const handleChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        if (event.target.value == "yes") {
            setFormState({ ...formState, schoolFriends: true })
        } else {
            setFormState({ ...formState, schoolFriends: false })
        }
    }
    const handleProgression = () => {
        const nextQuestion = currentQuestion + 1
        setCurrentQuestion(nextQuestion)
    }

    return (
        <div className='questionContainer'>
            <div className='formContainer'>
                <p>Do you have friends at school?</p>
                <form>
                    <label htmlFor="yes">Yes</label>
                    <input
                        type="radio"
                        id="yes"
                        name="schoolFriends"
                        value="yes"
                        onChange={handleChange}
                    />
                    <label htmlFor="no">No</label>
                    <input
                        type="radio"
                        id="no"
                        name="schoolFriends"
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

export default SchoolSocialQuestion