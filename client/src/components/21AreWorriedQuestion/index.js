import React, { useState } from 'react'

const AreWorriedQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
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
            <p>Do you get worried?</p>
            <input
                name='areWorried'
                value={formState.areWorried}
                onChange={handleChange}
            />
            <button className='progressBtn' onClick={handleProgression}>Next</button>
        </div>
    )
}

export default AreWorriedQuestion