import React, { useState, useEffect } from 'react'

const MakeLessWorriedQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const [buttonDisplay, setButtonDisplay] = useState("none")

    useEffect(() => {
        setTimeout(() => {
            setButtonDisplay("block")
        }, 3000)
    }, [currentQuestion])

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
    const handleRegression = () => {
        const prevQuestion = currentQuestion - 1
        setCurrentQuestion(prevQuestion)
    }
    return (
        <div className='questionContainer'>
            <div className='formContainer'>
                <p>If there was one thing in your life that you could change to make you feel less worried, what would it be?</p>
                <input
                    name='makeLessWorry'
                    value={formState.makeLessWorry}
                    onChange={handleChange}
                />
            </div>
            <button style={{ display: buttonDisplay }} className='progressBtn' onClick={handleProgression}>Next</button>
            <button style={{ display: buttonDisplay }} className='regressBtn' onClick={handleRegression}>Back</button>
            <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
        </div>
    )
}

export default MakeLessWorriedQuestion