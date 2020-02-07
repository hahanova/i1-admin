import {
  ADD_COURSE,
  REMOVE_COURSE,
  EDIT_COURSE,
} from '../actions';

const initialState = [
  {
    id: 'video1',
    title: 'Complete Python Bootcamp: Go from zero to hero in Python 3',
    description: 'Learn Python like a Professional! Start from the basics and go all the way to creating your own applications and games!',
    duration: '22',
    creationDate: '2019-09-10',
    authors: ['Verka Serduchka', 'Iryna Bilyk'],
    image: 'https://stackify.com/wp-content/uploads/2017/10/How_MVC_Works-793x397.png',
  },
  {
    id: 'video2',
    title: 'Spring & Hibernate for Beginners (includes Spring Boot)',
    description: 'Spring 5: Learn Spring 5 Core, AOP, Spring MVC, Spring Security, Spring REST, Spring Boot 2, Thymeleaf, JPA & Hibernate',
    duration: '20',
    creationDate: '2019-05-22',
    authors: ['Vremia Isteklo'],
    image: 'https://tproger.ru/wp-content/uploads/2018/03/spring-logo.jpg',
  },
  {
    id: 'video3',
    title: 'Vue JS 2 - The Complete Guide (incl. Vue Router & Vuex',
    description: 'Vue JS is an awesome JavaScript Framework for building Frontend Applications! VueJS mixes the Best of Angular + React!',
    duration: '19',
    creationDate: '2019-10-13',
    authors: ['Nastya Kamenskih'],
    image: 'https://media.proglib.io/wp-uploads/2018/07/1_qnI8K0Udjw4lciWDED4HGw.png',
  },
  {
    id: 'video4',
    title: 'Complete Filmmaker Guide: Become an Incredible Video Creator',
    description: 'Get 7 Years of Filmmaking Experience - Everything from Pre-Production to Editing - in 5 Hours',
    duration: '5',
    creationDate: '2019-09-05',
    authors: ['Verka Serduchka', 'Iryna Bilyk'],
    image: 'https://s3.amazonaws.com/pbblogassets/uploads/2016/02/Free-Filmmaking-eBook.jpg',
  },
  {
    id: 'video5',
    title: 'Be A Video Production & Video Marketing Master!',
    description: 'Video Production and Video Marketing wrapped up in one course',
    duration: '7',
    creationDate: '2019-09-15',
    authors: ['Vremia Isteklo'],
    image: 'https://i.udemycdn.com/course/240x135/145548_94d8_3.jpg',
  },
  {
    id: 'video6',
    title: 'How to Shoot n Edit Real Estate Videos',
    description: 'Learn how to produce professional real estate videos',
    duration: '2',
    creationDate: '2019-10-18',
    authors: ['Nastya Kamenskih'],
    image: 'https://i.udemycdn.com/course/240x135/1232236_1231_2.jpg',
  },
];

const coursesCollection = new Map([
  [ADD_COURSE, (state, { payload }) => {
    return [
      ...state,
      {
        ...payload,
        id: Date.now(),
      },
    ]
  }],
  [REMOVE_COURSE, (state, { payload: id }) => {
    return state.filter(course => course.id !== id);
  }],
  [EDIT_COURSE, (state, { payload }) => {
    let currentIndex;

    state.find((course, index) => {
      if(course.id === payload.id) {
        currentIndex = index;
      }
    });

    state[currentIndex] = { ...payload };

    return state;
  }],
]);

export const courses = (state = initialState, action) => {
  if (!coursesCollection.has(action.type)) {
    return state;
  }

  return coursesCollection.get(action.type)(state, action);
};