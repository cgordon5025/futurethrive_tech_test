import React, { useState, useContext, useEffect } from 'react'
import VoiceContext from '../../utils/VoiceContext'
const AgeQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const { voice, setVoice } = useContext(VoiceContext)
    const [buttonDisplay, setButtonDisplay] = useState("none")
    // const synth = voice.synth
    console.log(voice)
    // const question = "How old are you?";
    // const utterThis = new SpeechSynthesisUtterance(question);
    // utterThis.rate = voice.rate;
    // utterThis.voice = voice.voice.daniel;
    useEffect(() => {
        setTimeout(() => {
            console.log("countdown start")
            setButtonDisplay("block")
        }, 3000)

    }, [])

    // useEffect(() => {
    //     setTimeout(() => {
    //         return (
    //             <button className='progressBtn' onClick={handleProgression}>Next</button>
    //         );
    //     }, 3000)
    //     console.log("in the effect")
    // }, [])
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
            <div className="formContainer">
                <p>How old are you?</p>
                <input
                    name='age'
                    value={formState.age}
                    onChange={handleChange}
                />
            </div>
            <button style={{ display: buttonDisplay }} className='progressBtn' onClick={handleProgression}>Next</button>
            <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
        </div>
    )
}

export default AgeQuestion