import React from 'react';
import s from './Dialogs.module.css';
import DialogsItem from "./DialogItem/DialogsItem";
import Massage from "./Massage/Massage";
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../common/FormControls/formControls';
import { maxLengthCreator, requireField } from '../../utils/validators/validators';

const maxLength50 = maxLengthCreator(50);

const DialogsForm = (props) => {
    return (
        <form onSubmit = {props.handleSubmit} >
            <Field placeholder='inter massage' component={Textarea} name='dialogsMassege'
                validate={[ requireField, maxLength50 ]} />
            <button> Send massage </button>
        </form>
    )
}//Field Lesson 75
//handleSubmit приходит из redux form и отменяет дефлтное поведение формы и не перезагружает
// страницу когда сабмитим форму Lesson 75

const DialogsReduxForm = reduxForm ({  
    form: 'dialogs'   //Имя формы, которое будет отображаться как объект в стэйте
})(DialogsForm); //сюда вставляем форму, которую хотим обернуть в ReduxForm 

const Dialogs = (props) => {

    let dialogElements = props.massagesPage.dialogs.map(dialog => <DialogsItem name={dialog.name} id={dialog.id} src={dialog.src}/>);
    let massageElemenets = props.massagesPage.massages.map(massage => <Massage text={massage.massage}/>);

    const onSubmit = (formData) =>{ //в атрибут приходят все данные из формы
        props.onSendMassageClick(formData.dialogsMassege);
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItem}>
                {dialogElements}
            </div>
            <div className={s.massages}>
                <div>{massageElemenets}</div>
                <div className={s.massageControl}>
                    <DialogsReduxForm onSubmit={onSubmit} />
                </div>
            </div>
        </div>
    )
}

export default Dialogs;