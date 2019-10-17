import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../utils/auth';


export const PrivateRoute = (props) => {
  const { authState } = useAuth();
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props => {
        return (authState.isAuthenticated? (
          <Component {...props} />
        ): (
          <Redirect to={{pathname: '/login', state: {referer: props.location}}} />
        )
      )}}
    />
  );
}
