import React from 'react';
import {addPostActionCreater} from "../../../Redux/Profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        profilePage: state.profilePage //передает в MyPost пропсы props.profilePage из state
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (postValue) => {
            dispatch(addPostActionCreater(postValue));
        }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts); //во вторых скобках указано в какую компоненту передаются пропсы и колбэки
//функция connect создает контэйнерную компоненту
//смотреть документацию и видео димыча про копирование объектов
export default MyPostsContainer;