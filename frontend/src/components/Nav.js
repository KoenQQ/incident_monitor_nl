import React from 'react';
import { Navbar } from 'rsuite';

class Nav extends React.Component {
  render() {
    return (
      <Navbar className="nav">
        <Navbar.Header>
          <a href="#">Incidentradar</a>
        </Navbar.Header>
        <Navbar.Body></Navbar.Body>
      </Navbar>
    );
  }
}

export default Nav;
