import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import { login, logout } from '../../Redux/Auth-reducer';
import { maxLengthCreator, requireField } from '../../utils/validators/validators';
import { createField, Input } from '../common/FormControls/formControls';
import style from './login.module.css';

const maxLength30 = maxLengthCreator(30);

const LoginForm = ({handleSubmit, error}) => {
    return (        
        <form onSubmit = {handleSubmit} className={style.loginForm} >  
            {createField('email', 'email', Input, [requireField, maxLength30])}
            {createField('password', 'password', Input, [requireField, maxLength30], {type: "password"})}
            {createField(null, 'rememberMe', 'input', null, {type: "checkbox"}, 'Remember me')}
            { error && <div className={style.summeryError}>
                {error}   
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>      
    )
}           //Field Lesson 75
//handleSubmit приходит из redux form и отменяет дефлтное поведение формы и не перезагружает
// страницу когда сабмитим форму Lesson 75

const LoginReduxForm = reduxForm ({  
    form: 'login'   //Имя формы, которое будет отображаться как объект в стэйте
})(LoginForm); //сюда вставляем форму, которую хотим обернуть в ReduxForm 

const Login = (props) => {

    const onSubmit = (formData) =>{ //в onSubmit приходят все данные из формы
        console.log(formData)
        props.login(formData.email, formData.password, formData.rememberMe);    //Lesson 78
    }

    if(props.isAuth) {
        return <Redirect to={'/profile'} />
    }

    return(
        <div className={style.login}>
            <h1 className={style.loginTitle}> Login </h1>
            <LoginReduxForm onSubmit={onSubmit} />
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect( mapStateToProps, {login, logout} )(Login); //Lesson 78