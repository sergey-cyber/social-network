import { authAPI } from "../api/api";
import { stopSubmit } from 'redux-form';

const SET_USER_DATA = 'it-social/auth/SET_USER_DATA';
const SET_USER_PHOTO = 'it-social/auth/SET_USER_PHOTO';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    userPhoto: 0
};

const authReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
            }
        case SET_USER_PHOTO:
            return {
                ...state,
                userPhoto: action.photo
            }
        default:
            return state;
    }
}

//Action Creators

export const setAuthUserData = (userId, login, email, isAuth) => {
    return { type: SET_USER_DATA, data: { userId, login, email, isAuth } };
}
export const setAuthUserPhoto = (photo) => {
    return { type: SET_USER_PHOTO, photo };
}

//Thunks

export const setAuth = () => {
    return (dispatch) => {
        return authAPI.me().then(response => {
            if (response.data.resultCode === 0) {
                let { id, login, email } = response.data.data;
                dispatch(setAuthUserData(id, login, email, true));
                authAPI.authPhoto().then(response => {
                    let users = response.data.items;
                    let userPhoto;
                    users.forEach((el, i) => {
                        if (el.id == 12406) {
                            userPhoto = el.photos.large;
                        }
                    });
                    dispatch(setAuthUserPhoto(userPhoto));
                });
            }
        });
    }
}

export const login = (email, password, rememberMe) => { //Lesson 78
    return async (dispatch) => {
        let response = await authAPI.login(email, password, rememberMe);
        if (response.data.resultCode === 0) {
            dispatch(setAuth());
        } else {
            dispatch(stopSubmit('login', { _error: 'Error in password or email' })); //Lesson 79
        }
    }
}

export const logout = () => {    //Lesson 78
    return async (dispatch) => {
        let response = await authAPI.logout();
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }
    }
}

export default authReduser;