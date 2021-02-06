import React from 'react';
import {
    setCurrentPage,
    requestUsers,
    setUnfollow,
    setFollow
} from "../../Redux/Users-reducer";
import {connect} from "react-redux";
import Users from "./Users";
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import {getCurrentPage, getFollowwingInProgress, getPageSze, getIsFetching, getTotalUserCount, getUsers} from '../../Redux/selectors/usersSelector';

class UsersContainer extends React.Component {  
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    };

    onPageCganged = (pageNumber) => {
        this.props.requestUsers(pageNumber, this.props.pageSize);
    };

    render = () => {
        return <>
            <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currentPage={this.props.currentPage}
                    onPageCganged={this.onPageCganged}
                    users={this.props.users}
                    followingInProgress={this.props.followingInProgress}
                    setUnfollow={this.props.setUnfollow} 
                    setFollow={this.props.setFollow} 
                    isFetching={this.props.isFetching} />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSze(state),
        totalUsersCount: getTotalUserCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowwingInProgress(state)
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {  //через конект происходит общение со стором  
        setCurrentPage, //а так как ключ и значение совпадают пишем только ключ
        requestUsers,
        setUnfollow,
        setFollow
    })
)(UsersContainer);

