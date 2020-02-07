import { combineReducers } from 'redux';
import { users } from './users';
import { courses } from './courses';

const rootReducer = combineReducers({
  users,
  courses,
});

export default rootReducer;
