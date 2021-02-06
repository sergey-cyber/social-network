import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/objectsHelper";

const FOLLOW = 'it-social/usersPage/FOLLOW';
const UNFOLLOW = 'it-social/usersPage/UNFOLLOW';
const SET_USERS = 'it-social/usersPage/SET_USERS';
const SET_CURRENT_PAGE = 'it-social/usersPage/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'it-social/usersPage/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'it-social/usersPage/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'it-social/usersPage/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 50,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: []
};

const usersReduser = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}
        case SET_TOTAL_USERS_COUNT:
            return{...state, totalUsersCount: action.totalUsersCount}
        case TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {...state, followingInProgress: action.isProgress    //  если в экшене пришло true, то добавляем в массив id, в противном случае удаляем из массива
                ? [...state.followingInProgress, action.userId] 
                : state.followingInProgress.filter(item=> item != action.userId)
            } 
        default:
            return state;
    }
}
    //Action Creators
export const follow = (userId) => ({type: FOLLOW, userId});
export const unfollow = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const toggleIsfetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});
export const toggleIsFollowinfProgress = (isProgress, userId) => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isProgress, userId});

    //Thunks (урок 65,66,67)

export const requestUsers = (currentPage,pageSize) => { //принимает параметры и возвращает санку, в параметры
    //передаются то, что передантся из юай, и функции, которые диспатчатся в санках, получают
    //доступ к этим данным через замыкание,  остальное диспатчится в санке 
    return async (dispatch) => {    
        dispatch(toggleIsfetching(true));
        let data = await usersAPI.setUsers(currentPage, pageSize)
        dispatch(toggleIsfetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        dispatch(setCurrentPage(currentPage))   //data приходит из api из промиса, после того как прийдет ответ с срвака 
    }
}

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowinfProgress(true, userId));
    let response = await apiMethod(userId);
    if(response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleIsFollowinfProgress(false, userId));
}

export const setFollow = (userId) => { 
    return (dispatch) => {    
        followUnfollowFlow(dispatch, userId, usersAPI.setFollow.bind(usersAPI), follow);
    }
}

export const setUnfollow = (userId) => { 
    return async (dispatch) => {    
        followUnfollowFlow(dispatch, userId, usersAPI.setUnfollow.bind(userId), unfollow);
    }
}

export default usersReduser;