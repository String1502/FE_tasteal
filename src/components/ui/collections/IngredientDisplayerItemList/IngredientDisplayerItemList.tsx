import { Box } from "@mui/material";
import { FC } from "react";
import IngredientDisplayerItem from "./IngredientDisplayerDataItem/IngredientDisplayerItem";
import IngredientDisplayerItemListProps from "./types/IngredientDisplayerItemListProps";

const IngredientDisplayerItemList: FC<IngredientDisplayerItemListProps> = ({
  ingredients,
}) => {
  return (
    <Box>
      {ingredients.map((ingredient) => (
        <IngredientDisplayerItem key={ingredient.id} value={ingredient} />
      ))}
    </Box>
  );
};

export default IngredientDisplayerItemList;
