import React, { useState, useContext } from 'react'
import VoiceContext from '../../utils/VoiceContext'
const AgeQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const { voice, setVoice } = useContext(VoiceContext)
    const synth = voice.synth
    const question = "How old are you?";
    const utterThis = new SpeechSynthesisUtterance(question);
    utterThis.rate = voice.rate;
    utterThis.voice = voice.voice.daniel;

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
            <button className='progressBtn' onClick={handleProgression}>Next</button>
            <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
        </div>
    )
}

export default AgeQuestion