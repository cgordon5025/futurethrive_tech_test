import React, { useState, useEffect } from 'react'

const GradeQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const [buttonDisplay, setButtonDisplay] = useState("none")
    console.log(buttonDisplay)
    useEffect(() => {
        console.log("triggered2")

        console.log("here here")
        setTimeout(() => {
            console.log("countdown start")
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

    return (
        <div className='questionContainer'>
            <div className='formContainer'>
                <p>What grade are you in?</p>
                <input
                    name='grade'
                    value={formState.grade}
                    onChange={handleChange}
                />
            </div>
            <button style={{ display: buttonDisplay }} className='progressBtn' onClick={handleProgression}>Next</button>
            <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
        </div>
    )
}

export default GradeQuestion