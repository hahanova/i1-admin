import {
  ADD_COURSE,
  REMOVE_COURSE,
  EDIT_COURSE,
  SET_COURSES,
} from '../actions';

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
    const currentIndex = state.some((course) => course.id === payload.id)?.index;

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