import React, { useState, useContext, useEffect } from 'react'
import VoiceContext from '../../utils/VoiceContext'
import { TextToSpeech } from 'tts-react'

const AgeQuestion = ({ readFirstQ, showButton, formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const [buttonDisplay, setButtonDisplay] = useState("none")
    useEffect(() => {
        console.log("triggered")
        if (readFirstQ == true) {
            console.log("here here")
            setTimeout(() => {
                console.log("countdown start")
                setButtonDisplay("block")
            }, 3000)
        }

    }, )
    
    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormState({
            ...formState,
            [name]: value
        })
    }
    const handleProgression = () => {
        // setButtonDisplay("none")
        const nextQuestion = currentQuestion + 1
        setCurrentQuestion(nextQuestion)
    }

    const rate = .9;
    const synth = window.speechSynthesis;
    const voice = synth.getVoices().filter((voice) => voice.voiceURI == 'Google UK English Male')
    const utterThis = new SpeechSynthesisUtterance("How old are you");
    utterThis.rate = rate;
    utterThis.voice = voice[0];

    return (

        < div className='questionContainer' >
            {/* {synth.speak(utterThis)} */}
            <div className="formContainer">
                {/* <TextToSpeech
                    markTextAsSpoken
                    markBackgroundColor='red'
                    rate={".9"}
                    lang="en-GB"
                    autoPlay>
                    <p>How old are you?</p>
                </TextToSpeech> */}
                <p>How old are you?</p>
                <input
                    name='age'
                    value={formState.age}
                    onChange={handleChange}
                />
            </div>
            <button style={{ display: buttonDisplay }} className='progressBtn' onClick={handleProgression}>Next</button>
            <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
        </div >
    )
}

export default AgeQuestion