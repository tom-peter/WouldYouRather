import React from 'react';

class Nav extends React.Component {

  render() {
    return (
      <div>
        <h3>Nav - {this.props.location.pathname}</h3>
      </div>
    );
  }
}

export default Nav;
