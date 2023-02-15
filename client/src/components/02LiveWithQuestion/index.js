import React, { useState } from 'react'

const LiveWithQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
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
//maybe make this a clicking option
    return (
        <div className='questionContainer'>
            <p>Who do you live with?</p>
            <input
                name='liveWith'
                value={formState.liveWith}
                onChange={handleChange}
            />
            <button className='progressBtn' onClick={handleProgression}>Next</button>
        </div>
    )
}

export default LiveWithQuestion