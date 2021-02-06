import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'it-social/profilePage/ADD-POST';
const SET_USER_PROFILE = 'it-social/profilePage/SET_USER_PROFILE';
const SET_AVATAR_ISFETCHING = 'it-social/profilePage/SET_AVATAR_ISFETCHING';
const SET_STATUS = 'it-social/profilePage/SET_STATUS';
const SET_PHOTO_SUCCES = 'it-social/profilePage/SET_PHOTO_SUCCES';

let initialState = {
    posts: [
        {id: 1, massage: 'Hi how are you?', likeCount: 23},
        {id: 2, massage: 'I love REACT', likeCount: 53},
        {id: 2, massage: 'I love REACT', likeCount: 53}
    ],
    profile: null,
    avatarIsFetching: true,
    profileStatus: ''
};

const profileReduser = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST:
            return {
                ...state,   
                posts: [...state.posts, {id: 5, massage: action.postValue, likeCount: 1}]  //вместо метода push добавляем вручную объект в массив
            };
        case SET_STATUS:
            return {
                ...state,   
                profileStatus: action.status
            };    
        case SET_USER_PROFILE:
            return {...state, profile: action.profile};
        case SET_AVATAR_ISFETCHING:
            return {...state, avatarIsFetching: action.isFetching};
        case SET_PHOTO_SUCCES: {
            return {...state, profile: {...state.profile, photos: action.photos}};
        }
        default:
            return state;
    }
}

    //Action Creators

export const addPostActionCreater = (postValue) =>  ({type: ADD_POST, postValue});
export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});
export const setAvatarIsFetching = (isFetching) => {
    return {type: SET_AVATAR_ISFETCHING, isFetching};
}
export const setStatus = (status) => {
    return {type: SET_STATUS, status};
}
const savePhotoSucess = (photos) => ({type: SET_PHOTO_SUCCES, photos});

    //Thunks

export const getUserProfile = (usId) => {
    return async (dispatch) => {
        let userId = usId;
        dispatch(setAvatarIsFetching(true)); 
        let response = await usersAPI.getProfile(userId)
        dispatch(setAvatarIsFetching(false));
        dispatch(setUserProfile(response.data));
    }
}

export const getUserStatus = (userId) => {
    return async (dispatch) => { 
        let response = await profileAPI.getStatus(userId)
        dispatch(setStatus(response.data));
    }
}

export const updateUserStatus = (status) => {
    return async (dispatch) => { 
        let response = await profileAPI.updateStatus(status)
        if(response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    }
}

export const saveAvaPhoto = (file) => {
    return async (dispatch) => { 
        let response = await profileAPI.savePhoto(file)
        if(response.data.resultCode === 0) {
            dispatch(savePhotoSucess(response.data.data.photos));
        }
    }
}

export default profileReduser;