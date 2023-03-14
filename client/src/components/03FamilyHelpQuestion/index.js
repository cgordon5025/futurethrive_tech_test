import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
const FamilyHelpQuestion = ({ saveRelyFam, setSaveRelyFam, formState, setFormState, setCurrentQuestion, currentQuestion }) => {
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
            if (currentQuestion == 3) {
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
    const handleChange = async (event) => {
        if (event.target.checked) {
            const name = event.target.name
            const checkStatus = event.target.checked
            setSaveRelyFam({ ...saveRelyFam, [name]: checkStatus })
            console.log(saveRelyFam)
            const value = event.target.value
            const relyFamArray = [...formState.familyHelpDetails, value]
            const filteredArray = [...new Set(relyFamArray)]
            console.log(relyFamArray)
            setFormState({ ...formState, familyHelpDetails: filteredArray })
        }
        if (!event.target.checked) {
            console.log("you unchecked me")
            const name = event.target.name
            const checkedStatus = event.target.checked
            setSaveRelyFam({ ...saveRelyFam, [name]: checkedStatus })
            const targetFamilyMember = event.target.value
            const updatedRelyFam = await formState.familyHelpDetails.filter((famMember) =>
                famMember !== targetFamilyMember)
            setFormState({ ...formState, familyHelpDetails: updatedRelyFam })
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

    return (
        <div className='questionContainer'>
            <div className='formContainer'>
                <p>Who can you talk to in your family if you need help?</p>
                <form style={{ display: "flex", flexDirection: "column" }}>
                    <div>
                        <label htmlFor='mother'>Mother</label>
                        <input
                            type="checkbox"
                            name="mother"
                            checked={saveRelyFam.mother}
                            value="mother"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='father'>Father</label>
                        <input
                            type="checkbox"
                            name="father"
                            checked={saveRelyFam.father}
                            value="father"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="grandmother">Grandmother</label>
                        <input
                            type="checkbox"
                            name="grandmother"
                            checked={saveRelyFam.grandmother}
                            value="grandmother"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='grandfather'>Grandfather</label>
                        <input
                            type="checkbox"
                            name="grandfather"
                            checked={saveRelyFam.grandfather}
                            value="grandfather"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='brother'>Brother</label>
                        <input
                            type="checkbox"
                            name="brother"
                            checked={saveRelyFam.brother}
                            value="brother"
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor='sister'>Sister</label>
                        <input
                            type="checkbox"
                            name="sister"
                            checked={saveRelyFam.sister}
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

export default FamilyHelpQuestion