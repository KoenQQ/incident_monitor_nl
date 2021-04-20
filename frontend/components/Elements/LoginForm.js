import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, ButtonToolbar, Button } from 'rsuite';

//determines current environment for api calls & homepage routing
var current_environment = window.location.origin


class LoginForm extends React.Component {
  constructor(props) {
    super(props) 
    this.state = {
      username: '',
      password: '' };
  };


  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      console.log(newState)
      return newState;
    });
  };
  

  
  handle_login = (e, data) => {
    e.preventDefault();
    fetch(`${current_environment}/token-auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if (json.token !== undefined) {
          localStorage.setItem('token', json.token);
        }  
        this.setState({
          username: json.user.username
        });
        console.log("user: " + json.user.username)
        // console.log(json.token, typeof json.token)
        // console.log(this.state.username)

        // console.log(body)

        // redirect to homepage
        
        window.location.href = `${current_environment}`;
      })
      .catch(error => {
        return error;
      });
  };
  
  //test

  render() {
    return (
      <Form fluid >
        <h4>Login</h4>
        <br />
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <FormControl 
            name="name"
            onChange={(value, event)=>{
              this.state.username = value
              this.handle_change
              }}
          />
          {/* <HelpBlock>Required</HelpBlock> */}
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl 
            name="password"
            type="password"
            onChange={(value, event)=>{
              this.state.password = value
              this.handle_change
              }}
          />
          {/* <HelpBlock>Required</HelpBlock> */}
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <Button color="blue" onClick={e => this.handle_login(e, this.state)}>Login</Button>
            <Button appearance="default" disabled>Sign up</Button>
            <HelpBlock tooltip>Sign up coming soon!</HelpBlock>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    );
  }
}

export default LoginForm;

// LoginForm.propTypes = {
//   handle_login: PropTypes.func.isRequired
// };