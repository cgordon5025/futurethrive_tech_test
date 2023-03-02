import React, { useState, useEffect } from 'react'

const LiveWithQuestion = ({ setSaveLiveWith, saveLiveWith, formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const [buttonDisplay, setButtonDisplay] = useState("none")

    useEffect(() => {
        setTimeout(() => {
            setButtonDisplay("block")
        }, 3000)
    }, [currentQuestion])

    const handleChange = async (event) => {
        if (event.target.checked) {
            console.log("you checked me")
            const name = event.target.name
            const checkStatus = event.target.checked
            setSaveLiveWith({ ...saveLiveWith, [name]: checkStatus })

            const liveWithArray = [...formState.liveWith, name]
            //this line right here makes it so we only have single occurance, b/c of the progression/regression issue for checking it
            const filteredArray = [...new Set(liveWithArray)]
            setFormState({ ...formState, liveWith: filteredArray })
            console.log(formState.liveWith)
        }
        if (!event.target.checked) {
            console.log("you unchecked me")
            const name = event.target.name
            const targetFamilyMember = event.target.value
            const checkStatus = event.target.checked
            setSaveLiveWith({ ...saveLiveWith, [name]: checkStatus })
            console.log(saveLiveWith)
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
                            checked={saveLiveWith.mother}
                            value="mother"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='father'>Father</label>
                        <input
                            type="checkbox"
                            name="father"
                            checked={saveLiveWith.father}
                            value="father"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="grandmother">Grandmother</label>
                        <input
                            type="checkbox"
                            name="grandmother"
                            checked={saveLiveWith.grandmother}
                            value="grandmother"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='grandfather'>Grandfather</label>
                        <input
                            type="checkbox"
                            name="grandfather"
                            checked={saveLiveWith.grandfather}
                            value="grandfather"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='brother'>Brother</label>
                        <input
                            type="checkbox"
                            name="brother"
                            checked={saveLiveWith.brother}
                            value="brother"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='sister'>Sister</label>
                        <input
                            type="checkbox"
                            name="sister"
                            checked={saveLiveWith.sister}
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