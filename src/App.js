import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import './components/Header/Header.module.css';
import './components/Navbar/Navbar.module.css';
import './components/Profile/Profile.module.css';
import {Route, withRouter} from 'react-router-dom';
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/login/login';
import { initializeApp } from './Redux/app-reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Preloader from './components/common/preloader/preloader';
const DialogsContainer = React.lazy(() => import("./components/Dialogs/DilogsContainer")); //Lazy Load Lesson 94
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer")); 

class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader />
        } 
        return (
            <div className="app-wraper">
                <HeaderContainer />
                <Navbar />
                <div className='app-wraper-content  '>
                    <Route path='/Profile/:userId?'
                        render={() => {
                            return <Suspense fallback={<div>Loading...</div>} > {/* Suspense for Lazy Loading Lesson 94 */}
                                <ProfileContainer />
                            </Suspense>
                        }}/>
                    <Route path='/Dialogs'
                        render={() => {
                        return <Suspense fallback={<div>Loading...</div>} >
                            <DialogsContainer />
                        </Suspense> 
                        }}/>
                    <Route path='/users'
                        render={() => <UsersContainer />}/>
                    <Route path='/login'
                        render={() => <Login />}/>       
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
});

export default compose(
    withRouter,
    connect (mapStateToProps, {initializeApp})) (App);
