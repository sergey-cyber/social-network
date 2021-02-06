import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Header.module.css';
import usPhoto from '../../assets/images/userPhoto.png';

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT3CrciMd3yJ0aqA9es5BRa66A6Hja2HmXcBA&usqp=CAU' />
            <div className={s.loginBlock}>
                {props.isAuth ? 
                <div className={s.userPhoto}><img src={!props.userPhoto ? usPhoto : props.userPhoto} />
                    <button onClick={props.logout} >Logout</button>
                </div> 
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
}

export default Header;