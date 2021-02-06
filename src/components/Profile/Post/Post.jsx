import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return (
        <div className={s.item}>
            <img  src= {props.src} />
                {props.massage}
            <div>
                <span>Like</span> {props.like}  
            </div>        
        </div>

    );
}

export default Post;