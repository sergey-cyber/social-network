import React, { useEffect, useState } from 'react';
import style from './profileStatus.module.css';


const ProfileStatus = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    useEffect(() => {
        setStatus(props.status);
    }, [props.status])
    
    return (
        <div className={style.profileStatus}>
            {!editMode ?
            <div>
                <b>Status:</b> <span onDoubleClick={activateEditMode} >{!props.status ? '_______' : props.status}</span>
            </div>
            : 
            <div>
                <b>Status:</b> <input onChange={onStatusChange} autoFocus={true} 
                        onBlur={deActivateEditMode} value={status} />
            </div>
            }
        </div>           
    );
}

export default ProfileStatus;