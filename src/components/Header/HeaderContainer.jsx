import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { logout } from './../../Redux/Auth-reducer';

class HeaderContainer extends React.Component {

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userId: state.auth.userId,
    userPhoto: state.auth.userPhoto
});

export default connect (mapStateToProps, {logout}) (HeaderContainer);