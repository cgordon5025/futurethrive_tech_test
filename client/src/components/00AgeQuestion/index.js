import React, { useState, useContext, useEffect } from 'react'
import VoiceContext from '../../utils/VoiceContext'
import { TextToSpeech } from 'tts-react'

const AgeQuestion = ({ readFirstQ, showButton, formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const [buttonDisplay, setButtonDisplay] = useState("none")
    useEffect(() => {
        if (readFirstQ == true) {
            setTimeout(() => {
                setButtonDisplay("block")
            }, 3000)
        }

    },)
    const questionText = document.getElementById("ageQuestion")
    const questionNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    console.log(questionNodes)
    const allTextNodes = []
    useEffect(() => {
        console.log("highlight the text")
        let currentNode = questionNodes.nextNode();
        while (currentNode) {
            console.log(currentNode)
            console.log(getComputedStyle(currentNode.parentNode).getAttribute())
            if (getComputedStyle(currentNode.parentNode).display !== "none") {
                console.log("pushing the correct")
                allTextNodes.push(currentNode)
            }
            currentNode = questionNodes.nextNode()
        }
        // const allWords = []
        // for (const textNode of allTextNodes) {
        //     for (const word of textNode.textContent.matchAll(/[a-zA-Z]+/g)) {
        //         allWords.push({
        //             word: word[0],
        //             parentNode: textNode,
        //             offset: word.index
        //         });
        //     }
        // }
        // let index = 0;
        // const range = new Range();

        // const highLight = setInterval(() => {
        //     // if (readFirstQ) {
        //     console.log("yay it working")
        //     if (index >= allWords.length) {
        //         index = 0;
        //     }
        //     const { word, parentNode, offset } = allWords[index];
        //     console.log(word)
        //     console.log(word)

        //     range.setStart(parentNode, offset);
        //     range.setEnd(parentNode, offset + word.length);
        //     document.getSelection().removeAllRanges();
        //     document.getSelection().addRange(range);

        //     index++;
        //     // }

        // }, 1000);

    }, [])


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
            <div className="formContainer">
                {/* <TextToSpeech
                    markTextAsSpoken
                    rate={".9"}
                    lang="en-GB"
                    autoPlay>
                    <p>How old are you?</p>
                </TextToSpeech> */}
                <p id="ageQuestion">How old are you?</p>
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