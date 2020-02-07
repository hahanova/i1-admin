import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import Input from '@material-ui/core/Input';

import {
  selectUser,
  setAuthorizedUserAction,
} from '../../store';

import './login.scss';

const LOGIN_REGEX: RegExp = /^[a-zA-Z]+$/;
const PASSWORD_REGEX: RegExp = /^[a-zA-Z0-9]+$/;
const ERROR_EMPTY_LOGIN: string = 'Please enter the field login';
const ERROR_EMPTY_PASSWORD: string = 'Please enter the field password';
const ERROR_USER_NOT_EXIST: string = 'No user with such login';
const ERROR_PASSWORD_NOT_MATCH: string = 'Wrong password';

const LoginPage = () => {
  const [state, setState] = useState({
    login: '',
    password: '',
    isValidLogin: true,
    isValidPassword: true,
    isExistedUser: true,
    isPasswordMatches: true,
    isValid: false,
  });

  const users = useSelector(selectUser);
  const dispatch = useDispatch();

  const onLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value === '' || LOGIN_REGEX.test(value)) {
      setState({ ...state, login: value });
    }
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value === '' || PASSWORD_REGEX.test(value)) {
      setState({ ...state, password: value });
    }
  };

  const onFieldBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    if (value === state.login) {
      setState({ ...state, isValidLogin: !!value });
    } else if (value === state.password) {
      setState({ ...state, isValidPassword: !!value });
    }
  };

  const verifyUser = () => {
    const user = users[state.login];
    const isExistedUser: boolean = !!user;
    const isPasswordMatches: boolean = !user 
      ? true 
      : user.password === state.password;

    setState({ 
      ...state, 
      isExistedUser, 
      isPasswordMatches,
    });

    if (isExistedUser && isPasswordMatches) {
      dispatch(setAuthorizedUserAction(state.login));
    }
  };

  const validateForm = () => {
    const { login, password } = state;

    return (login === '' || LOGIN_REGEX.test(login))
      && (password === '' || PASSWORD_REGEX.test(password))
      && users[state.login] 
      && users[state.login].password === state.password;
  };

  const onClickLogin = (event: any) => {
    if(!validateForm()) {
      event.preventDefault();
    }

    verifyUser();
  };

  const onKeyPressed = (event: any) => {
    if(!validateForm()) {
      event.preventDefault();
    }

    if (event.key === 'Enter') {
      verifyUser();
    }
  };

  const getErrorWrapper = (errorMessage: string) => (
    <span className="error">{errorMessage}</span>
  );

  const loginClassName: string = state.isValidLogin 
    ? 'login-section__field'
    : 'login-section__field login-section__field--error';

  const passwordClassName: string = state.isValidPassword 
    ? 'login-section__field'
    : 'login-section__field login-section__field--error';

  return (
    <main className="login-section__container">
      <div className="login-section__wrapper">
        <form className="login-section shadow">
          <Input
            className={loginClassName}
            autoFocus={true}
            required={true}
            value={state.login}
            onChange={onLoginChange}
            onBlur={onFieldBlur}
          />
          {state.isValidLogin ? '' : getErrorWrapper(ERROR_EMPTY_LOGIN)}
          <Input
            className={passwordClassName}
            type="password"
            required={true}
            value={state.password}
            onChange={onPasswordChange}
            onBlur={onFieldBlur}
          />
          {state.isValidPassword ? '' : getErrorWrapper(ERROR_EMPTY_PASSWORD)}
          {state.isExistedUser ? '' : getErrorWrapper(ERROR_USER_NOT_EXIST)}
          {state.isPasswordMatches && state.isValidPassword ? '' : getErrorWrapper(ERROR_PASSWORD_NOT_MATCH)}
          <Link
            to="/courses"
            className="login-section__submit"
            onClick={onClickLogin}
            onKeyPress={onKeyPressed}
          >
            Login
          </Link>
        </form>
      </div>
    </main>
  );
}

export default connect()(LoginPage);
