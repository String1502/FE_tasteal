import { useEffect, useState } from "react";
import { getApiUrl } from "../constants/api";
import { IngredientGetAllResponse } from "../models/dtos/ingredientDTO";

const useIngredients = () => {
  const [ingredients, setIngredients] = useState<IngredientGetAllResponse>([]);

  useEffect(() => {
    fetch(getApiUrl("GET_ALL_INGREDIENTS"))
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data);
      })
      .catch((error) => {
        console.log(error);
        setIngredients([]);
      });
  }, []);

  return ingredients;
};

export default useIngredients;
