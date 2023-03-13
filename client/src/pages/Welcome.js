import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
// import { SAVE_VIDEO } from "../utils/mutations";
import { SAVE_VIDEO, UPLOAD_VIDEO } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { RecordWebcam, useRecordWebcam } from 'react-record-webcam'
import Assessment from "./Assessment";
import { CREATE_USER } from "../utils/mutations";
import { SET_USER } from "../utils/action";
import UserContext from '../utils/UserContext'
import { BlobServiceClient } from '@azure/storage-blob'

const Welcome = () => {
    const [welcomeDisplay, setWelcomeDisplay] = useState("flex-root")
    const [assessmentDisplay, setAssessmentDisplay] = useState("none")
    const [endDisplay, setEndDisplay] = useState("none")
    const [camButton, setcamButton] = useState("block")
    const [startButton, setStartButton] = useState("none")
    const [camStatus, setCamStatus] = useState(false)
    const [readFirstQ, setReadFirstQ] = useState(false)
    const { setUser } = useContext(UserContext)
    const [vidUserId, setVidUserId] = useState()
    const [fileSize, setFileSize] = useState()

    useEffect(() => {
        recordWebcam.open()
    }, [])
    useEffect(() => {
        if (camStatus == true) {
            recordWebcam.stop()
        }
    })

    useEffect(() => {
        if (camStatus == true) {
            console.log("i commented this out so i can test something else out")
            // setTimeout(() => {
            //     console.log("now trying to upload")
            //     uploadVideo()
            // }, 2000)
        }
    })

    const OPTIONS = {
        aspectRatio: 1.7,
        disableLogs: true,
        fileName: "test-filename",
        height: 720,
        mimeType: 'video/mp4',
        type: 'video',
        width: 1280,

    }
    const recordWebcam = useRecordWebcam(OPTIONS)
    //setting up a variables for chunk upload
    const uploadMe = async (fileSize) => {
        console.log(fileSize)
        await fetch(`http://localhost:3001/api/videos`, {
            method: 'POST',
            body: JSON.stringify({ vidUserId, fileSize }),
            headers: {
                'content-type': 'application/json'
            }
        })
    }
    const saveFile = async () => {
        // const blob = await recordWebcam.getRecording(Options);
        const blob = await recordWebcam.getRecording()
        const filename = vidUserId
        const chunkSize = 50000
        var numberOfChunks = await Math.ceil(blob.size / chunkSize)
        if (isNaN(numberOfChunks)) {
            console.log("trying again")
            numberOfChunks = Math.ceil(blob.size / chunkSize)
        }
        console.log(numberOfChunks)
        var start = 0
        var chunkEnd = start + chunkSize
        console.log(blob)
        // console.log(blob.slice())
        console.log(numberOfChunks)

        for (let i = 0; i < numberOfChunks + 1; i++) {
            let chunk = blob.slice(i * chunkSize, (i + 1) * chunkSize, 'video/mp4')
            console.log(chunk)
            console.log(`uploading chunk: ${i}`)
            if (chunk.size > 0) {
                await fetch(`http://localhost:3001/api/videos/${filename}_${i}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'video/mp4',
                        'content-length': chunk.length,
                    },
                    body: chunk,

                })
            }
        }
        return blob.size
    };
    const uploadVideo = async () => {
        await saveFile().then((res) => {
            uploadMe(res)
        })
    }
    const confirmView = async () => {
        setcamButton("none")
        setStartButton("block")
    }
    const startSession = async () => {
        const username = 'test'
        try {
            const data = await fetch('http://localhost:3001/api/users', {
                method: 'POST',
                body: JSON.stringify({ username }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {

                return response.json()
            }).then(function (data) {
                setVidUserId(data)
                const payload = {
                    _id: data
                }
                setUser({
                    type: SET_USER,
                    payload: payload
                })
            })

            await recordWebcam.start(OPTIONS)
            setWelcomeDisplay("none")
            setAssessmentDisplay("block")
            setReadFirstQ(true)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className='WelcomeContainer' style={{ display: welcomeDisplay }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <h2>Welcome statement about confidentiality and such</h2>
                    <h2>Before we being please make sure you can see your whole head in the display.</h2>
                    <div style={{ display: camButton }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            {/* <video id="previewVid" style={{ width: "50vw", marginBottom: "%2.5" }} autoPlay muted /> */}
                            <video style={{ width: "50vw", marginBottom: "2.5%" }} ref={recordWebcam.webcamRef} autoPlay muted />

                            <Button onClick={confirmView}>I can see myself</Button>
                        </div>
                    </div>
                    <Button style={{ display: startButton }} onClick={startSession}>Lets begin</Button>
                </div>
            </div>
            <div>
                {/* this renders an open/close/start/stop and download button look into ways to get a save to server/autosave to server */}
                {/* <RecordWebcam options={Options} /> */}
                <h5>Camera status: {recordWebcam.status}</h5>
                <button onClick={recordWebcam.open}>Open camera</button>
                <button onClick={recordWebcam.start}>Start recording</button>
                <button onClick={recordWebcam.stop}>Stop recording</button>
                <button onClick={recordWebcam.retake}>Retake recording</button>
                <button onClick={recordWebcam.download}>Download recording</button>
                <button onClick={uploadVideo}>Save file to server</button>
                {/* <video ref={recordWebcam.webcamRef} autoPlay muted /> */}
                {/* <video ref={recordWebcam.previewRef} autoPlay muted loop /> */}
            </div>
            <div style={{ display: assessmentDisplay }}>
                <Assessment readFirstQ={readFirstQ} setCamStatus={setCamStatus} setAssessmentDisplay={setAssessmentDisplay} assessmentDisplay={assessmentDisplay} setEndDisplay={setEndDisplay} />
            </div>
            <div style={{ display: endDisplay }}>
                <div className='WelcomeContainer'>
                    <p>You have completed this</p>
                    <p>More instructions to follow, include a timeout portion such that it'll log them out, restart the app etc</p>
                </div>
            </div>
            {/* <button onClick={uploadMe}> UPLOAD ME</button> */}
        </>
    )
}

export default Welcome