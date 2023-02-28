import React, { useState, useEffect } from 'react'

const AreWorriedQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
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
            setFormState({ ...formState, areWorried: true })
        } else {
            setFormState({ ...formState, areWorried: false })
        }
    }
    const handleProgression = () => {
        if (formState.areWorried == true) {
            //proceed to the next questions, such that we can do the regular progression
            const nextQuestion = currentQuestion + 1
            setCurrentQuestion(nextQuestion)
        } else {
            //this will skip the next 2 questions
            const nextQuestion = currentQuestion + 3
            setCurrentQuestion(nextQuestion)
        }
    }

    return (
        <div className='questionContainer'>
            <div className='formContainer'>
                <p>Do you get worried?</p>
                <form>
                    <label htmlFor="yes">Yes</label>
                    <input
                        type="radio"
                        id="yes"
                        name="areWorried"
                        value="yes"
                        onChange={handleChange}
                    />
                    <label htmlFor="no">No</label>
                    <input
                        type="radio"
                        id="no"
                        name="areWorried"
                        value="no"
                        onChange={handleChange}
                    />
                </form>
            </div>
            <button style={{display:buttonDisplay}} className='progressBtn' onClick={handleProgression}>Next</button>
            <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
        </div>
    )
}

export default AreWorriedQuestion