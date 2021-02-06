import React from 'react';
import { reduxForm } from 'redux-form';
import {createField, Input, Textarea} from '../../../common/FormControls/formControls';
import s from '../ProfileInfo.module.css';
import {Contact} from '../ProfileInfo';
import style from '../../../login/login.module.css';

const ProfileEditForm = (props) => {

    const closeEditMode = () => {
        props.setProfileEditMode(false);
    }   

    return (
        <form className={s.profileInfo} onSubmit={props.handleSubmit}>
            <div>
                <h3>{props.profile.fullName}:</h3> {createField('inter your name', 'fullName', Input, [])}
            </div>

            <div>
                <p><b>About me:</b> {createField('about me', 'aboutMe', Textarea, [])} </p>
            </div>

            <div>
                <p><b>Looking for a job:</b> {createField('', 'lookingForAJob', 'input', [], {type: 'checkbox'})}</p>
            </div>

            <div>
                <p><b>My Professional skils:</b>{createField('professional skils', 'lookingForAJobDescription', Textarea, [])} </p>
            </div>

            <div className={s.profileContacts}>
                <b>Contacts: </b> {Object.keys(props.profile.contacts).map((objKey) => {
                    return <span> <b>{objKey}: </b>{createField(objKey, 'contacts.'+objKey, Input, [])}</span>
                })}
            </div>
            { props.error && <div className={style.summeryError}>
                {props.error}   
            </div>}
            {props.isOwner && <button>Save</button>}
        </form>
    )
};

const ProfileEditReduxForm = reduxForm({
    form: 'profileEditForm'
}) (ProfileEditForm)

export default ProfileEditReduxForm;