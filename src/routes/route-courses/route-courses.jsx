import React from 'react';
import { Route, Switch } from 'react-router-dom';

import CoursePage from '../../pages/course/course-page';
import CoursesPage from '../../pages/courses/courses-page';

const CoursesRoute = ({ match }) =>{
  return (
    <main>
      <Switch>
        <Route path={`${match.path}/:id`} component={CoursePage} />
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
