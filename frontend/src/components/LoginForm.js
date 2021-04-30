import React from 'react';
import {
  Button,
  ButtonToolbar,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  HelpBlock
} from 'rsuite';

//determines current environment for api calls & homepage routing
var current_environment = window.location.origin;

const apiUrl = process.env.REACT_APP_API_URL;

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      console.log(newState);

      return newState;
    });
  };

  handle_login = (e, data) => {
    e.preventDefault();
    fetch(`http://localhost:8000/token-auth/`, {
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
        console.log('user: ' + json.user.username);
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
      <Form fluid>
        <div>
          <h4
            style={{
              color: '#2A3C47',
              top: '40px'
            }}
          >
            Login
          </h4>
        </div>

        <br />
        <FormGroup>
          <ControlLabel>Username</ControlLabel>
          <FormControl
            name="username"
            onChange={(value, event) => {
              this.handle_change(event);
            }}
          />
          {/* <HelpBlock>Required</HelpBlock> */}
        </FormGroup>
        <FormGroup>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            name="password"
            type="password"
            onChange={(value, event) => {
              this.handle_change(event);
            }}
          />
          {/* <HelpBlock>Required</HelpBlock> */}
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <Button
              color="blue"
              onClick={e => this.handle_login(e, this.state)}
            >
              Login
            </Button>
            <Button appearance="default" disabled>
              Sign up
            </Button>
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
