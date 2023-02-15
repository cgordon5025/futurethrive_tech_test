import React, { useState } from 'react'

const AcademicsQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
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
            <p>Are you making good grades in school?</p>
            <input
                name='academics'
                value={formState.academics}
                onChange={handleChange}
            />
            <button className='progressBtn' onClick={handleProgression}>Next</button>
        </div>
    )
}

export default AcademicsQuestion