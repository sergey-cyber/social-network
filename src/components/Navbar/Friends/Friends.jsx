import React from 'react';
import s from './Friends.module.css';

const Friends = (props) => {
    return (
        <div className={s.friendsItem}>
            <img
                src={props.src}/>
            <div className={s.name}>{props.name}</div>
        </div>
    );
}


export default Friends;