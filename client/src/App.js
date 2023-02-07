import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { RecordWebcam, useRecordWebcam } from 'react-record-webcam'
//import the pages
import Assessment from './pages/Assessment';
import Welcome from './pages/Welcome';
function App() {
  const [camStatus, setCamStatus] = useState()

  const recordWebcam = useRecordWebcam({ frameRate: 60 })
  console.log(recordWebcam)
  const saveFile = async () => {
    const blob = await recordWebcam.getRecording();
  }
  return (
    <div className="App">
      {/* <Welcome camStatus={camStatus} setCamStatus={setCamStatus} recordWebcam={recordWebcam} /> */}
      <Routes>
        <Route path="/" element={<Welcome />} camStatus={camStatus} setCamStatus={setCamStatus} recordWebcam={recordWebcam}/>
        <Route path="/Assessment" element={<Assessment />} />
      </Routes>
      {/* <Assessment /> */}
      <div>
        {/* <p>Camera status: {recordWebcam.status}</p>
        <button onClick={recordWebcam.open}>Open camera</button>
        <button onClick={recordWebcam.start}>Start recording</button>
        <button onClick={recordWebcam.stop}>Stop recording</button>
        <button onClick={recordWebcam.retake}>Retake recording</button>
        <button onClick={recordWebcam.download}>Download recording</button>
        <button onClick={saveFile}>Save file to server</button>
        <video ref={recordWebcam.webcamRef} autoPlay muted />
        <video ref={recordWebcam.previewRef} autoPlay muted loop /> */}
      </div>
    </div>
  );
}

export default App;
