import {
    SET_USER
} from './action'

export const reducer = (state, action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                ...action.payload
            }
        }
    }
}