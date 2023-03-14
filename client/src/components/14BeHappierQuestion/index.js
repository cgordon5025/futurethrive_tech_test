import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
const BeHappierQuestion = ({ formState, setFormState, setCurrentQuestion, currentQuestion }) => {
    const [buttonDisplay, setButtonDisplay] = useState("none")
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setButtonDisplay("block")
        }, 3000)
    }, [currentQuestion])
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
            for (const word of textNode.textContent.matchAll(/[a-zA-Z]+/g)) {
                console.log(word)
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
            if (currentQuestion == 14) {
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
    // }, [currentQuestion])
    useEffect(() => {
        setTimeout(() => {
            console.log("showing the timeout modal")
            setShowModal(true)
        }, 60000)
    }, [currentQuestion])
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
    const handleRegression = () => {
        const prevQuestion = currentQuestion - 1
        setCurrentQuestion(prevQuestion)
    }
    return (
        <div className='questionContainer'>
            <div className='formContainer'>
                <p>What could make you even happier?</p>
                <input
                    name='beHappier'
                    value={formState.beHappier}
                    onChange={handleChange}
                />
            </div>
            <button style={{ display: buttonDisplay }} className='progressBtn' onClick={handleProgression}>Next</button>
            <button style={{ display: buttonDisplay }} className='regressBtn' onClick={handleRegression}>Back</button>
            <img id="helper" src="./images/NEW_dog.png" alt="dog"></img>
        </div>
    )
}

export default BeHappierQuestion