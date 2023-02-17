import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { SAVE_VIDEO } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { RecordWebcam, useRecordWebcam } from 'react-record-webcam'
import Assessment from "./Assessment";

const Welcome = () => {
    const [welcomeDisplay, setWelcomeDisplay] = useState("flex-root")
    const [assessmentDisplay, setAssessmentDisplay] = useState("none")
    const [endDisplay, setEndDisplay] = useState("none")
    const [camButton, setcamButton] = useState("block")
    const [startButton, setStartButton] = useState("none")
    const [camStatus, setCamStatus] = useState(false)
    const [saveVid, { error, data }] = useMutation(SAVE_VIDEO)

    const Options = {
        aspectRatio: 1.7,
        disableLogs: true,
        fileName: "test-filename",
        height: 720,
        mimeType: 'video/mp4',
        type: 'video',
        width: 1280,

    }
    const recordWebcam = useRecordWebcam(Options)

    const saveFile = async () => {
        // const blob = await recordWebcam.getRecording(Options);
        const blob = await recordWebcam.getRecording()
        const fileTypeFromMimeType = Options.mimeType?.split('video/')[1]?.split(';')[0] || 'mp4';
        const fileType = fileTypeFromMimeType === 'x-matroska' ? 'mkv' : fileTypeFromMimeType;
        const filename = `${Options.fileName}.${fileType}`;
        const url = URL.createObjectURL(blob)
        console.log(url)
        // saveFile(filename, blob);
        console.log(filename)
        console.log(blob)        // console.log(blob)
        try {
            const { data } = await saveVid({
                variables: {
                    userId: "63ea86c4fd9ddbf82469e45e",
                    videofile: filename,
                    blob: blob,
                    path: "../videos/",
                    URL: url
                }
            })
        } catch (e) {
            console.log(e)
        }
    };



    const confirmView = async () => {
        setcamButton("none")
        setStartButton("block")
    }
    const startSession = async () => {
        await recordWebcam.start()
        setWelcomeDisplay("none")
        setAssessmentDisplay("block")
    }
    return (
        <>
            <div className='WelcomeContainer' style={{ display: welcomeDisplay }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <p>Welcome statement about confidentiality and such</p>
                    <p>Before we being please make sure you can see your whole head in the display.</p>
                    <div style={{ display: camButton }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
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
                <p>Camera status: {recordWebcam.status}</p>
                <button onClick={recordWebcam.open}>Open camera</button>
                <button onClick={recordWebcam.start}>Start recording</button>
                <button onClick={recordWebcam.stop}>Stop recording</button>
                <button onClick={recordWebcam.retake}>Retake recording</button>
                <button onClick={recordWebcam.download}>Download recording</button>
                <button onClick={saveFile}>Save file to server</button>
                {/* <video ref={recordWebcam.webcamRef} autoPlay muted /> */}
                {/* <video ref={recordWebcam.previewRef} autoPlay muted loop /> */}
            </div>
            <div style={{ display: assessmentDisplay }}>
                <Assessment setCamStatus={setCamStatus} setAssessmentDisplay={setAssessmentDisplay} assessmentDisplay={assessmentDisplay} setEndDisplay={setEndDisplay} />
            </div>
            <div style={{ display: endDisplay }}>
                <div className='WelcomeContainer'>
                    <p>You have completed this</p>
                    <p>More instructions to follow, include a timeout portion such that it'll log them out, restart the app etc</p>
                </div>
            </div>

        </>
    )
}

export default Welcome