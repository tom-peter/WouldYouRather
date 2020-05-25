import React from 'react';
import { connect } from 'react-redux';

class Nav extends React.Component {

  render() {
    return (
      <div>
        <h3>Nav - {this.props.location.pathname} - {this.props.authedUser}</h3>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return ( state === null ) ? { authedUser: null } : state;
}

export default connect(mapStateToProps)(Nav);
