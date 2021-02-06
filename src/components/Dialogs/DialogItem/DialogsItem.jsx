import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

const DialogsItem = (props) => {
    return(
        <div className={`${s.dialog}`}>
            <img src={props.src}/>
            <NavLink to={'/dialogs/'+props.id}>{props.name}</NavLink>
        </div>
    )
}

export default DialogsItem;