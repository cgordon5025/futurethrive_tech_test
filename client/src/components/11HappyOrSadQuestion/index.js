import React, { useState } from 'react'

const HappyOrSadQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const handleChange = (event) => {
        console.log(event.target.value)
        switch (event.target.value) {
            case "mostlySad":
                setFormState({ ...formState, happyOrSad: "mostly sad" })
                break;
            case "mostlyHappy":
                setFormState({ ...formState, happyOrSad: "mostly happy" })
                break;
            case "inbetween":
                setFormState({ ...formState, happyOrSad: "in between" })
                break;
        }
    }
    const handleProgression = () => {
        const nextQuestion = currentQuestion + 1
        setCurrentQuestion(nextQuestion)
    }

    return (
        <div className='questionContainer'>
            <div className='formContainer'>
                <p>Are you sad most of the time, happy most of the time or in between?</p>
                <form>
                    <label htmlFor="sad">Sad most of the time</label>
                    <input
                        type="radio"
                        id="sad"
                        name="happyOrSad"
                        value="mostlySad"
                        onChange={handleChange}
                    />
                    <label htmlFor="happy">Happy most of the time</label>
                    <input
                        type="radio"
                        id="happy"
                        name="happyOrSad"
                        value="mostlyHappy"
                        onChange={handleChange}
                    />
                    <label htmlFor="inbetween">Somewhere in between</label>
                    <input
                        type="radio"
                        id="inbetween"
                        name="happyOrSad"
                        value="inbetween"
                        onChange={handleChange}
                    />
                </form>
            </div>
            <button className='progressBtn' onClick={handleProgression}>Next</button>
            <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
        </div>
    )
}

export default HappyOrSadQuestion