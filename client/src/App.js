import logo from './logo.svg';
import './App.css';
import { RecordWebcam, useRecordWebcam } from 'react-record-webcam'
function App() {
  const recordWebcam = useRecordWebcam({ frameRate: 60 })
  const saveFile = async () => {
    const blob = await recordWebcam.getRecording();
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <p>Camera status: {recordWebcam.status}</p>
        <button onClick={recordWebcam.open}>Open camera</button>
        <button onClick={recordWebcam.start}>Start recording</button>
        <button onClick={recordWebcam.stop}>Stop recording</button>
        <button onClick={recordWebcam.retake}>Retake recording</button>
        <button onClick={recordWebcam.download}>Download recording</button>
        <button onClick={saveFile}>Save file to server</button>
        <video ref={recordWebcam.webcamRef} autoPlay muted />
        <video ref={recordWebcam.previewRef} autoPlay muted loop />
      </div>
    </div>
  );
}

export default App;
