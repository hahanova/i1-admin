import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  TextField,
  Button,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  CardMedia,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";

import SimpleBreadcrumbs from "../../components/breadcrumbs/breadcrumbs";
import { courseTypes } from '../../constants';
import { db } from "../../store/firebase";

import "./course-page.scss";

const CoursePage = ({ history, location }) => {
  const isNewRecipe = location.pathname.match(/\/new$/);
  const [, , currentType, id] = location.pathname.split("/");
  const cancelButtonRoute = isNewRecipe ? `/${courseTypes.mainCourses}` : `/${currentType}`;

  const [state, setState] = useState({
    ingredients: [],
    time: [],
    description: '',
    src: '',
    name: '',
    servingsNumber: '',
  });

  const [type, setType] = useState(currentType || '');
  const [difficulty, setDifficulty] = useState('');

  useEffect(() => {
    if (currentType && id) {
      async function fetchData() {
        const response = await db
          .get(`dishes/${currentType}/${id}`)
          .then((recipe) => {
            return recipe;
          });

        setState({ ...state, ...response });
        setDifficulty(response.difficulty);
      }
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentType, id, setDifficulty, setState]);

  const handleSaveBtn = () => {
    const { src, ingredients, description, time, name } = state;

    if (!name || !type || !src || !ingredients || !description || !time || !difficulty) {
      alert("Плиз, заполни все поля");
      return;
    } else if (isNewRecipe) {
      db.add({ ...state, type, difficulty }, `dishes/${type}/`);
    } else {
      db.update({ ...state, type, difficulty, id });
    }

    const nextLocation = type ? `/${type}` : `/${courseTypes.mainCourses}`;

    history.push(nextLocation);
  };

  const onChangeField = ({ target: { value, id: fieldId } }) => {
    setState({ ...state, [fieldId]: value });
  };

  const onSelectType = ({ target: { value } }) => {
    setType(value);
  };

  const onSelectDifficulty = ({ target: { value } }) => {
    setDifficulty(value);
  };

  return (
    <section className="main">
      {console.log("hello", { ...state, type, difficulty })}
      <SimpleBreadcrumbs title={state.name} type={currentType} />
      <form className="course-form">
        <div className="course-form__container">
          <TextField
            id="name"
            label="название"
            value={state.name}
            margin="normal"
            onChange={onChangeField}
            variant="outlined"
          />

          <FormControl variant="outlined">
            <InputLabel id="type-label">тип блюда</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              value={type}
              onChange={onSelectType}
              label="тип блюда"
            >
              <MenuItem value="maincourses">первое блюдо</MenuItem>
              <MenuItem value="secondcourses">второе блюдо</MenuItem>
              <MenuItem value="salads">салат</MenuItem>
              <MenuItem value="pies">пирог</MenuItem>
              <MenuItem value="desserts">десерт</MenuItem>
              <MenuItem value="drinks">напиток</MenuItem>
              <MenuItem value="sauces">соус</MenuItem>
            </Select>
          </FormControl>

          <TextField
            id="src"
            label="юрл картинки"
            type="textarea"
            value={state.src}
            margin="normal"
            onChange={onChangeField}
            variant="outlined"
          />

          {state.src &&
            (<CardMedia
              component="img"
              alt="ссылка картинки поломана"
              height="140"
              image={state.src}
              title="Contemplative Reptile"
            />)
          }

          <TextField
            id="time"
            label="время приготовления"
            type="textarea"
            value={state.time}
            margin="normal"
            onChange={onChangeField}
            variant="outlined"
          />

          <TextField
            id="servingsNumber"
            label="количество порций"
            value={state.servingsNumber}
            margin="normal"
            onChange={onChangeField}
            placeholder="2-3 порции"
            variant="outlined"
          />

          <FormControl component="fieldset" className="course-form__radioset">
            <FormLabel component="legend">сложность</FormLabel>
            <RadioGroup row aria-label="сложность" name="difficulty" value={difficulty} onChange={onSelectDifficulty}>
              <FormControlLabel value="1" control={<Radio />} label="изи бризи" />
              <FormControlLabel value="2" control={<Radio />} label="нормуль" />
              <FormControlLabel value="3" control={<Radio />} label="сложна" />
            </RadioGroup>
          </FormControl>
        </div>

        <label id="ingredients" className="course-form__description-title">
          Ингридиенты
          </label>

        <textarea
          id="ingredients"
          className="course-form__description"
          htmlFor="ingredients"
          placeholder="2 яйца, 3ст муки..."
          value={state.ingredients}
          onChange={onChangeField}
        ></textarea>

        <label id="description" className="course-form__description-title">
          Описание
          </label>

        <textarea
          id="description"
          className="course-form__description"
          htmlFor="description"
          placeholder="пиши..."
          value={state.description}
          onChange={onChangeField}
        ></textarea>

        <div className="course-form__buttons">
          <Button size="small" color="primary" onClick={handleSaveBtn}>
            Save
            </Button>
          <Link
            to={cancelButtonRoute}
            className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall"
          >
            Cancel
          </Link>
        </div>
      </form>
    </section>
  );
};

export default CoursePage;
