import {AUTHENTICATE} from '../actions/auth';


const initialState = {
    userId: null,
    token: null,
    name: null
}


export default (state = initialState, action) => {
    switch(action.type){
        case AUTHENTICATE:
            return{
                userId: action.userId,
                token:action.token,
                name: action.name
            };
            
        default:
            return state;
    }
}