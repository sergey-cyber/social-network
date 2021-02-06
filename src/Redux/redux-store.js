import {applyMiddleware, combineReducers, createStore} from "redux";
import sidebarReduser from "./Sidebar-Reduser";
import profileReduser from "./Profile-reducer";
import dialogsReduser from "./Dialogs-reduser";
import usersReduser from "./Users-reducer";
import authReduser from "./Auth-reducer";
import thunkMiddleware from "redux-thunk";  
import { reducer as formReducer } from 'redux-form'
import appReduser from "./app-reducer";

let redusers = combineReducers({
    profilePage: profileReduser,
    massagesPage: dialogsReduser,
    sidebar: sidebarReduser,
    usersPage: usersReduser,
    auth: authReduser,
    app: appReduser,
    form: formReducer   //redux-form Lesson 75
});

let store = createStore(redusers, applyMiddleware(thunkMiddleware));
window.store = store;

export default store;
