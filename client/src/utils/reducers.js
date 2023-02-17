import {
    SET_VOICE
} from './action'

export const reducer = (state, action) => {
    switch (action.type) {
        case SET_VOICE: {
            return {
                ...state,
                ...action.payload
            }
        }
    }
}