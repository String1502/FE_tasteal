import { useEffect, useState } from "react";
import { getApiUrl } from "../constants/api";
import { IngredientRes } from "../models/dtos/Response/IngredientRes/IngredientRes";

const useIngredients = () => {
  const [ingredients, setIngredients] = useState<IngredientRes[]>([]);

  useEffect(() => {
    fetch(getApiUrl("GET_ALL_INGREDIENTS"))
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject();
        }
      })
      .then((data) => {
        console.log(data);
        setIngredients(data);
      })
      .catch(() => {
        setIngredients([]);
      });
  }, []);

  return ingredients;
};

export default useIngredients;
