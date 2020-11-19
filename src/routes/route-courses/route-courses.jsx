import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CoursePage from '../../pages/course/course-page';
import CoursesPage from '../../pages/courses/courses-page';

const CoursesRoute = ({ match }) =>{
  return (
    <main>
      <Switch>
        <Route path="/edit/maincourses/:id" component={CoursePage} />
        <Route path="/edit/secondcourses/:id" component={CoursePage} />
        <Route path="/edit/salads/:id" component={CoursePage} />
        <Route path="/edit/desserts/:id" component={CoursePage} />
        <Route path="/edit/drinks/:id" component={CoursePage} />
        <Route path="/edit/pies/:id" component={CoursePage} />
        <Route path="/edit/sauces/:id" component={CoursePage} />
        <Route
          exact
          path={match.path}
          component={CoursesPage}
        />
      </Switch>
    </main>
  );
}

export default CoursesRoute;
