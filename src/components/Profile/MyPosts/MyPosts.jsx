import React from 'react';
import Post from './../Post/Post'
import s from './MyPosts.module.css';
import { Field, reduxForm } from 'redux-form';
import { requireField, maxLengthCreator } from "../../../utils/validators/validators";
import { Textarea } from '../../common/FormControls/formControls';

const maxLength10 = maxLengthCreator(10);

const MyPostsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='postValue' component={Textarea} 
                    placeholder='Enter massage' validate={[ requireField, maxLength10 ]} />
            </div>
            <button>Add Post</button> 
        </form>
    )   //В validate передается массив с нужными валидаторами для этого филда 
}

const MyPostReduxForm = reduxForm ({  
    form: 'myPosts'   //Имя формы, которое будет отображаться как объект в стэйте
})(MyPostsForm); //сюда вставляем форму, которую хотим обернуть в ReduxForm 


const MyPosts = React.memo((props) => { //React memo Lesson 87, компонент не перерисовывается если пропсы не меняются
    console.log('RENDER')
    let postElements = props.profilePage.posts.map( post => <Post massage={post.massage} like= {post.likeCount} src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTC4jRg1btnvqAdcADoMgIw6RyQIXMOpZw-kg&usqp=CAU'/>)

    let onSubmit = (formData) => {  //в onSubmit приходят все данные из формы
        props.addPost(formData.postValue);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My Posts</h3>
            <div className={s.postsControl}>
                <MyPostReduxForm onSubmit={onSubmit} />
            </div>
                {postElements}
        </div>
    );
});

export default MyPosts;