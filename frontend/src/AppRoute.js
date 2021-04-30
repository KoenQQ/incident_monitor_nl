// Dit wordt de automatische routing file die kijkt of de gebruiker
// naar home (index.js) of login (login.js) gaat
//

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Button, ButtonToolbar, Header } from 'rsuite';

import Application from './components/Application';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';

const apiUrl = process.env.REACT_APP_API_URL;

class AppRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayed_form: '',
      logged_in: localStorage.getItem('token') ? true : false,
      username: ''
    };
  }
  
  componentDidMount() {
    // @Koen: Deze lifecycle hook werd nooit aangeroepen vanwege de hoofdletter C
    //if logged in, change username in state
    // naast naam aanmaken doet dit niets volgens mij.
    // iets vergelijkbaars aanmaken om extra controle uit te voeren
    if (this.state.logged_in) {
      fetch(`${apiUrl}/scraper/current_user/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
          this.setState({ logged_in: true });
        });
    }
  }

  // SIGNUP NOT YET IMPLEMENTED
  // handle_signup = (e, data) => {
  //   e.preventDefault();
  //   fetch('http://localhost:8000/scraper/UserList/', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       localStorage.setItem('token', json.token);
  //       this.setState({
  //         logged_in: true,
  //         displayed_form: '',
  //         username: json.username
  //       });
  //     });
  // };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  render() {
    return (
      <Router>
        <div>
          {/* <Nav className='nav' /> */}
          <Header>
            <div>{/* <h1 className='title'>Incidentradar</h1> */}</div>
            <div className="navbarStyle">
              <ButtonToolbar>
                {/* {this.state.logged_in === true && <Link to="/"><Button>Home</Button></Link>}
                {this.state.logged_in === true && <Link to="/dashboard"><Button>Dashboard</Button></Link>} */}
                {this.state.logged_in === true && (
                  <Button onClick={this.handle_logout}>Logout</Button>
                )}
                {/* <IconButton icon={<SearchIcon />}>Find address</IconButton> */}
              </ButtonToolbar>
            </div>
          </Header>

          <PrivateRoute
            authed={this.state.logged_in}
            exact
            path="/"
            component={Application}
          />
          <Route
            handleLoginChange={this.handleLoginChange}
            path="/login"
            component={Login}
          />
          <PrivateRoute
            authed={this.state.logged_in}
            exact
            path="/dashboard"
            component={Dashboard}
          />
          {/* <Route component={ErrorMessage} /> */}
        </div>
      </Router>
    );
  }
}

export default AppRoute;
