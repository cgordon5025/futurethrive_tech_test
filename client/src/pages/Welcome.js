import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { RecordWebcam, useRecordWebcam } from 'react-record-webcam'
const Welcome = ({ camStatus, setCamStatus, recordWebcam }) => {

    // const recordWebcam = useRecordWebcam({ frameRate: 60 })
    const openCam = () => {
        setCamStatus(recordWebcam.open)
    }
    return (
        <>
            <p>Welcome statement about confidentiality and such</p>
            <Link to="/Assessment">
                <Button onClick={openCam}>Lets begin</Button>
            </Link>
        </>
    )
}

export default Welcome