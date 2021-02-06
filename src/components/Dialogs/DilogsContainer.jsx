import React from 'react';
import {sendMassageCreator} from "../../Redux/Dialogs-reduser";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        massagesPage: state.massagesPage, //передает в Dialogs пропсы props.massagesPage из state
        isAuth: state.auth.isAuth
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onSendMassageClick: (dialogsMassege) => {
            dispatch(sendMassageCreator(dialogsMassege));
        }
    }
}

export default compose( //lesson 70, compose как конвеер, вызывает функции снизу вверх
    // и в верхнюю функцию засовывает то, что вернула нижняя
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect  //Redirect урок 69 HOC
)(Dialogs);


