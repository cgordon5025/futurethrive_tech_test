import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
const SickFamilyQuestion = ({ setYesNoChecked, yesNoChecked, formState, setFormState, setCurrentQuestion, currentQuestion }) => {
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
            if (currentQuestion == 9) {
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
        if (event.target.value == "yes") {
            setYesNoChecked({ ...yesNoChecked, sickFamily: { yes: true, no: false } })
            setFormState({ ...formState, sickFamily: true })
        } else {
            setYesNoChecked({ ...yesNoChecked, sickFamily: { yes: false, no: true } })
            setFormState({ ...formState, sickFamily: false })
        }
    }
    const handleProgression = () => {
        if (formState.sickFamily == true) {
            //proceed to the next questions, such that we can do the regular progression
            const nextQuestion = currentQuestion + 1
            setCurrentQuestion(nextQuestion)
        } else {
            //this will skip the next 2 questions
            const nextQuestion = currentQuestion + 2
            setCurrentQuestion(nextQuestion)
        }
    }
    const handleRegression = () => {
        if (formState.recentDeath == true) {
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
                <p>Is anyone living in your house really sick?</p>
                <form>
                    <label htmlFor="yes">Yes</label>
                    <input
                        type="radio"
                        id="yes"
                        checked={yesNoChecked.sickFamily.yes}
                        name="recentDeath"
                        value="yes"
                        onChange={handleChange}
                    />
                    <label htmlFor="no">No</label>
                    <input
                        type="radio"
                        id="no"
                        checked={yesNoChecked.sickFamily.no}
                        name="recentDeath"
                        value="no"
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

export default SickFamilyQuestion