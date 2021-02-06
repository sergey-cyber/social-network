import React from 'react';
import s from './../Dialogs.module.css';

const Massage = (props) => {
    return (
        <div className={s.massage}>{props.text}</div>
    )
}

export default Massage;