import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AL} from '../actions/auth';


const initialState = {
    userId: null,
    token: null,
    didTryAutoLogin: false
}


export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                userId: action.userId,
                token: action.token
            };
        
        case LOGOUT:
            return {
               ...initialState,
               didTryAutoLogin: true 
            };

        case SET_DID_TRY_AL:
            return {
                ...state,
                didTryAutoLogin: true
            };

        default:
            return state;
    }
}