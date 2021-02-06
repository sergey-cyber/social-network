import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import usPhoto from '../../assets/images/userPhoto.png';
import headerLogo from '../../assets/images/logo.jpg';

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src={headerLogo}  />
            <div className={s.loginBlock}>
                {props.isAuth ? 
                <div className={s.userPhoto}><img src={!props.profile ? usPhoto : props.profile.photos.large} />
                    <button onClick={props.logout} >Logout</button>
                </div> 
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header;