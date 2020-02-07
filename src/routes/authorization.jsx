import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { getAuthenticatedUser } from '../helpers/auth';

const Authorization = WrappedComponent => {
  return class AuthorizationHOC extends Component {
    render() {
      if (!getAuthenticatedUser()) {
        return <Redirect to='/login' />
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

export default Authorization;
