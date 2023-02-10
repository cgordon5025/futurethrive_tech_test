import {
    OPEN_CAMERA,
    RECORD_VIDEO,
    STOP_VIDEO,
    EXPORT_VIDEO
} from './action'

import recordWebcam from './cameraControls'
export const reducer = (state, action) => {
    switch (action.type) {
        case OPEN_CAMERA: {
            const open_cam = { ...action.payload }
            return {
                ...state, open_cam
            }
        }
        case RECORD_VIDEO: {

        }
        case STOP_VIDEO: {

        }
        case EXPORT_VIDEO: {

        }
    }
}