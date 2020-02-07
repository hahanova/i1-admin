import { useState, useEffect } from 'react';
import { db } from '../store/firebase';

export const useRecipeType = (recipeType) => {
  const [data, updateData] = useState(null);

  // empty array as second argument equivalent to componentDidMount
  useEffect(() => {
    async function fetchData() {
      const response = await db.get('dishes/').then((dishes) => {
        // console.log(dishes);
        return dishes;
      });;
      // console.log('recipeType', recipeType)
      updateData(response[recipeType]);
    }
    fetchData();
  }, [recipeType]);

  return data;
};