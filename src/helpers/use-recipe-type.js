import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { db } from '../store/firebase';
import { setCoursesAction } from '../store';

export const useRecipeType = (recipeType) => {
  const [data, updateData] = useState(null);
  const dispatch = useDispatch();

  // empty array as second argument equivalent to componentDidMount
  useEffect(() => {
    const fetchData = async() => {
      const response = await db.get('dishes/').then((dishes) => {
        return dishes;
      });;

      dispatch(setCoursesAction(response));
      updateData(response[recipeType]);
    }

    fetchData();
  }, [dispatch, recipeType]);

  return data;
};