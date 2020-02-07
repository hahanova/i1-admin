import {
  ADD_USER,
  SET_AUTHORIZED_USER,
  LOGOUT,
} from '../actions';

import {
  getAuthenticatedUser,
  logout,
  setAuthenticatedUser,
} from '../../../helpers/auth';

const initialState = {
  users: {
    hahanova: {
      login: 'hahanova',
      password: 'qwerty',
    },
    godlevskyi: {
      login: 'godlevskyi',
      password: 'qwerty',
    },
  },
  auth: {
    authMessage: getAuthenticatedUser() ? 'logout' : 'login',
    user: getAuthenticatedUser() || 'user',
  }
};

const usersCollection = new Map([
  [ADD_USER, (state, {
    payload: {
      login,
      password
    }
  }) => ({
    ...state,
    users: {
      [login]: {
        login: login,
        password: password,
      },
    },
  })],

  [SET_AUTHORIZED_USER, (state, { payload }) => {console.log(payload)
    setAuthenticatedUser(payload);

    return {
      ...state,
      auth: {
        user: payload,
        authMessage: 'logout',
      },
    }
  }],

  [LOGOUT, (state) => {console.log(2)
    logout();

    return {
      ...state,
      auth: {
        user: 'user',
        authMessage: 'login',
      },
    }
  }],
]);

export const users = (state = initialState, action) => {
  if (!usersCollection.has(action.type)) {
    return state;
  }

  return usersCollection.get(action.type)(state, action);
};
