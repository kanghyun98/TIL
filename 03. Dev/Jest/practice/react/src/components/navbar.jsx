import React, { PureComponent } from 'react';

class Navbar extends PureComponent {
  render() {
    return (
      <div className="navbar">
        <i className={'navbar-logo fas fa-leaf'}></i>
        <span>Todo App</span>
        <span className="navbar-count">{this.props.totalCount}</span>
      </div>
    );
  }
}

export default Navbar;
