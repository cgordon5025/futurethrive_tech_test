import './App.css';
import React, { useState, useReducer } from 'react';
import Button from "react-bootstrap/Button";

import Auth from './utils/auth'
import { Routes, Route } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { RecordWebcam, useRecordWebcam } from 'react-record-webcam'
import VoiceContext from './utils/VoiceContext';
import { reducer } from './utils/reducers';
import { SET_VOICE } from './utils/action';
import { useTts } from 'tts-react';
import { TextToSpeech } from 'tts-react';
//import the pages
import Assessment from './pages/Assessment';
import Welcome from './pages/Welcome';
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('id_token');
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql'
});

//TODO: create .env file with config variables, such that it will always point to port 3001 when running
// const httpLink = createHttpLink({
//   uri: `${window.location}/graphql/`
// })
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})
// useEffect(() => {
//   recordWebcam.open()
// }, [])
// useEffect(() => {
//   if (camStatus == true) {
//     recordWebcam.stop()
//   }
// })
function App() {
  const rate = .8;
  const synth = window.speechSynthesis;
  //leave below code in case we want to switch voices
  //however please check between chrome book, windows and mac to see if the voice is consitent across all three, there is a difference in availability between chrome on the mac vs windows
  // const voices = synth.getVoices().sort(function (a, b,) {
  //   const aname = a.name.toUpperCase();
  //   const bname = b.name.toUpperCase();
  //   if (aname < bname) {
  //     return -1;
  //   } else if (aname == bname) {
  //     return 0;
  //   } else {
  //     return +1;
  //   }
  // })
  // console.log(voices)

  return (
    <ApolloProvider client={client}>

      <Welcome />
      {/* <div className="App">
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
        <div> */}
      {/* this renders an open/close/start/stop and download button look into ways to get a save to server/autosave to server */}
      {/* <RecordWebcam options={Options} /> */}
      {/* <p>Camera status: {recordWebcam.status}</p>
          <button onClick={recordWebcam.open}>Open camera</button>
          <button onClick={recordWebcam.start}>Start recording</button>
          <button onClick={recordWebcam.stop}>Stop recording</button>
          <button onClick={recordWebcam.retake}>Retake recording</button>
          <button onClick={recordWebcam.download}>Download recording</button>
          <button onClick={saveFile}>Save file to server</button> */}
      {/* <video ref={recordWebcam.webcamRef} autoPlay muted /> */}
      {/* <video ref={recordWebcam.previewRef} autoPlay muted loop /> */}
      {/* </div>
        <div style={{ display: assessmentDisplay }}>
          <Assessment setCamStatus={setCamStatus} setAssessmentDisplay={setAssessmentDisplay} setEndDisplay={setEndDisplay} />
        </div>
        <div style={{ display: endDisplay }}>
          <div className='WelcomeContainer'>
            <p>You have completed this</p>
            <p>More instructions to follow, include a timeout portion such that it'll log them out, restart the app etc</p>
          </div>
        </div>
      </div> */}
    </ApolloProvider>
  );
}

export default App;
