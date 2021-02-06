import React from 'react';
import { Field } from 'redux-form';
import s from './formControls.module.css';

const FormContol = ( {input, meta, child, ...props} ) => {    //Lesson 77
    const hasError = meta.touched && meta.error;

    return (
        <div className={s.formControl + ' ' + (hasError ? s.error : '') }>
            {props.children}
            { hasError && <span> {meta.error} </span> }
        </div>
    )
}

export const Textarea = (props) => {    //Lesson 77
    const {input, meta, child, ...restProps} = props;
    return (
        <FormContol {...props} > <textarea {...input} {...restProps} /> </FormContol>
    )
}

export const Input = ( props ) => {    //Lesson 77
    const {input, meta, child, ...restProps} = props;
    return (
        <FormContol {...props} > <input {...input} {...restProps} /> </FormContol>
    )
}

export const createField = (placeholder, name, component, validate, props={}, text='') => (
    <div>
        <Field placeholder={placeholder} name={name} component={ component } 
            validate={validate} {...props} />  {text}
    </div>
)
    
