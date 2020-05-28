import React from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';

import { setAuthedUser } from '../actions/authedUser'

class Nav extends React.Component {

  logout() {
    this.props.dispatch(setAuthedUser(null));
  }

  render() {
    
    // NavLink workaround to show active class
    const isActive = (path, match, location) => !!(match || path === location.pathname);

    const authedUserAvatar = this.props.users[this.props.authedUser].avatarURL;
    const authedUserName = this.props.users[this.props.authedUser].name;

    return (
      <div className='navbar'>
        <NavLink exact to="/" className="navitem" isActive={isActive.bind(this, '/')} activeClassName="nav-active">Home</NavLink>
        <NavLink exact to="/add" className="navitem" isActive={isActive.bind(this, '/add')} activeClassName="nav-active">New Poll</NavLink>
        <NavLink exact to="/leaderboard" className="navitem" isActive={isActive.bind(this, '/leaderboard')} activeClassName="nav-active">Leaderboard</NavLink>
        <div>{this.props.location.pathname}</div>
        <img className="nav-avatar" src={ authedUserAvatar } alt={ authedUserName } />
        <div className="nav-name">{authedUserName}</div>          
        <div onClick={ (e) => this.logout() } className="pointer">Logout</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ( state === null ) ? {} : state;
}

export default connect(mapStateToProps)(Nav);
