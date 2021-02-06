import { setAuth } from "./Auth-reducer";

const INITIALIZED_SUCCESS = 'it-social/app/INITIALIZED_SUCCESS';
 
let initialState = {
    initialized: false
};

const appReduser = (state = initialState, action) => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }    
        default:
            return state;
    }
}

//Action creators

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });    //Lesson 80

//Thunks creators

export const initializeApp = () => (dispatch) => { //Lesson 80
    let promise = dispatch(setAuth());
    promise.then( () => {
        dispatch(initializedSuccess());
    });  
}

export default appReduser;