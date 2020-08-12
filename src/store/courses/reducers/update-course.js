import {
  ADD_COURSE,
  REMOVE_COURSE,
  EDIT_COURSE,
  SET_COURSES,
} from '../actions';

import { db } from "../../firebase";

const initialState = {};

const coursesCollection = new Map([
  [SET_COURSES, (state, { payload }) => {
    return {...payload };
  }],
  [ADD_COURSE, (state, { payload }) => {
    return [
      ...state,
      {
        ...payload,
        id: Date.now(),
      },
    ]
  }],
  [REMOVE_COURSE, (state, {
    payload: { id, type }
  }) => {
    console.log('state', state)
    console.log('id', id, type)

    const updatedCoursesType = Object.keys(state[type]).reduce((object, key) => {
      if (key !== id) {
        object[key] = state[type][key]
      }

      return object;
    }, {})

    return {
      ...state,
      [type]: updatedCoursesType,
    };
  }],
  [EDIT_COURSE, (state, { payload }) => {
    let currentIndex;

    state.find((course, index) => {
      if (course.id === payload.id) {
        currentIndex = index;
      }
    });

    state[currentIndex] = {...payload };

    return state;
  }],
]);

export const courses = (state = initialState, action) => {
  if (!coursesCollection.has(action.type)) {
    return state;
  }

  return coursesCollection.get(action.type)(state, action);
};