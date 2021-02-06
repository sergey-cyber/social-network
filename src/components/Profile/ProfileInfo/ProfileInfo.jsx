import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/preloader';
import falseAvatar from '../../../assets/images/userPhoto.png';
import ProfileStatus from './profileStatus/profileStatus';
import ProfileEditReduxForm from './profileEditForm/profileEditForm';
import changePhotoImg from '../../../assets/images/addPhoto.png';
import ContactsList from './Contacts'

const ProfileInfo = (props) => {

    const [profileEditMode, setProfileEditMode] = useState(false);

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.saveAvaPhoto(e.target.files[0]);
        }
    }

    const onSubmitProfileData = (formData) => {
        props.saveProfileData(formData).then(
            ()=> {
                setProfileEditMode(false);  //выключаем форму только если с сервака пришел ответ без ошибки Lesson 97
            }
        );  
    }

    return (
        <div>
            <div className={s.discriptionBlock}>
                <div className={s.profileAva}>
                    {props.avatarIsFetching ? <Preloader className={s.preloader} /> :
                        <img src={props.profile.photos.large
                            ? props.profile.photos.large
                            : falseAvatar} />}
                    {props.isOwner && 
                        <label className={s.inputLabel}>
                            <input type='file' onChange={onMainPhotoSelected} className={s.addPhoto} /> 
                            <img alt='' src={changePhotoImg} />
                        </label>}
                </div>
                {profileEditMode ? <ProfileEditReduxForm onSubmit={onSubmitProfileData} profile={props.profile} isOwner={props.isOwner}
                     setProfileEditMode={setProfileEditMode} initialValues={props.profile} />
                 : <ProfileData profile={props.profile} isOwner={props.isOwner}
                     setProfileEditMode={setProfileEditMode} />}       
                <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    );
};

const ProfileData = (props) => {

    const goToEditMode =() => {
        props.setProfileEditMode(true);
    } 

    return (
        <div className={s.profileInfo}>
            <div>
                <h3 className={s.profileFullName}>{props.profile.fullName}</h3>
            </div>

            <div>
                <p><b>About me:</b> {props.profile.aboutMe}</p>
            </div>

            <div>
                <p><b>Looking for a job:</b> {props.profile.lokingForAJob ? 'yes' : 'no'}</p>
            </div>
            {props.profile.lokingForAJob &&
                <div>
                    <p><b>My Professional skils:</b> {props.profile.lokingForAJobDescription}</p>
                </div>
            }
            <ContactsList profile={props.profile} isOwner={props.isOwner} goToEditMode={goToEditMode} />
        </div>
    )
};

const Contact = ({ contantTitle, contactValue }) => {
    return <div className={s.contact}><b>{contantTitle}: </b><a href={contactValue} target='_blank' >{contactValue}</a></div>
}

export default ProfileInfo;