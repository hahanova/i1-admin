import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LoginPage from '../pages/login/login-page';
import Authorization from './authorization';
import CoursesRoute from './route-courses/route-courses';
import CoursePage from '../pages/course/course-page';

const recipes = Authorization(CoursesRoute);

const NoMatch = () => <h2>404</h2>;

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={recipes} />
      <Route exact path="/login" component={LoginPage} />
      <Route path="/new" component={CoursePage} />
      <Route path="/maincourses" component={recipes} />
      <Route path="/secondcourses" component={recipes} />
      <Route path="/salads" component={recipes} />
      <Route path="/pies" component={recipes} />
      <Route path="/desserts" component={recipes} />
      <Route path="/drinks" component={recipes} />
      <Route path="/sauces" component={recipes} />
      <Route path="/edit" component={CoursePage} />
      <Route component={NoMatch} />
    </Switch>
  );
}

export default Routing;
