import { useEffect, useState } from 'react';
import { IngredientRes } from '../models/dtos/Response/IngredientRes/IngredientRes';
import IngredientService from '../services/ingredientService';

/**
 *
 * @returns List of ingredients
 */
const useIngredients = () => {
  const [ingredients, setIngredients] = useState<IngredientRes[]>([]);

  useEffect(() => {
    IngredientService.GetAll()
      .then((ingredients) => {
        setIngredients(ingredients);
      })
      .catch(() => {
        setIngredients([]);
      });
  }, []);

  return ingredients;
};

export default useIngredients;
