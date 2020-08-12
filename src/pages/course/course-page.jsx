import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";

import SimpleBreadcrumbs from "../../components/breadcrumbs/breadcrumbs";

import { db } from "../../store/firebase";

import "./course-page.scss";

const CoursePage = ({ history, location }) => {
  const isNewRecipe = location.pathname.match(/\/new$/);
  const [, , currentType, id] = location.pathname.split("/");
  const cancelRoute = isNewRecipe ? '/maincourses' : `/${currentType}`;

  const [state, setState] = useState({
    ingredients: [],
    time: [],
    description: '',
    src: '',
    name: ''
  });

  const [type, setType] = useState(currentType || "");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    if (currentType && id) {
      async function fetchData() {
        const response = await db
          .get(`dishes/${currentType}/${id}`)
          .then((recipe) => {
            return recipe;
          });

        setState({ ...state, ...response });
        // setType(response.type);
        setDifficulty(response.difficulty);
      }
      fetchData();
    }
  }, [currentType, id]);

  const handleSaveBtn = () => {
    const { src, ingredients, description, time, name } = state;

    if (
      !name ||
      !type ||
      !src ||
      !ingredients ||
      !description ||
      !time ||
      !difficulty
    ) {
      alert("Плиз, заполни все поля");
      return;
    } else if (isNewRecipe) {
      db.add({ ...state, type, difficulty }, `dishes/${type}/`);
    } else {
      db.update({ ...state, type, difficulty, id });
      // dispatch(editCourseAction({ ...state, id: id, type, difficulty }));
    }

    const nextLocation = type ? `/${type}` : "maincourses";

    history.push(nextLocation);
  };

  const onChangeField = ({ target: { value, id } }) => {
    setState({ ...state, [id]: value });
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
      <form>
        <div className="course-form__container">
         <TextField
            id="name"
            label="Название"
            value={state.name}
            margin="normal"
            onChange={onChangeField}
          />

          <FormControl>
            <InputLabel id="type">тип блюда</InputLabel>
            <Select htmlFor="type" value={type} onChange={onSelectType}>
              <MenuItem value="maincourses">первое блюдо</MenuItem>
              <MenuItem value="secondcourses">второе блюдо</MenuItem>
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
          />
          <TextField
            id="time"
            label="время приготовления"
            type="textarea"
            value={state.time}
            margin="normal"
            onChange={onChangeField}
          />

          <FormControl>
            <InputLabel id="difficulty">сложность</InputLabel>
            <Select
              htmlFor="difficulty"
              value={difficulty}
              onChange={onSelectDifficulty}
            >
              <MenuItem value="1">изи бризи</MenuItem>
              <MenuItem value="2">нормуль</MenuItem>
              <MenuItem value="3">сложна</MenuItem>
            </Select>
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
            to={cancelRoute}
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
