import React, { useState, useEffect } from 'react'

const AcademicsQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const [buttonDisplay, setButtonDisplay] = useState("none")

    useEffect(() => {
        setTimeout(() => {
            setButtonDisplay("block")
        }, 3000)
    }, [currentQuestion])

    const handleChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.value)
        if (event.target.value == "yes") {
            setFormState({ ...formState, academics: true })
        } else {
            setFormState({ ...formState, academics: false })
        }
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
                <p>Are you making good grades in school?</p>
                <form>
                    <label htmlFor="yes">Yes</label>
                    <input
                        type="radio"
                        id="yes"
                        name="academics"
                        value="yes"
                        onChange={handleChange}
                    />
                    <label htmlFor="no">No</label>
                    <input
                        type="radio"
                        id="no"
                        name="academics"
                        value="no"
                        onChange={handleChange}
                    />
                </form>
            </div>
            <button style={{display:buttonDisplay}}className='progressBtn' onClick={handleProgression}>Next</button>
            <button style={{ display: buttonDisplay }} className='regressBtn' onClick={handleRegression}>Back</button>
            <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
        </div>
    )
}

export default AcademicsQuestion