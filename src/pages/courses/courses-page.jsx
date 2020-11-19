import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import { useRecipeType } from '../../helpers/use-recipe-type'

import {
  selectCourses,
} from '../../store';

import CourseCard from './course-card/course-card';
import './courses-page.scss';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

const CoursesPage = ({ location }) => {
  const classes = useStyles();
  const courses = useSelector(selectCourses);
  const [isSearched, setIsSearched] = useState(false);
  const [searchedCourses, setSearchedCourses] = useState(null);

  const currentRecipeType = location.pathname.slice(1).toString() || 'maincourses';
  useRecipeType(currentRecipeType);
  const recipes = courses[currentRecipeType];
  console.log('recipes', recipes)

  const updateCourses = (id) => {
    console.log('state4', courses)
    // const updatedSearch = courses.filter(course => course.id !== id);
    // setState({ ...state, courses: updatedSearch });
  };

  const renderCourses = (courses) => {
    console.log(44, courses);
    return Object.keys(courses).map((key) => {
      const {
        ingredients,
        difficulty,
        description,
        time,
        src,
        name,
        servingsNumber,
      } = courses[key];

      const id = key;

      return (
        <CourseCard
          key={id}
          id={id}
          difficulty={difficulty}
          imageSrc={src}
          ingredients={ingredients}
          description={description}
          duration={time}
          title={name}
          updateCourses={updateCourses}
          type={currentRecipeType}
          servingsNumber={servingsNumber}
        />
      );
    });
  };

  const handleKeypress = ({ key, target }) => {
    if (key === 'Enter') {
      const searchWord = target.value.toLowerCase();

      const foundCourses = Object.keys(courses[currentRecipeType]).reduce((recipe, key) => {
        if (courses[currentRecipeType][key].name.toLowerCase().includes(searchWord)) {
          recipe[key] = courses[currentRecipeType][key];
        }

        return recipe;
      }, {});

      setIsSearched(true);
      setSearchedCourses(foundCourses);
    }
  };

  const recipesComponent = !recipes
    ? 'Loading'
    : renderCourses(recipes);

  return (
    <>
      <section className="course-managing">
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            onKeyPress={handleKeypress}
          />
        </div>
        <Link
          to="new"
          className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall"
        >
          add recipe
        </Link>
      </section>
      <section className="cards-wrapper">
        {!isSearched && recipesComponent}
        {isSearched && recipes && renderCourses(searchedCourses)}
      </section>
    </>
  );
}

export default CoursesPage;
