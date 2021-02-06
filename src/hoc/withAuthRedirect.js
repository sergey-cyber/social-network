import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

let mapStateToPropsForRedirect = (state) => {   //lesson 69 
    return {
        isAuth: state.auth.isAuth
    }
}

export const withAuthRedirect = (Compnent) => { //эта функция создает принимает контэйнерную компоненту 
    //и оборачивает ее еще в две контэйнерные компоненты для редиректа
    class RedirectComponent extends React.Component {
        render () {
            if(!this.props.isAuth) return <Redirect to={'/login'} />
            return <Compnent {...this.props} />
        }
    } 
    let ConectAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent); //Leson 69
    return ConectAuthRedirectComponent;
}

