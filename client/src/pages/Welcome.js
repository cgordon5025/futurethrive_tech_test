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
    const [saveVid, { error, data }] = useMutation(SAVE_VIDEO)
    const [readFirstQ, setReadFirstQ] = useState(false)
    const [createUser, { userError, userData }] = useMutation(CREATE_USER)
    const { setUser } = useContext(UserContext)
    const [vidUserId, setVidUserId] = useState()
    const [encryptedId, setEncryptedId] = useState()
    const [fileSize, setFileSize] = useState()
    const [uploadVid, { upError, upData }] = useMutation(UPLOAD_VIDEO)
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
    //setting up a variables for chunk upload
    const account = "ftnsftestvideos"
    const sas = 'https://ftnsftestvideos.blob.core.windows.net/videos?sp=r&st=2023-03-09T20:26:42Z&se=2024-03-10T04:26:42Z&spr=https&sv=2021-12-02&sr=c&sig=I1RyXymKjHvhWwapesGPPL3jZe8z%2BVDPeaHwmYDktQU%3D'
    const blobServiceClient = new BlobServiceClient(sas)
    const containerName = "videos"
    const containerClient = blobServiceClient.getContainerClient(containerName)

    // const recordWebcam = useRecordWebcam()
    const saveVideo = async (blob) => {
        // console.log(blob)
        // const account = 'ftnsftestvideos'
        // const accountKey = 'ZrdiLeyADwqrwLweHbaBhR+opWPAB+gTSVzNxiksGf9A2LnwtY/oSjvGPyNTeCCIvg3o1he0zDOs+AStIKzIeQ=='
        // const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey)
        // // const connStr = "DefaultEndpointsProtocol=https;AccountName=ftnsftestvideos;AccountKey=ZrdiLeyADwqrwLweHbaBhR+opWPAB+gTSVzNxiksGf9A2LnwtY/oSjvGPyNTeCCIvg3o1he0zDOs+AStIKzIeQ==;EndpointSuffix=core.windows.net"
        // const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`, sharedKeyCredential)
        // // const blobServiceClient = BlobServiceClient.fromConnectionString(connStr)
        // const containerName = "videos"
        // const containerClient = blobServiceClient.getContainerClient(containerName)
        // const content = blob.stream()
        // const filename = vidUserId
        // const mimetype = blob.type
        // const url = URL.createObjectURL(blob)
        // // const something = await fetch(url).then((response) => response.body).then((rb) => {
        // //     const reader = rb.getReader();
        // //     return new ReadableStream({
        // //         start(controller) {
        // //             function push() {
        // //                 // "done" is a Boolean and value a "Uint8Array"
        // //                 reader.read().then(({ done, value }) => {
        // //                     // If there is no more data to read
        // //                     if (done) {
        // //                         console.log("done", done);
        // //                         controller.close();
        // //                         return;
        // //                         const { data } = saveVid({
        // //                             variables: {
        // //                                 userId: "63ea86c4fd9ddbf82469e45e",
        // //                                 videofile: value
        // //                             }
        // //                         })
        // //                     }
        // //                 })

        // //             }
        // //         }
        // //     })
        // // })
        // // console.log(something)
        // const blobName = `${filename}.${mimetype}`
        // const blockBlobClient = containerClient.getBlockBlobClient(blobName)
        // const uploadBlobResponse = await blockBlobClient.upload(content, Blob.size)
        // console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
    }
    const uploadMe = async () => {

        await fetch(`http://localhost:3001/api/videos`, {
            method: 'POST',
            body: JSON.stringify({ encryptedId, fileSize }),
            headers: {
                'content-type': 'application/json'
            }
        })
    }
    const saveFile = async () => {
        // const blob = await recordWebcam.getRecording(Options);
        const blob = await recordWebcam.getRecording()
        // setEncryptedId(Buffer.from(vidUserId, 'binary').toString('base64'))
        setEncryptedId(btoa(vidUserId))
        const filename = vidUserId
        setFileSize(blob.size)
        var chunkCounter;
        const chunkSize = 50000
        var numberOfChunks = Math.ceil(fileSize / chunkSize)
        var start = 0
        var chunkEnd = start + chunkSize
        console.log(blob)
        // console.log(blob.slice())
        console.log(numberOfChunks)

        for (let i = 0; i < numberOfChunks + 1; i++) {
            let chunk = blob.slice(i * chunkSize, (i + 1) * chunkSize, 'video/mp4')
            console.log(chunk)
            console.log(`uploading chunk: ${i}`)
            await fetch(`http://localhost:3001/api/videos/${encryptedId}_${i}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'video/mp4',
                    'content-length': chunk.length,
                },
                body: chunk,

            })
            // await fetch(`https://ftnsftestvideos.blob.core.windows.net/mycontainer/myblob?comp=block&blockid=${encryptedId}`, {
            //     method: 'PUT',
            //     mode:'no-cors',
            //     headers: {
            //         'Content-Type': 'video/mp4',
            //         // 'content-length': chunk.length,
            //     },
            //     body: chunk,

            // })
            //this line below is important
        }

        // console.log(blob)
        // console.log('first level uploading')
        // await saveVideo(blob)
        // const content = args.url
        // const filename = vidUserId
        // const mimetype = blob.type
        // const encoding = "7bit"
        // const url = window.URL.createObjectURL(blob)
        // var data = [{
        //     filename: vidUserId,
        //     mimetype: blob.type,
        //     encoding: "7bit",
        //     blob: { ...blob }
        // }]
        // blob.filename = vidUserId
        // console.log(blob)
        // console.log({ blob })
        // console.log({ ...blob })
        // console.log(blob.text())
        // console.log(JSON.stringify({ blob }))
        // // console.log(blob)
        // await fetch('http://localhost:3001/api/videos', {
        //     method: 'POST',
        //     body: blob,
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // })
        // console.log("uploaded?")
    };
    const uploadVideo = async () => {
        await saveFile()
        await uploadMe()
    }
    const confirmView = async () => {
        setcamButton("none")
        setStartButton("block")
    }
    const startSession = async () => {
        const username = 'test'
        try {
            // const { data } = await createUser({
            //     variables: { username: "test" }
            // });
            // const payload = {
            //     _id: data.createUser._id
            // }
            // setUser({
            //     type: SET_USER,
            //     payload: payload
            // })
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