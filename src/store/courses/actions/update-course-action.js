export const SET_COURSES = 'SET_COURSES';
export const ADD_COURSE = 'ADD_COURSE';
export const REMOVE_COURSE = 'REMOVE_COURSE';
export const EDIT_COURSE = 'EDIT_COURSE';

export const setCoursesAction = (payload) => ({
  type: SET_COURSES,
  payload,
});

export const addCourseAction = (payload) => ({
  type: ADD_COURSE,
  payload,
});

export const removeCourseAction = (payload) => ({
  type: REMOVE_COURSE,
  payload,
});

export const editCourseAction = (payload) => ({
  type: EDIT_COURSE,
  payload,
});