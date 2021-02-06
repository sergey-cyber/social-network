import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { getUserProfile, getUserStatus, updateUserStatus, saveAvaPhoto, saveProfileData} from '../../Redux/Profile-reducer';
import { Redirect, withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

    refreshProfile () {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.autorizedUserId;
            if(!userId) {
                this.props.history.push('/login');  //This redirect on login ( Lesson 80 )
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {  
        this.refreshProfile();
    };

    componentDidUpdate(prevPropps) {
        if(this.props.match.params.userId != prevPropps.match.params.userId) {
            this.refreshProfile();
        }
    }

    render() {
        return (
            <Profile {...this.props} status = {this.props.status} 
                updateStatus={this.props.updateUserStatus} 
                isOwner={!this.props.match.params.userId} 
                saveAvaPhoto ={this.props.saveAvaPhoto} 
                saveProfileData={this.props.saveProfileData} /> //Если в урле нет id тогда можно отобразить инпут для смены аватарки
                //! переводит isOwner в false если значения нет и в true если есть
        );
    }   
}

let mapStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
        avatarIsFetching: state.profilePage.avatarIsFetching,
        status: state.profilePage.profileStatus,
        autorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    }
}

export default compose(
    connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus, saveAvaPhoto, saveProfileData }),
    withRouter, //через withRouter считываются данные из урла(60 урок) и приходят в пропсах
    //withAuthRedirect    //Redirect урок 69 запрещает попадать на страницу если не залогинен
)(ProfileContainer);
