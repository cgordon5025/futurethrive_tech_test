import React, { useState, useEffect, useContext } from "react";
import Button from "react-bootstrap/Button";
// import { SAVE_VIDEO } from "../utils/mutations";
import { UPLOAD_VIDEO } from "../utils/mutations";
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
    const [saveVid, { error, data }] = useMutation(UPLOAD_VIDEO)
    const [readFirstQ, setReadFirstQ] = useState(false)
    const [createUser, { userError, userData }] = useMutation(CREATE_USER)
    const { setUser } = useContext(UserContext)
    const [vidUserId, setVidUserId] = useState()

    useEffect(() => {
        recordWebcam.open()
    }, [])
    useEffect(() => {
        if (camStatus == true) {
            recordWebcam.stop()
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
    // const recordWebcam = useRecordWebcam()
    const saveVideo = async (blob) => {
        const connStr = "DefaultEndpointsProtocol=https;AccountName=ftnsftestvideos;AccountKey=ZrdiLeyADwqrwLweHbaBhR+opWPAB+gTSVzNxiksGf9A2LnwtY/oSjvGPyNTeCCIvg3o1he0zDOs+AStIKzIeQ==;EndpointSuffix=core.windows.net"
        const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)
        const containerName = "videos"
        const containerClient = blobServiceClient.getContainerClient(containerName)
        const content = blob
        const filename = vidUserId
        const mimetype = blob.type
        const blobName = `${filename}.${mimetype}`
        const blockBlobClient = containerClient.getBlockBlobClient(blobName)
        const uploadBlobResponse = await blockBlobClient.upload(content, content.length)
        console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    }

    const saveFile = async () => {
        // const blob = await recordWebcam.getRecording(Options);
        const blob = await recordWebcam.getRecording()
        // console.log('first level uploading')
        // await saveVideo(blob)

        // const content = args.url
        const filename = vidUserId
        const mimetype = blob.type
        const encoding = "7bit"
        const url = URL.createObjectURL(blob)
        await fetch('http://localhost:3001/api/videos', {
            method: 'POST',
            body: JSON.stringify({
                filename, mimetype, encoding, url, blob
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log("uploaded?")

        // const fileTypeFromMimeType = OPTIONS.mimeType?.split('video/')[1]?.split(';')[0] || 'mp4';
        // const fileType = fileTypeFromMimeType === 'x-matroska' ? 'mkv' : fileTypeFromMimeType;
        // try {
        //     const { data } = await saveVid({
        //         variables: {
        //             filename: vidUserId,
        //             mimetype: blob.type,
        //             encoding: "7bit"
        //         }
        //     })
        // } catch (e) {
        //     console.log(e)
        // }
        // const fileTypeFromMimeType = OPTIONS.mimeType?.split('video/')[1]?.split(';')[0] || 'mp4';
        // const fileType = fileTypeFromMimeType === 'x-matroska' ? 'mkv' : fileTypeFromMimeType;
        // const filename = `${OPTIONS.fileName}.${fileType}`;
        // const readFile = new FileReader()
        // const url = URL.createObjectURL(blob)
        // // const something = URL.createObjectURL(blob)
        // fetch(url)
        //     .then((response) => response.body)
        //     .then((rb) => {
        //         const reader = rb.getReader();

        //         return new ReadableStream({
        //             start(controller) {
        //                 // The following function handles each data chunk
        //                 function push() {
        //                     // "done" is a Boolean and value a "Uint8Array"
        //                     reader.read().then(({ done, value }) => {
        //                         // If there is no more data to read
        //                         if (done) {
        //                             console.log("done", done);
        //                             controller.close();
        //                             return;
        //                             const { data } = saveVid({
        //                                 variables: {
        //                                     userId: "63ea86c4fd9ddbf82469e45e",
        //                                     videofile: value
        //                                 }
        //                             })
        //                         }
        //                         // Get the data and send it to the browser via the controller
        //                         controller.enqueue(value);
        //                         // Check chunks by logging to the console
        //                         console.log(done, value);
        //                         // console.log(value)
        //                         // const { data } = saveVid({
        //                         //     variables: {
        //                         //         userId: "63ea86c4fd9ddbf82469e45e",
        //                         //         videofile: value
        //                         //     }
        //                         // })
        //                         push();
        //                     });
        //                 }

        //                 push();

        //             },
        //         });
        //     })
        //     .then((stream) =>
        //         // Respond with our stream
        //         new Response(stream, { headers: { "Content-Type": "text/html" } }).text()
        //     )
        //     .then((result) => {
        //         // Do things with result
        //         console.log(result);
        //         // const { data } = saveVid({
        //         //     variables: {
        //         //         userId: "63ea86c4fd9ddbf82469e45e",
        //         //         videofile: result
        //         //     }
        //         // })
        //     });
        // // const url = new Response(something).text()

        // // const myFile = new File([url], "test.mp4", { type: 'video/mp4' });
        // // const mediaBlob = await fetch(url).then(response => response.blob())
        // // const myFile = new File([mediaBlob], "demo.mp4", { type: 'video.mp4' })
        // // console.log(myFile)
        // // const file = readFile.readAsArrayBuffer(myFile)
        // // const file = readFile.readAsDataURL(myFile)
        // // const file = readFile.readAsText(myFile)
        // // const file = readFile.readAsBinaryString(myFile)
        // // console.log(file)

        // // console.log(url)
        // // saveFile(filename, blob);
        // console.log(recordWebcam.getRecording())
        // console.log(filename)
        // console.log(blob)        // console.log(blob)
        // // try {
        // //     const { data } = await saveVid({
        // //         variables: {
        // //             userId: "63ea86c4fd9ddbf82469e45e",
        // //             videofile: filename,
        // //             blob: blob,
        // //             path: "../videos/",
        // //             url: file
        // //         }
        // //     })
        // // } catch (e) {
        // //     console.log(e)
        // // }
    };

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
                <button onClick={saveFile}>Save file to server</button>
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

        </>
    )
}

export default Welcome