import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import Friends from "./Friends/Friends";

const Navbar = (props) => {

    //let friend = props.friends.map( friend => <Friends name={friend.name} id={friend.id} src={friend.src}/>);

    return (
        <nav className={s.nav}>
            <div className = {s.item}>
                <NavLink to='/Profile' activeClassName={s.active}>Profile</NavLink>
            </div>
            <div className = {s.item}>
                <NavLink to='/Dialogs' activeClassName={s.active}>Masseges</NavLink>
            </div>
            <div className = {s.item}>
                <NavLink to='/users' activeClassName={s.active}>Users</NavLink>
            </div>
            <div className = {s.item}>
                <NavLink to='#'>News</NavLink>
            </div>
            {/* <h1 className={s.friendsTitle}>Friends</h1>
            <div className={s.friends}>
                <Friends />
            </div> */}
        </nav>
    );
}

export default Navbar;