import React, { useState, useEffect } from 'react'

const HappyOrSadQuestion = ({ setYesNoChecked, yesNoChecked, formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const [buttonDisplay, setButtonDisplay] = useState("none")

    useEffect(() => {
        setTimeout(() => {
            setButtonDisplay("block")
        }, 3000)
    }, [currentQuestion])
console.log(yesNoChecked.happyOrSad.inbetween)
    const handleChange = (event) => {
        console.log(event.target.value)
        switch (event.target.value) {
            case "mostlySad":
                setYesNoChecked({ ...yesNoChecked, happyOrSad: { sad: true, happy: false, inbetween: false } })
                setFormState({ ...formState, happyOrSad: "mostly sad" })
                break;
            case "mostlyHappy":
                setYesNoChecked({ ...yesNoChecked, happyOrSad: { sad: false, happy: true, inbetween: false } })
                setFormState({ ...formState, happyOrSad: "mostly happy" })
                break;
            case "inbetween":
                setYesNoChecked({ ...yesNoChecked, happyOrSad: { sad: false, happy: false, inbetween: true } })
                setFormState({ ...formState, happyOrSad: "in between" })
                break;
        }
    }
    const handleProgression = () => {
        const nextQuestion = currentQuestion + 1
        setCurrentQuestion(nextQuestion)
    }
    const handleRegression = () => {
        if (formState.sickFamily != false) {
            const prevQuestion = currentQuestion - 1
            setCurrentQuestion(prevQuestion)
        } else {
            const prevQuestion = currentQuestion - 2
            setCurrentQuestion(prevQuestion)
        }
    }

    return (
        <div className='questionContainer'>
            <div className='formContainer'>
                <p>Are you sad most of the time, happy most of the time or in between?</p>
                <form>
                    <label htmlFor="sad">Sad most of the time</label>
                    <input
                        type="radio"
                        id="sad"
                        checked={yesNoChecked.happyOrSad.sad}
                        name="happyOrSad"
                        value="mostlySad"
                        onChange={handleChange}
                    />
                    <label htmlFor="happy">Happy most of the time</label>
                    <input
                        type="radio"
                        id="happy"
                        checked={yesNoChecked.happyOrSad.happy}
                        name="happyOrSad"
                        value="mostlyHappy"
                        onChange={handleChange}
                    />
                    <label htmlFor="inbetween">Somewhere in between</label>
                    <input
                        type="radio"
                        id="inbetween"
                        checked={yesNoChecked.happyOrSad.inbetween}
                        name="happyOrSad"
                        value="inbetween"
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

export default HappyOrSadQuestion