import React from 'react';
import style from './users.module.css';
import userPhoto from '../../assets/images/userPhoto.png';
import {NavLink} from "react-router-dom";
import Paginator from '../common/paginator/Paginator';
import Preloader from '../common/preloader/preloader';

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div>
            <Paginator totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} 
                currentPage={props.currentPage} onPageCganged={props.onPageCganged} /> 
            {props.isFetching ? <Preloader /> :    
            props.users.map(u =>
            <div key={u.id} className={style.user}>
                <span>
                    <div>
                        <NavLink to={'/profile/' + u.id}>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                 className={style.userPhoto}/>
                        </NavLink>
                    </div>
                    <div>
                         {u.followed
                        ? <button disabled={props.followingInProgress.some(item=> item==u.id)} onClick={() => {//кнопка дизейблится, 
                            //в ней значение true, сейчас там условие: если хоть один элемент массива = айди юзера, то true
                            props.setUnfollow(u.id);
                        }}>Follow</button>
                        : <button disabled={props.followingInProgress.some(item=> item==u.id)} onClick={() => { //кнопка дизейблится, 
                            //в ней значение true, сейчас там условие: если хоть один элемент массива = айди юзера, то true
                            props.setFollow(u.id);
                            }}>Unfollow</button>}
                    </div>
                </span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
            </div>)}
        </div>
    )
}

export default Users;