// we use this component to make a route private

import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, authed, ...rest }) {
  console.log('user is logged in: ' + authed)
  return(
    <Route 
        {...rest} 
        render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
    
  );

};        

export default PrivateRoute