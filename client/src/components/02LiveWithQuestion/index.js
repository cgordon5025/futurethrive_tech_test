import React, { useState, useEffect } from 'react'

const LiveWithQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const [buttonDisplay, setButtonDisplay] = useState("none")

    useEffect(() => {
        setTimeout(() => {
            setButtonDisplay("block")
        }, 3000)
    }, [currentQuestion])

    const handleChange = async (event) => {
        if (event.target.checked) {
            console.log("you checked me")
            const value = event.target.value
            const liveWithArray = [...formState.liveWith, value]
            console.log(liveWithArray)
            setFormState({ ...formState, liveWith: liveWithArray })
        }
        if (!event.target.checked) {
            console.log("you unchecked me")
            const targetFamilyMember = event.target.value
            const updatedLiveWith = await formState.liveWith.filter((famMember) =>
                famMember !== targetFamilyMember)
            console.log(updatedLiveWith)
            setFormState({ ...formState, liveWith: updatedLiveWith })
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
    //maybe make this a clicking option
    return (
        <div className='questionContainer'>
            <div className='formContainer'>
                <p>Who do you live with?</p>
                <form style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                        <label htmlFor='mother'>Mother</label>
                        <input
                            type="checkbox"
                            name="mother"
                            value="mother"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='father'>Father</label>
                        <input
                            type="checkbox"
                            name="father"
                            value="father"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="grandmother">Grandmother</label>
                        <input
                            type="checkbox"
                            name="grandmother"
                            value="grandmother"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='grandfather'>Grandfather</label>
                        <input
                            type="checkbox"
                            name="grandfather"
                            value="grandfather"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='brother'>Brother</label>
                        <input
                            type="checkbox"
                            name="brother"
                            value="brother"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='sister'>Sister</label>
                        <input
                            type="checkbox"
                            name="sister"
                            value="sister"
                            onChange={handleChange} />
                    </div>
                </form>
            </div>

            <button style={{ display: buttonDisplay }} className='progressBtn' onClick={handleProgression}>Next</button>
            <button style={{ display: buttonDisplay }} className='regressBtn' onClick={handleRegression}>Back</button>
            <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
        </div>
    )
}

export default LiveWithQuestion