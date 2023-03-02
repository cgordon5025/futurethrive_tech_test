import React, { useState, useEffect } from 'react'

const SchoolSocialQuestion = ({ setYesNoChecked, yesNoChecked, formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const [buttonDisplay, setButtonDisplay] = useState("none")

    useEffect(() => {
        setTimeout(() => {
            setButtonDisplay("block")
        }, 3000)
    }, [currentQuestion])

    const handleChange = (event) => {
        if (event.target.value == "yes") {
            setYesNoChecked({ ...yesNoChecked, schoolFriends: { yes: true, no: false } })
            setFormState({ ...formState, schoolFriends: true })
        } else {
            setYesNoChecked({ ...yesNoChecked, schoolFriends: { yes: false, no: true } })
            setFormState({ ...formState, schoolFriends: false })
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
                <p>Do you have friends at school?</p>
                <form>
                    <label htmlFor="yes">Yes</label>
                    <input
                        type="radio"
                        id="yes"
                        checked={yesNoChecked.schoolFriends.yes}
                        name="schoolFriends"
                        value="yes"
                        onChange={handleChange}
                    />
                    <label htmlFor="no">No</label>
                    <input
                        type="radio"
                        id="no"
                        checked={yesNoChecked.schoolFriends.no}
                        name="schoolFriends"
                        value="no"
                        onChange={handleChange}
                    />
                </form>
            </div>
            <button style={{ display: buttonDisplay }} className='progressBtn' onClick={handleProgression}>Next</button>
            <button style={{ display: buttonDisplay }} className='regressBtn' onClick={handleRegression}>Back</button>
            <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
        </div>
    )
}

export default SchoolSocialQuestion