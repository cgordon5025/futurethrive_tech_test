import React, { useState } from 'react'

const WhyHappyQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
    }
    const handleProgression = () => {
        const nextQuestion = currentQuestion + 1
        setCurrentQuestion(nextQuestion)
    }

    return (
        <div className='questionContainer'>
            <div className='formContainer'>
                <p>What makes you happy?</p>
                <input
                    name='whyHappy'
                    value={formState.whyHappy}
                    onChange={handleChange}
                />
            </div>
            <button className='progressBtn' onClick={handleProgression}>Next</button>
        </div>
    )
}

export default WhyHappyQuestion