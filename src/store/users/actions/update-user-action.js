export const ADD_USER = 'ADD_USER';
export const SET_AUTHORIZED_USER = 'SET_AUTHORIZED_USER';
export const LOGOUT = 'LOGOUT';

export const addUserAction = (payload) => ({
  type: ADD_USER,
  payload,
});

export const setAuthorizedUserAction = (payload) => ({
  type: SET_AUTHORIZED_USER,
  payload,
});

export const logoutAction = () => ({
  type: LOGOUT,
});
