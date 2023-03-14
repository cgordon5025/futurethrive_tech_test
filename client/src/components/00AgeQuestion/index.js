import React, { useState, useContext, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
const AgeQuestion = ({ readFirstQ, showButton, formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const [buttonDisplay, setButtonDisplay] = useState("none")
    const [showModal, setShowModal] = useState(false)
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
    // useEffect(() => {
    //     console.log("highlight the text")
    //     highLight()
    // }, [readFirstQ])

    useEffect(() => {
        if (readFirstQ == true) {
            setTimeout(() => {
                console.log("showing the timeout modal")
                setShowModal(true)
            }, 60000)
        }
    },)

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


    return (
        <div>
            <div className='questionContainer' >
                <div className="formContainer">
                    <p className="ageQuestion">How old are you?</p>
                    <input
                        name='age'
                        value={formState.age}
                        onChange={handleChange}
                    />
                </div>
                <button style={{ display: buttonDisplay }} className='progressBtn' onClick={handleProgression}>Next</button>
                <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you still there?</p>
                    <p>If you are please, wrap up what you are talking and/or writing about, and goto the next question</p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default AgeQuestion