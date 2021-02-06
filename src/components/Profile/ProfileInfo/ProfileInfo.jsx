import React, { useState } from 'react';
import s from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/preloader';
import falseAvatar from '../../../assets/images/userPhoto.png';
import ProfileStatus from './profileStatus/profileStatus';

const ProfileInfo = (props) => {

    const [profileEditMode, setProfileEditMode] = useState(false);

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.saveAvaPhoto(e.target.files[0]);
        }
    }

    return (
        <div>
            <div className={s.discriptionBlock}>
                <div className={s.profileAva}>
                    {props.avatarIsFetching ? <Preloader className={s.preloader} /> :
                        <img src={props.profile.photos.large
                            ? props.profile.photos.large
                            : falseAvatar} />}
                    {props.isOwner && <input type='file' onChange={onMainPhotoSelected} />}
                </div>
                {profileEditMode ? <ProfileDataForm profile={props.profile} isOwner={props.isOwner}
                     setProfileEditMode={setProfileEditMode} />
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
                <h3>{props.profile.fullName}</h3>
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

            <div className={s.profileContacts}>
                <b>Contacts: </b> {Object.keys(props.profile.contacts).map((objKey) => {
                    return <Contact key={objKey} contantTitle={objKey} contactValue={props.profile.contacts[objKey]} />
                })}
            </div>
            {props.isOwner && <button onClick={goToEditMode}>Edit</button>}
        </div>
    )
};

const ProfileDataForm = (props) => {

    const closeEditMode = () => {
        props.setProfileEditMode(false);
    }

    return (
        <div className={s.profileInfo}>
            <div>
                <h3>{props.profile.fullName}</h3>
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

            <div className={s.profileContacts}>
                <b>Contacts: </b> {Object.keys(props.profile.contacts).map((objKey) => {
                    return <Contact key={objKey} contantTitle={objKey} contactValue={props.profile.contacts[objKey]} />
                })}
            </div>
            {props.isOwner && <button onClick={closeEditMode}>Save</button>}
        </div>
    )
};

const Contact = ({ contantTitle, contactValue }) => {
    return <div className={s.contact}><b>{contantTitle}: </b>{contactValue}</div>
}

export default ProfileInfo;