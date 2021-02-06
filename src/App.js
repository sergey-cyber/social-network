import React, { Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import './components/Header/Header.module.css';
import './components/Navbar/Navbar.module.css';
import './components/Profile/Profile.module.css';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
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
                <Switch>    {/*Пробегается по всем роутам и если находит совпадение не ищет дальше Lesson 99*/} 
                    <Route exact path='/'   /* exact - если путь совпадает точь в точь */
                        render={() => <Redirect to='/Profile'/>} >
                    </Route>
                    <Route exact path='/social-network' 
                        render={() => <Redirect to='/Profile'/>} >
                    </Route>
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
                    <Route path='*' /* Если вбит урл на который нет роута */
                        render={() => <div>404 NOT FOUND</div>}/> 
                </Switch>         
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
