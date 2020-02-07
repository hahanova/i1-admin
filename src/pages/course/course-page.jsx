import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SimpleBreadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Selector from '../../components/selector/selector';
import { authors as allAuthors } from '../../store/authors';

import {
  selectCourses,
  addCourseAction,
  editCourseAction,
} from '../../store';

import './course-page.scss';

const getTodayDate = () => {
  var today = new Date();

  return today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
};

const CoursePage = ({ history, location }) => {
  const courseId = location.pathname.split('/').pop();
  const courses = useSelector(selectCourses);
  const dispatch = useDispatch();
  const data = courseId === 'new' ? {
    authors: [],
    creationDate: getTodayDate(),
    description: '',
    duration: '2',
    image: '',
    title: '',
  } : courses[courses.findIndex(course => course.id === courseId)];

  const [state, setState] = useState(data);

  const handleSaveBtn = () => {
    const {
      authors,
      creationDate,
      description,
      duration,
      image,
      title,
    } = state;

    if (!creationDate || !description || !duration || !image || !title || !authors.length) {
      alert('Please fullfill all fields');
      return;
    } else if (courseId === 'new') {
      dispatch(addCourseAction(state));
    } else {
      dispatch(editCourseAction({...state, id: courseId }));
    }

    history.push('/courses');
  };

  const onChangeField = ({ target: { value, id } }) => {
    setState({ ...state, [id]: value });
  };

  const onClickSelector = (activeAuthors) => {
    let authors = [];

    activeAuthors.forEach((author) => { authors.push(author.name) });
    setState({ ...state, authors });
  };

  return (
    <section>
      <SimpleBreadcrumbs title={data.title} />
      <form>
        <div className="course-form__container">
          <TextField
            id="title"
            label="Название"
            defaultValue={state.title}
            margin="normal"
            onChange={onChangeField}
          />
          <TextField
            id="image"
            label="юрл картинки"
            type="textarea"
            defaultValue={state.image}
            margin="normal"
            onChange={onChangeField}
          />
          <TextField
            id="date"
            label="Date"
            type="date"
            defaultValue={state.creationDate}
            onChange={onChangeField}
          />
          <TextField
            id="duration"
            label="время приготовления"
            type="number"
            defaultValue={state.duration}
            margin="normal"
            onChange={onChangeField}
          />
        </div>

        <label
          id="description"
          className="course-form__description-title"
        >
          Описание
        </label>

        <textarea
          id="description"
          className="course-form__description"
          htmlFor="description"
          placeholder="пиши..."
          defaultValue={state.description}
          onChange={onChangeField}
        >
        </textarea>

        <legend className="course-form__description-title">Authors' List</legend>
        <Selector
          options={allAuthors}
          currentAuthors={state.authors}
          handleValue={onClickSelector}
        />

        <div className="course-form__buttons">
          <Button
            size="small"
            color="primary"
            onClick={handleSaveBtn}
          >
            Save
          </Button>
          <Link
            to="/courses"
            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default connect()(CoursePage);
