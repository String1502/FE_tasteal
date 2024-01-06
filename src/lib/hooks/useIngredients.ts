import { useEffect, useState } from 'react';
import { IngredientRes } from '../models/dtos/Response/IngredientRes/IngredientRes';
import IngredientService from '../services/ingredientService';

/**
 * Custom hook to fetch all ingredients from API.
 * Returns array of IngredientRes and boolean fetching state.
 */
const useIngredients = (): [IngredientRes[], boolean] => {
  const [ingredients, setIngredients] = useState<IngredientRes[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    IngredientService.GetAll()
      .then((res) => {
        setIngredients(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setIngredients([]);
      })
      .finally(() => setFetching(false));
  }, []);

  return [ingredients, fetching];
};

export default useIngredients;
