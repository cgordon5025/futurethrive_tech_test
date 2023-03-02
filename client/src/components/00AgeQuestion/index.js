import React, { useState, useContext, useEffect } from 'react'

const AgeQuestion = ({ readFirstQ, showButton, formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const [buttonDisplay, setButtonDisplay] = useState("none")
    useEffect(() => {
        if (readFirstQ == true) {
            setTimeout(() => {
                setButtonDisplay("block")
            }, 3000)
        }

    },)
    const questionNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
    const finalTextNode = []
    const highLight = () => {
        let realNode = questionNodes.nextNode();
        while (realNode) {
            if (realNode.textContent.includes("?")) {
                finalTextNode.push(realNode)
            }
            realNode = questionNodes.nextNode()
        }
        const finalWords = []

        for (const textNode of finalTextNode) {
            // console.log("in the initial loop")
            for (const word of textNode.textContent.matchAll(/[a-zA-Z]+/g)) {
                // console.log("pushing")
                finalWords.push({
                    word: word[0],
                    parentNode: textNode,
                    offset: word.index
                });
            }
        }
        let index = 0;
        const range = new Range();
        const highLight = setInterval(() => {
            if (readFirstQ) {
                console.log("yay it working")
                console.log(index)
                if (index >= finalWords.length) {
                    console.log("entering the stop loop")
                    document.getSelection().removeAllRanges();
                    clearInterval(highLight)
                } else {
                    const { word, parentNode, offset } = finalWords[index];
                    range.setStart(parentNode, offset);
                    range.setEnd(parentNode, offset + word.length);
                    document.getSelection().removeAllRanges();
                    document.getSelection().addRange(range);
                    index++;
                }
            }
        }, 200);
    }
    useEffect(() => {
        console.log("highlight the text")
        highLight()
    }, [readFirstQ])


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
                </TextToSpeech>
                {readFirstQ ?
                    (
                    <TextToSpeech
                        markTextAsSpoken
                        rate={.9}
                        lang="en-GB"
                        autoPlay>
                        <p>Lets see why the highlighting mark of the text is not working with qa rteally long sentence maybes it just delayed i don't know what do celebs know do they know things lets find out</p>
                    </TextToSpeech>) : (
                        <></>
                    )} */}
                <p className="ageQuestion">How old are you?</p>
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