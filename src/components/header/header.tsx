import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// import logo from '../../logo.svg';
import { courseTypesArray } from '../../constants';

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

  return (
    <header className="header">
      <div className="header__nav">
        {courseTypesArray.map((type) => <Link to={`/${type}`} key={type} className="header__nav-link">{type}</Link>)}
      </div>
      <div className="header__auth">
        {user && <p>{user}</p>}
        <Link to="/login" onClick={handleClick}>{authMessage}</Link>
      </div>
    </header>
  );
};

export default HeaderComponent;
