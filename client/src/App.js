import './App.css';
import React, { useState, useReducer, useEffect } from 'react';
import Button from "react-bootstrap/Button";

import Auth from './utils/auth'
import { setContext } from '@apollo/client/link/context'
import { Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { RecordWebcam, useRecordWebcam } from 'react-record-webcam'
//import the pages
import Assessment from './pages/Assessment';
// import Welcome from './pages/Welcome';
// import CameraControls from './components/CameraControl';
// import recordWebcam from './utils/cameraControls';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const httpLink = createHttpLink({
  uri: '/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

function App() {
  const [welcomeDisplay, setWelcomeDisplay] = useState("flex-root")
  const [assessmentDisplay, setAssessmentDisplay] = useState("none")
  const [endDisplay, setEndDisplay] = useState("none")
  const [camButton, setcamButton] = useState("block")
  const [startButton, setStartButton] = useState("none")
  const [camStatus, setCamStatus] = useState(false)
  const recordWebcam = useRecordWebcam({ frameRate: 60 })
  const saveFile = async () => {
    const blob = await recordWebcam.getRecording();
  };
  console.log(recordWebcam.status)
  useEffect(() => {
    recordWebcam.open()
  }, [])
  useEffect(() => {
    if (camStatus == true) {
      recordWebcam.stop()
    }
  })

  const confirmView = async () => {
    setcamButton("none")
    setStartButton("block")
  }
  const startSession = async () => {
    // await recordWebcam.open()
    await recordWebcam.start()
    setWelcomeDisplay("none")
    setAssessmentDisplay("block")
    // window.location.replace('/Assessment')
  }

  return (
    <ApolloProvider client={client}>
      <div className="App">
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
          <Assessment camStatus={camStatus} setCamStatus={setCamStatus} setAssessmentDisplay={setAssessmentDisplay} setEndDisplay={setEndDisplay} />
        </div>
        <div style={{ display: endDisplay }}>
          <div className='WelcomeContainer'>
            <p>You have completed this</p>
            <p>More instructions to follow, include a timeout portion such that it'll log them out, restart the app etc</p>
          </div>
        </div>
        {/* <Routes>
          <Route path="/Assessment" element={<Assessment />} />
        </Routes> */}
        {/* <Assessment /> */}
        {/* <CameraControls /> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
