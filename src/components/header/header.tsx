import React from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';

import {
  selectAuthorizedUser,
  selectAuthMessage,
  logoutAction,
} from '../../store';

import './header.scss';

const HeaderComponent = () => {
  const user: string = useSelector(selectAuthorizedUser);
  const authMessage: string = useSelector(selectAuthMessage);
  const dispatch = useDispatch();

  const handleClick = () => {
    if(authMessage === 'logout') {
      dispatch(logoutAction());
    }
  };

  const recipeTypes = [
    'maincourses',
    'secondcourses',
    'pies',
    'desserts',
    'drinks',
    'sauces'
  ];

  return (
    <header className="header shadow">
      <div className="header__nav">
        {recipeTypes.map((dishType) => <Link to={`/${dishType}`} className="header__nav-link">{dishType}</Link>)}
      </div>
      <div className="header__auth">
        <p>{user}</p>
        <Link to="/login" onClick={handleClick}>{authMessage}</Link>
      </div>
    </header>
  );
};

export default connect()(HeaderComponent);
