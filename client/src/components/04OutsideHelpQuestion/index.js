import React, { useState, useEffect } from 'react'

const OutsideHelpQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
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
            setFormState({ ...formState, outsideHelp: true })
        } else {
            setFormState({ ...formState, outsideHelp: false })
        }
    }
    const handleProgression = () => {
        if (formState.outsideHelp == true) {
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
                <p>Are the people outside your family you "talk to" when you need help?</p>
                <form>
                    <label htmlFor="yes">Yes</label>
                    <input
                        type="radio"
                        id="yes"
                        name="outsideHelp"
                        value="yes"
                        onChange={handleChange}
                    />
                    <label htmlFor="no">No</label>
                    <input
                        type="radio"
                        id="no"
                        name="outsideHelp"
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

export default OutsideHelpQuestion