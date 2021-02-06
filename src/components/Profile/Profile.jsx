import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import Preloader from '../common/preloader/preloader';

const Profile = (props) => {
    if(!props.profile) {
        return <Preloader />
    }
    return (
        <div className={s.profile}>
            <ProfileInfo profile={props.profile} 
                         isOwner={props.isOwner}
                         avatarIsFetching={props.avatarIsFetching} 
                         status={props.status}
                         updateStatus={props.updateStatus} 
                         saveAvaPhoto={props.saveAvaPhoto} />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;